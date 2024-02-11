import { MyBookings } from "@/components/bookings/myBookings/MyBookings";
import { getAuthHeader } from "@/helpers/authHeader";
import React from "react";

const getBookings = async () => {
  const authHeader = getAuthHeader();
  getAuthHeader()
  try {
    const response = await fetch(`${process.env.API_URL}/api/bookings/me`, authHeader);
    const data = await response.json();

    return data.bookings;
  } catch (error) {
    console.log(error);
  }
};

const MyBookingsPage = async () => {
  const data = await getBookings();

  return <MyBookings data={data} />;
};

export default MyBookingsPage;
