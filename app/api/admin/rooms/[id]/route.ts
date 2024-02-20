export const dynamic = 'force-dynamic';

import connectToDB from "@/backend/config/db.Connect";
import {
  deleteRoom,
  updateRoomDetails,
} from "@/backend/controllers/roomController";
import { authorizeRoles, isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.use(isAuthenticated,authorizeRoles('admin')).put(updateRoomDetails);
router.delete(deleteRoom);

// It will update room details
export const PUT = async (request: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(request, ctx);
};

// It will delete a room
export const DELETE = async (request: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(request, ctx);
};
