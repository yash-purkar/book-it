import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import APIFilters from "../utils/apiFilters";

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

  apiFilters.pagination(resultsPerPage);
  const rooms = await apiFilters.query;

  // Will need this on frontend.
  const filteredRoomsCount: number = rooms.length;

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
    const room = await Room.findById(params.id);
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
