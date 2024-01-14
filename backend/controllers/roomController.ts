import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";

export const getAllRooms = async (request: NextRequest) => {
  return NextResponse.json({
    data: "Again Working Fine!!",
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
