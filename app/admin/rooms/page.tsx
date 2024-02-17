import { AllRooms } from "@/components/admin/allRooms/AllRooms";
import { getAuthHeader } from "@/helpers/authHeader";
import React from "react";

const getAllRooms = async () => {
  //Bcz this route is protected
  const authHeaders = getAuthHeader();
  try {
    const response = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
      headers: authHeaders.headers,
      next: {
        tags: ["Rooms"],
        //We'll use this later for revalidate.
      },
    });

    return response.json();
  } catch (error) {
    console.log(error)
  }
};

const AdminRoomsPage = async() => {
const rooms = await getAllRooms();
  return <AllRooms allRooms={rooms}/>;
};

export default AdminRoomsPage;
