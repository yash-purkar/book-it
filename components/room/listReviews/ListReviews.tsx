import { IReview } from "@/backend/models/room";
import React from "react";
import StarRatings from "react-star-ratings";

interface ListReviewsProps {
  reviews: IReview[];
}

export const ListReviews: React.FC<ListReviewsProps> = ({ reviews }) => {
  return (
    <div className="reviews w-75 mb-5">
      <h3>Reviews : {reviews.length}</h3>
      <hr />
      <div className="review-card my-3">
        {reviews.map((review) => (
          <div className="row">
            <div className="col-3 col-lg-1">
              <img
                src={review.user.avatar.url ?? "/images/default_avatar.jpg"}
                alt={review.user.name}
                width="60"
                height="60"
                className="rounded-circle"
              />
            </div>
            <div className="col-9 col-lg-11 ">
              <div className="ratings mt-auto mb-3 flex align-items-center">
                <StarRatings
                  rating={3}
                  starRatedColor="#e61e4d"
                  numberOfStars={5}
                  name="rating"
                  starDimension={"1.2rem"}
                  starSpacing={"0.1rem"}
                />
                <span className="no-of-reviews">
                  ({reviews.length} Reviews)
                </span>
              </div>
              <p className="review_user mt-1">by {review.user.name}</p>
              <p className="review_comment">{review.comment}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
