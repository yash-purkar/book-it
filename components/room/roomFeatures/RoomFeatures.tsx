import { IRoom } from "@/backend/models/room";
import React from "react";
import styles from './roomFeatures.module.css'
interface RoomFeaturesProps {
    room:IRoom
}

export const RoomFeatures = ({room}:RoomFeaturesProps) => {

  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className={`${styles['room-feature']}`}>
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
        <p>{room.guestCapacity} Guests</p>
      </div>
      <div className={`${styles['room-feature']}`}>
        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
        <p>{room.numOfBeds} Beds</p>
      </div>
      <div className={`${styles['room-feature']}`}>
        <i className={room.isBreakfast ? "fa fa-check text-success" : "fa fa-times text-danger"} aria-hidden="true"></i>
        <p>Breakfast</p>
      </div>
      <div className={`${styles['room-feature']}`}>
        <i className={room.isAc ? "fa fa-check text-success" : "fa fa-times text-danger"} aria-hidden="true"></i>
        <p>AC</p>
      </div>
      <div className={`${styles['room-feature']}`}>
        <i className={room.arePetsAllowed ? "fa fa-check text-success" : "fa fa-times text-danger"} aria-hidden="true"></i>
        <p>Pets Allowed</p>
      </div>
      <div className={`${styles['room-feature']}`}>
        <i className={room.isRoomCleaning ? "fa fa-check text-success" : "fa fa-times text-danger"} aria-hidden="true"></i>
        <p>Room Cleaning</p>
      </div>
      {/* ... (Repeat the above room-feature for each feature) */}
    </div>
  );
};
