"use client";

import { IRoom } from "@/backend/models/room";
import Image from "next/image";
import React from "react";
import StarRatings from "react-star-ratings";
import { RoomImageSlider } from "../RoomImageSlider/RoomImageSlider";
import { RoomFeatures } from "../roomFeatures/RoomFeatures";
import { RoomBookingDatePicker } from "../roomBookingDatePicker/RoomBookingDatePicker";
import { NewReviewModal } from "../newReviewModal/NewReviewModal";
import { ListReviews } from "../listReviews/ListReviews";
interface RoomDetailsProps {
  data: {
    room: IRoom;
  };
}

export const RoomDetails = ({ data}: RoomDetailsProps) => {
  const { room } = data;

  return (
    <>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <StarRatings
            rating={3}
            starRatedColor="#e61e4d"
            numberOfStars={5}
            name="rating"
            starDimension={"1.2rem"}
            starSpacing={"0.1rem"}
          />
          <span className="no-of-reviews">({room.reviews.length} Reviews)</span>
        </div>

        <RoomImageSlider images={data.room.images} />

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>
             {room.description}
            </p>

            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <RoomBookingDatePicker room={room}/>

            {/* Room Location Map */}
          </div>
        </div>

        <NewReviewModal />

        <ListReviews />
      </div>
    </>
  );
};
