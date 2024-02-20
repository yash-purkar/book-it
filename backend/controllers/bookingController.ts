export const dynamic = "force-dynamic"
export const revalidate = 0

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
    user: request?.user?._id,
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
  const bookings = await Booking.find({ user: request?.user?._id });

  return NextResponse.json({ bookings });
});

// Get booking details -> /api/bookings/:id
export const getBookingDetails = catchAsyncError(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const booking = await Booking.findById(id).populate("user room");

    if (request?.user?._id !== booking.user._id.toString()) {
      throw new ErrorHandler("You can't view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);

//It will give last 6 months sales and bookings.
const getLastSixMonthsSales = async () => {
  const lastSixMonthsSalesData: any[] = [];
  // Todays date.
  const currentDate = momentRange();

  async function fetchSalesOfSingleMonth(startDate: any, endDate: any) {
    const result = await Booking.aggregate([
      {
        //Filtering between start and end date
        $match: {
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        //grouping
        $group: {
          _id: null,
          // sum of amount paid
          totalSales: { $sum: "$amountPaid" },
          // it is like counter.
          numberOfBookings: { $sum: 1 },
        },
      },
    ]);

    const { totalSales, numberOfBookings } =
      result.length > 0 ? result[0] : { totalSales: 0, numberOfBookings: 0 };

    lastSixMonthsSalesData.push({
      month: startDate.format("MMMM"),
      totalSales,
      numberOfBookings,
    });
  }

  //we want to call the fn 6 times to get the last 6 months data.
  for (let i = 0; i < 6; i++) {
    const startDateOfMonth = momentRange(currentDate).startOf("months");
    const endDateOfMonth = momentRange(currentDate).endOf("months");

    await fetchSalesOfSingleMonth(startDateOfMonth, endDateOfMonth);

    // subtract by one month to go to the previous one.
    currentDate.subtract(1, "months");
  }

  return lastSixMonthsSalesData;
};

// Top performing rooms
const getTopPerformingRooms = async (startDate: Date, endDate: Date) => {
  const topRooms = await Booking.aggregate([
    {
      // stage1: Filtering bookings
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      // stage2: Group bookings with roomID
      $group: {
        _id: "$room",
        bookingsCount: { $sum: 1 },
      },
    },
    {
      // stage3: Sort in descending order
      $sort: {
        bookingsCount: -1,
      },
    },
    {
      // stage4: limit top 3 bookings.
      $limit: 3,
    },
    {
      // stage5: to get more data from the room collection
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "_id",
        as: "roomData",
      },
    },
    {
      // stage6: to split the documents array
      $unwind: "$roomData",
    },
    {
      // stage7: to choose which data we want
      $project: {
        _id: 0,
        roomName: "$roomData.name",
        bookingsCount: 1,
      },
    },
  ]);

  return topRooms;
};

// Get sales stats - /api/admin/sales_stats
export const getSalesStats = catchAsyncError(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  // Getting startDate and endDate
  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);

  // starDate's hours will start from (0h,0m,0s,0ms);
  startDate.setHours(0, 0, 0, 0);

  // endDate's hours will be till (23,59,59,999). 1ms before next day.
  endDate.setHours(23, 59, 59, 999);

  // Getting bookings between start and end date
  const bookings = await Booking.find({
    createdAt: {
      $gt: startDate,
      $lt: endDate,
    },
  });

  const bookingsCount = bookings.length;

  // Calculating total sales
  const totalSales = bookings?.reduce(
    (acc, currElem) => acc + currElem.amountPaid,
    0
  );

  const lastSixMonthsSalesData = await getLastSixMonthsSales();
  const topRooms = await getTopPerformingRooms(startDate, endDate);

  return NextResponse.json({
    bookingsCount,
    totalSales,
    lastSixMonthsSalesData,
    topRooms,
  });
});
