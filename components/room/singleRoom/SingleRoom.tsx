"use client"
import React from 'react'
import styles from './singleRoom.module.css'

import StarRatings from "react-star-ratings";
export const SingleRoom = () => {
  return (
    <div className={`${styles.card} p-2 w-100`}>
              <img
                className={`${styles["card-img-top"]} mx-auto`}
                src="images/default_room_image.jpg"
                alt=""
                height="170"
                width="270"
              />
              <div className={`${styles["card-body"]} d-flex flex-column`}>
                <h5 className={`${styles["card-title"]}`}>
                  <a href="/rooms/roomId">Room Name</a>
                </h5>
                <div className="mt-auto">
                  <p className={`${styles["card-text"]} mb-1`}>
                    <b>$100</b> / night
                  </p>
                </div>
                <div>
                  <div className="mb-2">
                    <StarRatings
                      rating={3}
                      starRatedColor="#e61e4d"
                      numberOfStars={5}
                      name="rating"
                      starDimension={'1rem'}
                      starSpacing={'0.1rem'}
                    />
                    <span className={`${styles["no-of-reviews"]}`}>
                      (50 Reviews)
                    </span>
                  </div>
                  <a
                    className={`btn ${styles["view-btn"]}  w-100" href="/rooms/roomId`}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
  )
}
