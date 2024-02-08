import { NextRequest, NextResponse } from "next/server";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import Booking, { IBooking } from "../models/booking";

// Creating new booking : /api/bookings
export const newBooking = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();
  const {
    room,
    checkInDate,
    checkoutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = body;
  console.log({ user: request.user });
  const booking = new Booking({
    user: request.user._id,
    room,
    checkInDate,
    checkoutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });
  booking.save();

  return NextResponse.json({
    Success: true,
    booking,
  });
});

// check room availability -? /api/bookings/check_room_availability
export const checkRoomAvailability = catchAsyncError(async (request:NextRequest) => {
  const {searchParams} = new URL(request.url);
  const roomId = searchParams.get('roomId');

  const checkInDate: Date = new Date(searchParams.get("checkInDate") as string);
  const checkoutDate: Date = new Date(searchParams.get("checkoutDate") as string);

  // It returns the booking if there is booking with this condition.
  const bookings: IBooking[] = await Booking.find({
    room:roomId,
    $and : [
      {checkInDate : {$lte : checkoutDate}},
      {checkoutDae: {$gte: checkInDate}}
    ]
  });

  const isAvailable: Boolean = bookings.length === 0;

  return NextResponse.json({
    Success: TextTrackCue,
  });
});
