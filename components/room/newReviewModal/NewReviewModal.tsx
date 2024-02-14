"use client";

import React, { useEffect, useState } from "react";
import styles from "./newReviewModal.module.css";
import StarRatings from "react-star-ratings";
import { useAddReviewMutation } from "@/redux/api/roomApi";
import toast from "react-hot-toast";

export const NewReviewModal = ({ data }: { data: { roomId: string } }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const [addReview, { isError, isSuccess, error }] = useAddReviewMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to add review");
    }

    if (isSuccess) {
      toast.success("Review Added");
    }
  }, [isSuccess, isError]);

  const handleSubmit = () => {
    const reviewPayload = {
      roomId: data.roomId,
      rating,
      comment,
    };
    addReview(reviewPayload);
  };

  return (
    <>
      <button
        type="button"
        className={`btn ${styles["form-btn"]} mt-4 mb-5`}
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Submit Your Review
      </button>
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="ratings m-3 mt-10">
              <StarRatings
                rating={rating}
                starRatedColor="#e61e4d"
                numberOfStars={5}
                name="rating"
                starDimension={"2.4rem"}
                starSpacing={"0.2rem"}
                starHoverColor="#e61e4d"
                changeRating={(rating: number) => setRating(rating)}
              />
            </div>
            <div className="modal-body w-full resize-none border-red-700">
              <textarea
                onChange={(e) => setComment(e.target.value)}
                className={styles.reviewInput}
                name="review"
                id=""
                rows={10}
                placeholder="Add your review here"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleSubmit}
                type="button"
                className={`btn my-3 ${styles["form-btn"]} w-100`}
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={!comment || !rating}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
