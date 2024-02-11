import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {});

export const config = {
  matcher: ["/me/:path*","/bookings:path*"],
};

// Middleware allows you to run code before a request is completed.
// In config we have passed matcher - In match we pass the path which we want to protect.
// in this case it will be /me/:allpaths after /me
