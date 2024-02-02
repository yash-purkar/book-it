import connectToDB from "@/backend/config/db.Connect";
import { updatePassword } from "@/backend/controllers/userController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}
const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.put(updatePassword);

export const PUT = (request: NextRequest, ctx: RequestContext) => {
  return router.run(request, ctx);
};
