"use client";
import React, { useEffect, useState } from "react";
import styles from "./addNewRoom.module.css";
import { useRouter } from "next/navigation";
import { useAddNewRoomMutation } from "@/redux/api/roomApi";
import toast from "react-hot-toast";

export const AddNewRoom = () => {
  const [roomDetails, setRoomDetails] = useState({
    name: "",
    description: "",
    price: 0,
    address: "",
    location: "",
    category: "King",
    guestCapacity: 1,
    numOfBeds: 1,
    internet: false,
    breakfast: false,
    ac: false,
    petsAllowed: false,
    rooomCleaning: false,
  });
  const {
    name,
    description,
    price,
    address,
    category,
    guestCapacity,
    numOfBeds,
    internet,
    breakfast,
    ac,
    petsAllowed,
    rooomCleaning,
  } = roomDetails;

  const router = useRouter();
  const [addNewRoom, { isLoading, error, isSuccess }] = useAddNewRoomMutation();

  useEffect(() => {
    if (error) {
      toast.error("Failed to add new room");
    }

    if (isSuccess) {
      router.push("/admin/rooms");
      toast.success("Room Added");
    }
  }, [error, isSuccess]);

  //   If input is check box we'll store true of false otherwise actual value.
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoomPayload = {
      name,
      description,
      pricePerNight: Number(price),
      address,
      category,
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      isInternet: internet,
      isBreakfast: breakfast,
      isAC: ac,
      arePetsAllowed: petsAllowed,
      isRoomCleaning: rooomCleaning,
    };

    addNewRoom(newRoomPayload)
  };

  const roomFeatures: { name: string; value: keyof typeof roomDetails }[] = [
    { name: "Internet", value: "internet" },
    { name: "Breakfast", value: "breakfast" },
    { name: "AC", value: "ac" },
    { name: "Pets Allowed", value: "petsAllowed" },
    { name: "Room Cleaning", value: "rooomCleaning" },
  ];

  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="mb-4">New Room</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Room Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price_field" className="form-label">
              Price
            </label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              name="price"
              value={price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description_field" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description_field"
              rows={8}
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Room Description"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="room_type_field" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="room_type_field"
              name="category"
              value={category}
              onChange={handleChange}
            >
              {["King", "Single", "Twins"].map((data) => (
                <option value={data}>{data}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="guest_field" className="form-label">
                Guest Capacity
              </label>
              <select
                className="form-select"
                id="guest_field"
                name="guestCapacity"
                value={guestCapacity}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((data) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 col">
              <label htmlFor="numofbeds_field" className="form-label">
                Number of Beds
              </label>
              <select
                className="form-select"
                id="numofbeds_field"
                name="numOfBeds"
              >
                {[1, 2, 3].map((data) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="mb-3">Room Features</label>

          {
            roomFeatures.map(({name,value}) => <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={value}
              name={value}
              onChange={handleChange}
              checked={!!roomDetails[value]}
            />
            <label className="form-check-label" htmlFor={value}>
              {name}
            </label>
          </div>)
          }

          <button
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
            disabled={isLoading}
          >
            {isLoading ? "Adding" : "Create"} 
          </button>
        </form>
      </div>
    </div>
  );
};
