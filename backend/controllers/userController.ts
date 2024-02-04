import { NextRequest, NextResponse } from "next/server";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import { delete_file, upload_file } from "../utils/cloudinary";
import sendEmail from "../utils/sendEmail";
import { resetPasswordHTMLTemplate } from "../utils/emailTemplate";

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

// Update user password /api/me/update_password
export const updatePassword = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();

  // @ts-ignore
  const user = await User.findById(request.user._id).select("+password");

  const isPasswordMatched = await user.comparePasswordCustomMethod(
    body.oldPassword
  );

  if (!isPasswordMatched) {
    throw new ErrorHandler("Old password is incorrect!", 400);
  }

  user.password = body.newPassword;
  await user.save();

  return NextResponse.json({ success: true });
});

// Upload user avatar /api/me/upload_avatar
export const uploadAvatar = catchAsyncError(async (request: NextRequest) => {
  const body = await request.json();

  // Upload file to cloudinary.
  const avatarUploadResult = await upload_file(body.avatar, "bookit/avatar");
  console.log({ avatarUploadResult });

  // Delete avatar from cloudinary if user already has avatar.
  if (request.user.avatar) {
    await delete_file(request.user.avatar.public_id);
  }

  // @ts-ignore
  const user = await User.findByIdAndUpdate(request.user._id, {
    avatar: avatarUploadResult,
  });

  return NextResponse.json({ Success: true });
});


// Forgot password - /api/password/forgot

export const forgotPassword = catchAsyncError(async(request:NextRequest)=>{
const body = await request.json();

const user = await User.findOne({email:body.email});

if(!user) {
  throw new ErrorHandler("There is no user associated with this email.",404)
}

//Get the token 
const resetPasswordToken = user.getResetPasswordToken();

// bcz we are adding token and time in db in getResetPasswordToken();
await user.save();

// url where user will redirect
const requestUrl = `${process.env.API_URL}/password/reset/${resetPasswordToken}`

// Get email template to send to user
const message = resetPasswordHTMLTemplate(user.name,requestUrl)

try{
  await sendEmail({email:body.email,subject:"BookIT Password Recovery",message})
}catch(err){
  //If email send failed
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  throw new ErrorHandler("Failed to send email, Please try after sometime.",500);
}

  return NextResponse.json({
    Success:true,
    user
  })
})