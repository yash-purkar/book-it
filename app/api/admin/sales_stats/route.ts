export const dynamic = 'force-dynamic';

import connectToDB from "@/backend/config/db.Connect";
import { getSalesStats } from "@/backend/controllers/bookingController";
import { authorizeRoles, isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();
router.use(isAuthenticated,authorizeRoles('admin')).get(getSalesStats);

export const GET = async (req: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(req, ctx);
};
