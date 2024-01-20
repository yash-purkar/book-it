"use client"
import React from 'react'
import styles from './singleRoom.module.css'

import StarRatings from "react-star-ratings";
import { IRoom } from '@/backend/models/room';
import Image from 'next/image';
import Link from 'next/link';

interface SingleRoomType {
  room:IRoom
}
export const SingleRoom = ({room}:SingleRoomType) => {

  return (
    <div className={`${styles.card} p-2 w-100`}>
              <Image
                className={`${styles["card-img-top"]} mx-auto`}
                src={room.images[0]?.url ? room.images[0]?.url : "/images/default_room_image.jpg"}
                alt=""
                height="170"
                width="270"
              />
              <div className={`${styles["card-body"]} d-flex flex-column`}>
                <h5 className={`${styles["card-title"]}`}>
                  <a href="/rooms/roomId">{room.name}</a>
                </h5>
                <div className="mt-auto">
                  <p className={`${styles["card-text"]} mb-1`}>
                    <b>${room.pricePerNight}</b> / night
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
                      ({room.reviews.length} Reviews)
                    </span>
                  </div>
                  <Link
                  href={`/rooms/${room?._id}`}
                    className={`btn ${styles["view-btn"]}  w-100" href="/rooms/roomId`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
  )
}
