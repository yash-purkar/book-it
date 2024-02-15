import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/user";

export const isAuthenticated = async (
  req: NextRequest,
  event: any,
  next: any
) => {
  const session = await getToken({ req });
  if (!session) {
    return NextResponse.json(
      {
        message: "Please login to access this route.",
      },
      { status: 401 }
    );
  }
  req.user = session.user as IUser;
  return next();
};

// Only admin can access admin routes
export const authorizeRoles = (...roles: string[]) => {
  return (request: NextRequest, event: any, next: any) => {
    if (!roles.includes(request.user.role)) {
      return NextResponse.json({
        errorMessage: `Role (${request.user.role}) can not acces this route.`,
      },{status:403});
    }
    return next();
  };
};
