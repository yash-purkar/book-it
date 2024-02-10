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

  // It returns the bookings if there is booking with this condition.
  const bookings: IBooking[] = await Booking.find({
    room:roomId,
    $and : [
      {checkInDate : {$lte : checkoutDate}},
      {checkoutDate: {$gte: checkInDate}}
    ]
  });

  // If the length is 0 means there are no bookings, If length is not 0 we've some bookings.
  const isAvailable: Boolean = bookings.length === 0;

  return NextResponse.json({
    isAvailable,
  });
});
