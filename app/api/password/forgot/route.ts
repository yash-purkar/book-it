import connectToDB from "@/backend/config/db.Connect";
import { forgotPassword } from "@/backend/controllers/userController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}
const router = createEdgeRouter<NextRequest, RequestContext>();
connectToDB();

router.post(forgotPassword);

export const POST = async (req: NextRequest, ctx: RequestContext) => {
  return router.run(req, ctx);
};
