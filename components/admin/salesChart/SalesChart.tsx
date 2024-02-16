"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChart {
  month: string;
  totalSales: number;
  numberOfBookings: number;
}

interface SalesChartProps {
  lastSixMonthsSalesData: SalesChart[];
}

export function SalesChart(props: SalesChartProps) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Performance of 6 months",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = props.lastSixMonthsSalesData
    ?.map((salesPerMonth) => salesPerMonth.month)
    .reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: props.lastSixMonthsSalesData?.map(
          (salesPerMonth) => salesPerMonth.totalSales
        ).reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Bookings",
        data: props.lastSixMonthsSalesData?.map((salesPerMonth) => salesPerMonth.numberOfBookings).reverse(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
