import { NextRequest, NextResponse } from "next/server";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";

export const registerUser = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();
  const { name, email, password } = body;

  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorHandler("User already Exist", 409);
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();
  return NextResponse.json({
    success: true,
  });
});
