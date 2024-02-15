"use client";
import React, { useState } from "react";
import styles from './dashboard.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SalesStats } from "../salesStats/SalesStats";
import { SalesChart } from "../salesChart/SalesChart";
import { DoughnutChart } from "../doughnutChart/DoughnutChart";
export const Dashboard = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
      <button className={`btn ${styles['form-btn']} ms-4 mt-3`}>Fetch</button>
      </div>
      <SalesStats/>     

      <div className="row">
        <div className="col-12 col-lg-8">
          <h4 className="my-5 text-center">Sales History</h4>
          <SalesChart/>
        </div>

        <div className="col-12 col-lg-4 text-center">
          <h4 className="my-5">Top Performing Rooms</h4>
          <DoughnutChart/>
        </div>
      </div>
    </div>
  );
};
