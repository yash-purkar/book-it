import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/user";

export const isAuthenticated = async(req:NextRequest,event:any,next:any) => {
    const session = await getToken({req});

    if(!session){
        return NextResponse.json({
            message:"Please login to access this page."
        },{status:401})
    }

    req.user = session.user as IUser;

    next();
}