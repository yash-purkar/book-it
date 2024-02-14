import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query(body) {
        return {
          url: "/rooms/review",
          method: "POST",
          body,
        };
      },
    }),
    canAddReview: builder.query({
      query({ roomId }) {
        return {
          url: `/rooms/review/can_add_review?roomId=${roomId}`,
        };
      },
    }),
  }),
});

export const { useAddReviewMutation, useCanAddReviewQuery } = roomApi;
