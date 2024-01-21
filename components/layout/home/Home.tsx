"use client";
import React from "react";
import styles from "./home.module.css";
import { SingleRoom } from "@/components/room/singleRoom/SingleRoom";
import { IRoom } from "@/backend/models/room";
import { CustomPagination } from "../customPagination/CustomPagination";
import Link from "next/link";

interface HomeProps {
  data : {
    success:boolean,
    resultsPerPage : number;
    filteredRoomsCount:number;
    rooms: IRoom[]
  }
}

export const Home = ({data}:HomeProps) => {

  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className={`mb-3 ml-2 ${styles["stays-heading"]}`}>All Rooms</h2>
        <Link href="/search" className={`ml-2 ${styles["back-to-search"]}`}>
          <i className="fa fa-arrow-left"></i> Back to Search
        </Link>
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
      <CustomPagination resultsPerPage={data.resultsPerPage} filteredRoomsCount={data.filteredRoomsCount}/>
    </div>
  );
};
