export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server";
import Room, { IReview, IRoom } from "@/backend/models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import APIFilters from "../utils/apiFilters";
import Booking from "../models/booking";
import { upload_file as uploadImageToCloudinary } from "../utils/cloudinary";

// get all rooms  - api/rooms
export const getAllRooms = catchAsyncError(async (request: NextRequest) => {
  // For pagination, 8 results per page
  const resultsPerPage: number = 4;

  // To read the url params
  const { searchParams } = new URL(request.url);

  const queryStr: any = {};

  // There is a forEach method in URL class that's why we can use this forEach here on object.
  // Value represents the value of query and key is key.
  // e.g - { value: 'delhi', key: 'location' }

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const allRoomsCount = await Room.countDocuments();

  // Creating instance of APIFilters class and passing Room model and queryStr
  const apiFilters = new APIFilters(Room, queryStr).search().filter();
  // We can call filter() after it bcz search() returning this.

  let rooms: IRoom[] = await apiFilters.query;

  // Will need this on frontend.
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resultsPerPage);
  rooms = await apiFilters.query.clone();

  // we have to use .clone() otherwise will get the error - Query was already executed: Room.find({})

  return NextResponse.json({
    Success: true,
    filteredRoomsCount,
    allRoomsCount,
    resultsPerPage,
    rooms,
  });
});

// Add new Room -> /api/rooms/:id
export const addNewRoom = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();

  //adding user in body to know who has added this room.
  body.user = request?.user?._id;

  const newRoom = new Room(body);
  await newRoom.save();
  return NextResponse.json({
    Success: true,
    newRoom,
  });
});

// Get room details -> /api/rooms/:id
export const getRoomDetails = catchAsyncError(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate("reviews.user");
    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }
    return NextResponse.json({ Success: true, room });
  }
);

// Update room details -> /api/admin/rooms/:id
export const updateRoomDetails = catchAsyncError(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await request.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    // 1. id | 2. data to be updated | 3. new:true - It will give updated data of room.
    room = await Room.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json({
      Success: true,
      room,
    });
  }
);

// delete room -> /api/admin/rooms/:id
export const deleteRoom = catchAsyncError(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findByIdAndDelete(params.id);
    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      Success: true,
      message: "Room Deleted Successfully.",
    });
  }
);

// Create and update room review -> /api/rooms/review
export const addReview = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: request?.user?._id,
    rating: Number(rating),
    comment,
  };

  // getting room
  const room = await Room.findById(roomId);

  // Checking is user already has given review or not.
  const isAlreadyReviewed = room?.reviews.find(
    (review: IReview) => review.user.toString() === request?.user?._id.toString()
  );

  //If user already has given review we'll update that.
  if (isAlreadyReviewed) {
    room?.reviews.forEach((review: IReview) => {
      if (review.user.toString() === request?.user?._id.toString()) {
        review.comment = comment;
        review.rating = Number(rating);
      }
    });
  } else {
    room?.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  // Calculating average of rating
  room.raging =
    room.reviews.reduce((acc: number, curr: IReview) => acc + curr.rating, 0) /
    room.reviews.length;

  await room.save();

  return NextResponse.json({ isSuccess: true, room });
});

// Can user add review -> /api/rooms/review/can_add_review

export const canAddReview = catchAsyncError(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");

  // If there is a booking in this room of this user.
  const bookings = await Booking.find({ room: roomId, user: request?.user?._id });
  const canGiveReview = bookings.length > 0 ? true : false;

  return NextResponse.json({
    canAddReview: canGiveReview,
  });
});

// Getting all rooms for admin -> /api/admin/rooms
export const getAllRoomsForAdmin = catchAsyncError(async (req: NextRequest) => {
  const rooms = await Room.find();

  return NextResponse.json({
    rooms,
  });
});

// Upload new images of the room -> /api/admin/rooms/[id]/upload_images/route.ts

export const uploadImages = catchAsyncError(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await request.json();

    //If room isn't there
    if (!room) {
      throw new ErrorHandler("Room Not Found", 404);
    }

    //This will upload the image in cloudinary.
    const uploader = (image: any) =>
      uploadImageToCloudinary(image, "bookit/rooms");

    //We'll get the cloudinary url's of images in array.
    const urls = await Promise.all(body.map(uploader));

    // push image url's in room.
    room?.images?.push(...urls);

    await room.save();

    return NextResponse.json({
      Success: true,
      room,
    });
  }
);
