import * as mongoose from "mongoose";
import { IRoom } from "./room";
import { IUser } from "./user";

export interface IBooking extends mongoose.Document {
  room: IRoom;
  user: IUser;
  checkInDate: Date;
  checkoutDate: Date;
  amountPaid: number;
  daysOfStay: number;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;
  createdAt: Date;
}

const bookingSchema: mongoose.Schema<IBooking> = new mongoose.Schema(
  {
    room: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Room",
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkoutDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    daysOfStay: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Booking as mongoose.Model<IBooking>) || mongoose.model('Booking', bookingSchema);
