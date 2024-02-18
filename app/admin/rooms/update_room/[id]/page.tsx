import { IRoom } from "@/backend/models/room";
import { UpdateRoom } from "@/components/admin/updateRoom/UpdateRoom";
import React from "react";

type FetchRoomDetails = (id: string) => Promise<any>;

const fetchRoomDetails: FetchRoomDetails = async (id) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/rooms/${id}`,{cache:'no-cache'});
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const UpdateRoomDetailsPage = async ({ params }: { params: { id: string } }) => {
  const roomData = await fetchRoomDetails(params.id);
console.log(roomData.room)
  return <UpdateRoom room={roomData.room}/>;
};

export default UpdateRoomDetailsPage;
