import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
export interface IUser {
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
  comparePasswordCustomMethod: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be longer than 6 characters."],
    select: false, // If we fetch the user data the password field won't come in response.
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypt the password before saving the user.
userSchema.pre("save", async function (next) {
  // This refers to the new user
  if (!this.isModified("password")) {
    // Means we have not made any changes in password field.
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  // Salt means how much stronger password we need.
});

userSchema.methods.comparePasswordCustomMethod = async function (
  enteredPassword: string
): Promise<boolean> {
  // This refers to the user
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
