import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    uniqu:true
  },
  password:{
    type:String,
    required:true,
    minlength:[6,"Password must be longer than 6 characters."],
    select:false, // If we fetch the user data the password field won't come in response.
  },
  avatar:{
    public_id:String,
    url:String
  },
  role:{
    type:String,
    default:"user"
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
});

export default mongoose.models.User || mongoose.model<IUser>("User",userSchema);