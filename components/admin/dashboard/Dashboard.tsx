"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SalesStats } from "../salesStats/SalesStats";
import { SalesChart } from "../salesChart/SalesChart";
import { DoughnutChart } from "../doughnutChart/DoughnutChart";
import { useLazyGetSalesStatsQuery } from "@/redux/api/bookingApi";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

export const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [getSalesStats, { data, error }] = useLazyGetSalesStatsQuery();

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.error ?? "Something we'nt wrong!");
    }

    // If will call initially to get the todays data.
    if (startDate && endDate && !data) {
      const payload = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      getSalesStats(payload);
    }
  }, [error]);

  const handleFetch = () => {
    const payload = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    getSalesStats(payload);
  };

if(!data) return <Loading />

  return (
    <div className="ps-4 my-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="mb-3 me-4">
          <label htmlFor="startDate" className="form-label d-block">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="mb-3 me-4">
          <label htmlFor="startDate" className="form-label d-block">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <button
          onClick={handleFetch}
          className={`btn ${styles["form-btn"]} ms-4 mt-3`}
        >
          Fetch
        </button>
      </div>
      <SalesStats data={data} />

      <div className="row">
        <div className="col-12 col-lg-8">
          <h4 className="my-5 text-center">Sales History</h4>
          <SalesChart lastSixMonthsSalesData={data?.lastSixMonthsSalesData} />
        </div>

        <div className="col-12 col-lg-4 text-center">
          <h4 className="my-5">Top Performing Rooms</h4>
          {data?.topRooms.length == 0 ? <p>No Data Found</p>:<DoughnutChart topRooms={data?.topRooms}/>}
        </div>
      </div>
    </div>
  );
};
