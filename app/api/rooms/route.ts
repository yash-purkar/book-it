export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import {  getAllRooms } from "@/backend/controllers/roomController";
import connectToDB from "@/backend/config/db.Connect";
import { authorizeRoles, isAuthenticated } from "@/backend/middlewares/auth";
import { getToken } from "next-auth/jwt";

/**
 * createEdgeRoute - For creating instance of router with given types
 * NextRequest - Upcoming HTTP Req type
 * RequestContext - Contains params or additional info to the route
 *
 * router.get() - For get requests on this route it will handle using given controller.
 * router.run() - It is responsible for executing the appropriate route handler based on the HTTP method path specified in the incoming request.
 */

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
connectToDB();

router.get(getAllRooms)

// It will call for all GET requests on this route.
export async function GET(request: NextRequest, ctx: RequestContext):Promise<any> {
  return router.run(request, ctx);
}
