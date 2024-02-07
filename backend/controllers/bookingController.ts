import { NextRequest, NextResponse } from "next/server";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import Booking from "../models/booking";

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
console.log({user:request.user})
  const booking = new Booking({
    room,
    checkInDate,
    checkoutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    user:request.user._id,
    paidAt:Date.now(),
  });
  booking.save();
console.log({booking})
  return NextResponse.json({
    Success: true,
    booking
  });
});
