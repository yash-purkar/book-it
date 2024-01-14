import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedData = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/book-it");

    await Room.deleteMany();
    console.log("Delted Old Rooms Data!");
    await Room.insertMany(rooms);
    console.log("Added Nwe Rooms Data");

    process.exit();
  } catch (error) {
    console.log(error);
    // exit from the process;
    process.exit();
  }
};
seedData();
// steps
// 1 - We've to connect to DB
// 2 - Delete the old rooms data from DB
// 3 - Add the rooms in DB;
