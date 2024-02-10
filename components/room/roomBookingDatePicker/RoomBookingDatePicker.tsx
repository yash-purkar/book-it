"use client";
import { IRoom } from "@/backend/models/room";
import React, { useEffect, useState } from "react";
import styles from "./roomBookingDetails.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useLazyCheckBookingAvailabilityQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import { calculateDaysOfStay } from "@/helpers/helpers";

interface RoomBookingDatePickerProps {
  room: IRoom;
}

export const RoomBookingDatePicker = ({ room }: RoomBookingDatePickerProps) => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [daysOfStay, setDaysOfStay] = useState<number>(0);

  const [newBooking] = useNewBookingMutation();

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();

  const isAvailable = data?.isAvailable;

  const handleDateChange = (dates: Date[]) => {
    const [checkIn, checkOut] = dates;
    if (checkIn && checkOut) {
      setCheckInDate(checkIn);
      setCheckoutDate(checkOut);

      const difference = calculateDaysOfStay(checkIn, checkOut);
      setDaysOfStay(difference);

      //Check is room available or not.
      checkBookingAvailability({
        id: room._id,
        checkInDate: checkIn.toISOString(),
        checkoutDate: checkOut.toISOString(),
      });
    }
  };

  const handleClick = () => {
    const newBookingPayload = {
      room: 1,
      checkInDate,
      checkoutDate,
      daysOfStay,
      amountPaid: daysOfStay * room.pricePerNight,
      paymentInfo: {
        id: "STRIPE_DUMMY_ID",
        status: "PAID",
      },
    };
    newBooking(newBookingPayload);
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
      {checkoutDate && (
        <>
          {isAvailable ? (
            <div className="alert alert-success my-3">
              Room is Available. Book Now!
            </div>
          ) : (
            <div className="alert alert-danger my-3">
              Room isn't available. Try different dates!
            </div>
          )}
        </>
      )}
      <button
        onClick={handleClick}
        className={`btn ${styles["form-btn"]} py-3 w-100`}
      >
        Pay
      </button>
      {/* <!-- Booking success/error messages go here --> */}
    </div>
  );
};
