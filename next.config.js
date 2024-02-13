require("dotenv").config();

const nextConfig = {
  // env: {
  //   RAZORPAY_KEY: process.env.RAZORPAY_KEY,
  //   RAZORPAY_SECRET_KEY: process.env.RAZORPAY_SECRET_KEY,
  // },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
module.exports = nextConfig;
