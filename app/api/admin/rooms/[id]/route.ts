import connectToDB from "@/backend/config/db.Connect";
import { updateRoomDetails } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.put(updateRoomDetails);

// It will update room details
export const PUT = async (request: NextRequest, ctx: RequestContext) => {
  return router.run(request, ctx);
};
