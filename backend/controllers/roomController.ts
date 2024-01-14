import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";


export const getAllRooms = async (request: NextRequest) => {

    // For pagination, 8 results per page
    const resultsPerPage:number = 8;

    const rooms = await Room.find();

  return NextResponse.json({
    Success:true,
    resultsPerPage,
    rooms
  });
};

export const addNewRoom = async (request: NextRequest) => {
  const body = await request.json();

  const newRoom = new Room(body);
  await newRoom.save();
  return NextResponse.json({
    Success: true,
    newRoom,
  });
};
