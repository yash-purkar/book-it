import connectToDB from "@/backend/config/db.Connect";
import { registerUser } from "@/backend/controllers/userController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.post(registerUser);

export const POST = async (request: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(request, ctx);
};
