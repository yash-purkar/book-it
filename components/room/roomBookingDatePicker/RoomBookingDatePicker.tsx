"use client";
import { IRoom } from "@/backend/models/room";
import React, { useEffect, useState } from "react";
import styles from "./roomBookingDetails.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetRoomBookedDatesQuery,
  useLazyCheckBookingAvailabilityQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import { calculateDaysOfStay } from "@/helpers/helpers";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface RoomBookingDatePickerProps {
  room: IRoom;
}

export const RoomBookingDatePicker = ({ room }: RoomBookingDatePickerProps) => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [daysOfStay, setDaysOfStay] = useState<number>(0);

  const [newBooking,{isSuccess,isError,isLoading}] = useNewBookingMutation();

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();

  const { isAuthenticated,user } = useAppSelector((state) => state.auth);

  const { data: { bookedDates = [] } = {} } = useGetRoomBookedDatesQuery({
    id: room._id,
  });
  
  const router = useRouter();
  useEffect(() => {
    if(isSuccess){
      toast.success("Room Booked Succesffully");
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/bookings/me`)
    } else if(isError) {
      toast.error("Failed to book room.")
    }
  },[isSuccess,isError])

  // Converting string dates into Date format.
  const datesNeedToBeDisabled =
    bookedDates.map((date: string) => new Date(date)) || [];

  const isAvailable = data?.isAvailable;

  const handleDateChange = (dates: Date[]) => {
    const [checkIn, checkOut] = dates;
    setCheckInDate(checkIn);
    setCheckoutDate(checkOut);
    if (checkIn && checkOut) {
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
    const amountToBePaid = daysOfStay * room.pricePerNight;
    const newBookingPayload = {
      room: room._id,
      checkInDate,
      checkoutDate,
      daysOfStay,
      amountPaid: amountToBePaid,
      paymentInfo: {
        id: "STRIPE_DUMMY_ID",
        status: "PAID",
      },
    };

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY,
      amount: amountToBePaid,
      currency: "USD",
      name: "Book-IT",
      description: "Pay to book the room.",
      handler: function (response: any) {
        newBooking(newBookingPayload);
        localStorage.setItem(
          "bookit_payment_id",
          response?.razorpay_payment_id
        );
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "Book IT, Noida Sector 63",
      },
      theme: {
        color: "#e61e4d",
      },
    };

    // @ts-ignore
    var pay = new window.Razorpay(options);
    pay.open();
  };

  // If dates are not selected btn will be disabled.
  const isButtonDisabled = !isLoading && checkInDate && checkoutDate ? false : true;

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
        excludeDates={datesNeedToBeDisabled}
      />
      {typeof data !== "undefined" && (
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

      {!isAuthenticated && checkInDate && checkoutDate && (
        <div className="alert alert-danger my-3">Login to book the room!</div>
      )}
      {isAuthenticated && checkInDate && checkoutDate && (
        <button
          onClick={handleClick}
          className={`btn ${styles["form-btn"]} py-3 w-100`}
          disabled={isButtonDisabled}
        >
          Pay
        </button>
      )}
      {/* <!-- Booking success/error messages go here --> */}
    </div>
  );
};
