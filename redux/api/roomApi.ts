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
    addNewRoom: builder.mutation({
      query(body) {
        return {
          url: `/admin/rooms`,
          method: "POST",
          body,
        };
      },
    }),
    updateRoom: builder.mutation({
      query({id,body}) {
        return{
          url:`/admin/rooms/${id}`,
          method:"PUT",
          body
        }
      }
    })
  }),
});

export const { useAddReviewMutation, useCanAddReviewQuery,useAddNewRoomMutation,useUpdateRoomMutation } = roomApi;
