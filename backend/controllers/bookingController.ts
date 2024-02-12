import { NextRequest, NextResponse } from "next/server";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import Booking, { IBooking } from "../models/booking";
import moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const momentRange = extendMoment(moment);

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

  await booking.save();

  return NextResponse.json({
    Success: true,
    booking,
  });
});

// check room availability -> /api/bookings/check_room_availability
export const checkRoomAvailability = catchAsyncError(
  async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    const checkInDate: Date = new Date(
      searchParams.get("checkInDate") as string
    );
    const checkoutDate: Date = new Date(
      searchParams.get("checkoutDate") as string
    );

    // It returns the bookings if there is booking with this condition.
    const bookings: IBooking[] = await Booking.find({
      room: roomId,
      $and: [
        { checkInDate: { $lte: checkoutDate } },
        { checkoutDate: { $gte: checkInDate } },
      ],
    });

    // If the length is 0 means there are no bookings, If length is not 0 we've some bookings.
    const isAvailable: Boolean = bookings.length === 0;

    return NextResponse.json({
      isAvailable,
    });
  }
);

// get room booked dates -> /api/bookings/get_room_booked_dates

export const getRoomBookedDates = catchAsyncError(
  async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const roomId = searchParams.get("roomId");

    // It'll have all the bookings with the given roomId
    const bookings = await Booking.find({ room: roomId });

    // It will give all the dates between checkIn and checkout date. In array. Array.form() converts multi dimensional array into one dimensional.
    const bookedDates = bookings.flatMap((booking) =>
      Array.from(
        momentRange
          .range(
            momentRange(booking.checkInDate),
            momentRange(booking.checkoutDate).add(1, "day")
          )
          .by("day")
      )
    );

    return NextResponse.json({ bookedDates });
  }
);

// Get current user bookings -> /api/bookings/me
export const myBookings = catchAsyncError(async (request: NextRequest) => {
  const bookings = await Booking.find({ user: request.user._id });

  return NextResponse.json({ bookings });
});

// Get booking details -> /api/bookings/:id
export const getBookingDetails = catchAsyncError(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const booking = await Booking.findById(id).populate("user room");
    
    if (request.user._id !== booking.user._id.toString()) {
      throw new ErrorHandler("You can't view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);
