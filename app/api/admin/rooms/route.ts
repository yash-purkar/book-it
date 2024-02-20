export const dynamic = 'force-dynamic';

import connectToDB from "@/backend/config/db.Connect";
import {
  addNewRoom,
  getAllRoomsForAdmin,
} from "@/backend/controllers/roomController";
import { authorizeRoles, isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.use(isAuthenticated, authorizeRoles("admin")).post(addNewRoom);
router.use(isAuthenticated, authorizeRoles("admin")).get(getAllRoomsForAdmin);

// It will call for all POST requests on this route.
export async function POST(request: NextRequest, ctx: RequestContext):Promise<any> {
  return router.run(request, ctx);
}

// GET request to get the rooms for admin
export async function GET(request: NextRequest, ctx: RequestContext):Promise<any> {
  return router.run(request, ctx);
}
