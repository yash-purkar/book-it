import { withAuth } from "next-auth/middleware";
import { IUser } from "./backend/models/user";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const url = req.url;
    // @ts-ignore
    const user = req?.nextauth?.token.user as IUser;

    // If route is admin it will start with /admin and user is not admin
    if (url.startsWith("/admin") && user.role !== "admin") {
      //redirect to '/' from current url
      return NextResponse.redirect(new URL("/", url));
    }
  },
  {
    callbacks: {
      //If token is there return true otherwise false
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/me/:path*", "/bookings/:path*", "/admin/:path*"],
};

// Middleware allows you to run code before a request is completed.
// In config we have passed matcher - In match we pass the path which we want to protect.
// in this case it will be /me/:allpaths after /me
