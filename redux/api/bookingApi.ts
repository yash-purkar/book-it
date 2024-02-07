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
  }),
});

export const { useNewBookingMutation } = bookingApi;
