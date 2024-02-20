export const dynamic = 'force-dynamic';

import connectToDB from "@/backend/config/db.Connect";
import { updatePassword } from "@/backend/controllers/userController";
import { isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}
const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.use(isAuthenticated).put(updatePassword);

export const PUT = (request: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(request, ctx);
};
