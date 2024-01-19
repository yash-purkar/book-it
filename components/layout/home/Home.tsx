"use client";
import React, { useEffect } from "react";
import styles from "./home.module.css";
import { SingleRoom } from "@/components/room/singleRoom/SingleRoom";
import toast from "react-hot-toast";

export const Home = () => {

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
            <SingleRoom />
          </div>
        </div>
      </section>
    </div>
  );
};
