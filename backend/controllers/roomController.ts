import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";

// get all rooms  - api/rooms
export const getAllRooms = catchAsyncError(async (request: NextRequest) => {
  // For pagination, 8 results per page
  const resultsPerPage: number = 8;

  const rooms = await Room.find();

  return NextResponse.json({
    Success: true,
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
