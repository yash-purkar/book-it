"use client";

import { IBooking } from "@/backend/models/booking";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React from "react";
import styles from './myBookings.module.css'
interface MyBookingsProps {
  data: IBooking[];
}
interface MyBookingsProps {}

export const MyBookings: React.FC<MyBookingsProps> = ({ data: bookings }) => {
  //It will return the columns and rows for the table.
  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkin",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkout",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amountpaid",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    bookings?.forEach((booking) => {
      data.rows.push({
        id: booking._id,
        checkin: new Date(booking.checkInDate).toLocaleString("en-us"),
        checkout: new Date(booking.checkoutDate).toLocaleString("en-us"),
        amountpaid: `$${booking.amountPaid}`,
        actions: (
          <div className={styles.action}>
            <Link href={`/bookings/${booking._id}`}>
              <i className="fa fa-eye"></i>
            </Link>
            <Link href={`/bookings/${booking._id}`}>
            <i className="fa fa-receipt"></i>
            </Link>
          </div>
        ),
      });
    });
    return data;
  };

  return (
    <div className="container">
      <h1 className="my-5 text-secondary">My Bookings</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};
