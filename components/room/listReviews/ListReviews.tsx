import React from 'react'

export const ListReviews = () => {
  return (
    <div className="reviews w-75 mb-5">
          <h3>3 Reviews</h3>
          <hr />
          {/* <!-- Individual Reviews go here --> */}
          <div className="review-card my-3">
            {/* <!-- Review Content goes here --> */}
            <div className="row">
              <div className="col-3 col-lg-1">
                <img
                  src="./images/avatar.jpg"
                  alt="John Doe"
                  width="60"
                  height="60"
                  className="rounded-circle"
                />
              </div>
              <div className="col-9 col-lg-11">
                <div className="star-ratings">
                  <i className="fa fa-star"></i>
                  {/* ... (Repeat stars for rating) */}
                  <i className="fa fa-star-half"></i>
                </div>
                <p className="review_user mt-1">by John Doe</p>
                {/* <!-- Placeholder for Review Comment --> */}
                <p className="review_comment">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  consectetur, mi nec tristique vehicula, elit tellus vulputate
                  ex, nec bibendum libero elit at orci.
                </p>
              </div>
              <hr />
            </div>
          </div>
          {/* <!-- Repeat the above review-card for each review --> */}
        </div>
  )
}
