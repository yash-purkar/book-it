import { BookingDetails } from "@/components/bookings/bookingDetails/BookingDetails";
import { getAuthHeader } from "@/helpers/authHeader";
import React from "react";

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/bookings/${id}`,
      authHeader
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const BookingDetailsPage = async ({ params }: { params: { id: string } }) => {
  const booking = await getBooking(params.id);

  return <BookingDetails data={booking} />;
};

export default BookingDetailsPage;
