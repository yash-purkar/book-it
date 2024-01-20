import mongoose, { ObjectId, Schema } from "mongoose";

interface ILocation {
  type: string;
  coordinates: {
    type: number[]; // laptitude and logitude for location.
  };
  formattedAddress: string; // geoLocation will give this
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface IImage {
  public_id: string;
  url: string;
}

interface IReviews {
  user: ObjectId;
  rating: number;
  comment: string;
}

export interface IRoom {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  images: IImage[];
  category: string;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAc: boolean;
  arePetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  reviews: IReviews[];
  user: ObjectId;
  createdAt: Date;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter room name."],
    trim: true, // It'll remove extra spaces from beginning and at the end of the string.
    maxLegth: [100, "Room name cannot exceed 100 characters."],
  },
  description: {
    type: String,
    required: [true, "Please enter description."],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter price per night."],
    default: 0,
  },
  address: {
    type: String,
    required: [true, "Please enter room address."],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], //It can only have 'Point' value. It is required for geoLocation package.
    },
    coordinates: {
      type: [Number], // laptitude and logitude for location.
      index: "2dsphere", // Required for geoLocation
    },
    formattedAddress: String, // geoLocation will give this
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  images: [{ public_id: String, url: String }],
  category: {
    type: String,
    required: [true, "Please enter room category."],
    enum: ["King", "Single", "Twins"], // Only this categories can be selected.
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter capacity of guests."],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds in the room."],
  },
  isInternet: {
    type: Boolean,
    require: true,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    require: true,
    default: false,
  },
  isAc: {
    type: Boolean,
    require: true,
    default: false,
  },
  arePetsAllowed: {
    type: Boolean,
    require: true,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    require: true,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    // review will be array of this.
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User", //User model
        comment: String,
        required: true,
      },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],

  //   User who has created the room.
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Room || mongoose.model<IRoom>('Room',roomSchema);