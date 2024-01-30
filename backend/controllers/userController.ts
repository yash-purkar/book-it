import { NextRequest, NextResponse } from "next/server";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";

// Add new User /api/auth/register
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


// Update user details /api/me/update
// It will update user name and email
export const updateProfile = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();

  const userData = {
    name: body.name,
    email: body.email,
  };

  // @ts-ignore
  const user = await User.findByIdAndUpdate(request.user._id, userData);

  return NextResponse.json({
    Success: true,
    user,
  });
});
