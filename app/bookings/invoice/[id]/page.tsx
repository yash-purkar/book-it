import { Invoice } from "@/components/bookings/invoice/Invoice";
import { getAuthHeader } from "@/helpers/authHeader";
import React from "react";

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();
  try {
    const reponse = await fetch(
      `${process.env.API_URL}/api/bookings/${id}`,
      authHeader
    );
    return reponse.json();
  } catch (error) {
    console.log(error);
  }
};

const InvoicePage = async({ params }: { params: { id: string } }) => {
  const booking = await getBooking(params.id);
  return <Invoice data={booking}/>;
};

export default InvoicePage;
