import Error from "@/app/error";
import { RoomDetails } from "@/components/room/roomDetails/RoomDetails";
import React from "react";

interface RoomDetailsProps {
    params : {
        id:string
    }
}

const getRoomDetails = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/rooms/${id}`);
  return await response.json();
};

const RoomDetailsPage = async ({params} : RoomDetailsProps) => {
    const data = await getRoomDetails(params.id);

    if(data?.errorMessage) {
       return <Error error={data}/>
    }
  return <RoomDetails room={data} />;
};

export default RoomDetailsPage;

export const generateMetadata = async ({params}:RoomDetailsProps) => {
    const data = await getRoomDetails(params.id);
    return {
        title: data.room.name
    }
}