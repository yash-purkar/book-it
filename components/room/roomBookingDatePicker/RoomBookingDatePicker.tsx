"use client";
import { IRoom } from "@/backend/models/room";
import React, { useState } from "react";
import styles from "./roomBookingDetails.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RoomBookingDatePickerProps {
  room: IRoom;
}

export const RoomBookingDatePicker = ({ room }: RoomBookingDatePickerProps) => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkoutDate, setCheckoutDate] = useState<Date|null>(null);

  const handleDateChange = (dates: Date[]) => {
    const [checkIn, checkOut] = dates;
    console.log({ checkIn, checkOut });
    if (checkIn && checkOut) {
      setCheckInDate(checkIn);
      setCheckoutDate(checkOut);
    }
  };
  return (
    <div className={`${styles["booking-card"]} shadow p-4`}>
      <p className={styles["price-per-night"]}>
        <b>${room.pricePerNight}</b> / night
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
      <DatePicker
        className="w-100"
        selected={checkInDate}
        onChange={handleDateChange}
        startDate={checkInDate}
        endDate={checkoutDate}
        selectsRange
        inline
      />
      {/* <!-- Booking success/error messages go here --> */}
    </div>
  );
};
