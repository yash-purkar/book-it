import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query(body) {
        return {
          url: "bookings",
          method: "POST",
          body,
        };
      },
    }),
    checkBookingAvailability: builder.query({
      query({id,checkInDate,checkoutDate}) {

        return {
          url:`bookings/check_room_availability?roomId=${id}&checkInDate=${checkInDate}&checkoutDate=${checkoutDate}`
        }
      }
    })
  }),
});

export const { useNewBookingMutation,useLazyCheckBookingAvailabilityQuery } = bookingApi;
