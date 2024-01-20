"use client";
import React, { useEffect } from "react";
import styles from "./home.module.css";
import { SingleRoom } from "@/components/room/singleRoom/SingleRoom";
import toast from "react-hot-toast";
import { IRoom } from "@/backend/models/room";

interface HomeProps {
  data : {
    success:boolean,
    resultsPerPage : number;
    filteredRoomsCount:number;
    rooms: IRoom[]
  }
}

export const Home = ({data}:HomeProps) => {

  useEffect(() => {
    // We've passed id to prevent duplicate toasts.
      toast.success("Welcome😀 Yash!",{
        id:'success',
      });
  },[])
  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className={`mb-3 ml-2 ${styles["stays-heading"]}`}>All Rooms</h2>
        <a href="/search" className={`ml-2 ${styles["back-to-search"]}`}>
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
            {
              data.rooms.length === 0 ? <div className="alert danger mt-5 w-100">
                No Rooms.
              </div> : data.rooms.map((room,i) => <SingleRoom key={i} room={room} />)
            }
          </div>
        </div>
      </section>
    </div>
  );
};
