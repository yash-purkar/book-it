"use client";

import { IRoom } from "@/backend/models/room";
import Link from "next/link";
import React from "react";
import styles from "./allRooms.module.css";
import { MDBDataTable } from "mdbreact";
interface AllRoomsProps {
  allRooms: {
    rooms: IRoom[];
  };
}

export const AllRooms: React.FC<AllRoomsProps> = ({ allRooms: { rooms } }) => {
  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Room ID",
          field: "roomID",
          sort: "asc",
        },
        {
          label: "Room Name",
          field: "roomName",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    rooms?.forEach((room) => {
      data.rows.push({
        roomID: room._id,
        roomName: room.name,
        actions: (
          <div className={styles.action}>
            <Link href={`/admin/rooms/update_room/${room._id}`}>
              <i className="fa fa-pencil"></i>
            </Link>
            <Link href={`/admin/rooms/${room._id}/upload_images`}>
              <i className="fa fa-images"></i>
            </Link>
            <button className="btn btn-outline-danger">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });
    return data;
  };

  return (
    <>
      <div className="container">
        <h1 className="my-5 position-relative">
          All Rooms
          <Link
            href={"/admin/rooms/new_room"}
            className="mt-0 btn text-decoration-underline"
          >
            Create new room
          </Link>
        </h1>
      </div>

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </>
  );
};
