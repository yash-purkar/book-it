import connectToDB from "@/backend/config/db.Connect";
import { getRoomBookedDates } from "@/backend/controllers/bookingController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();
router.get(getRoomBookedDates);

export const GET = async (request: NextRequest, ctx: RequestContext) => {
  return router.run(request, ctx);
};
