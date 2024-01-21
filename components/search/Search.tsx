"use client";
import React, { useState } from "react";
import styles from "./search.module.css";
import { useRouter } from "next/navigation";

export const Search = () => {
  const [location, setLocation] = useState<string>();
  const [numOfGuests, setNumOfGuests] = useState<number>();
  const [roomType, setRoomType] = useState<string>();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // It'll filter out the locations which has no value
    const queryString = [
      location && `location=${location}`,
      numOfGuests && `guestCapacity=${numOfGuests}`,
      roomType && `category=${roomType}`,
    ]
      .filter(Boolean)
      .join("&");

    router.push(`/?${queryString}`);
  };

  return (
    <div className={`row ${styles["wrapper"]} mt-5`}>
      <div className="col-10 col-lg-5">
        <form
          onSubmit={handleSubmit}
          className="shadow rounded"
          action="#"
          method="POST"
        >
          <h2 className="mb-3">Search Rooms</h2>
          <div className="form-group mt-3">
            <label htmlFor="location_field" className="mb-1">
              {" "}
              Location{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="location_field"
              placeholder="Enter the location here"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="guest_field" className="mb-1">
              {" "}
              No. of Guests{" "}
            </label>
            <select
              className="form-select"
              id="guest_field"
              onChange={(e) => setNumOfGuests(Number(e.target.value))}
              value={numOfGuests}
            >
              <option value="">--Guest Capicity--</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              {" "}
              Room Type{" "}
            </label>
            <select
              className="form-select"
              id="room_type_field"
              onChange={(e) => setRoomType(e.target.value)}
              value={roomType}
            >
              <option value="">--Room Type--</option>
              {["King", "Single", "Twins"].map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
