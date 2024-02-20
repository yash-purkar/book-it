export const dynamic = 'force-dynamic';

import connectToDB from "@/backend/config/db.Connect";
import { myBookings } from "@/backend/controllers/bookingController";
import { isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();
router.use(isAuthenticated).get(myBookings);

export const GET = async (request: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(request, ctx);
};
