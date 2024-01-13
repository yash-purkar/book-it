import mongoose from "mongoose";

/**
 * * ! - (non-null assertion operator) This operator indicates the value of given variable will definitely not undefined or null
 */

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URI = "";
  if (process.env.NODE_ENV === "development")
    DB_URI = process.env.DB_LOCAL_URI!;

  if (process.env.NODE_ENV === "production") DB_URI = process.env.DB_URI!;

  await mongoose.connect(DB_URI).then(()=>console.log("Connected To MONGODB"));
};

export default connectToDB;

/**
     * There are a values for readyState - Connection ready state
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
    99 = uninitialized
     */
