import connectToDB from "@/backend/config/db.Connect";
import { uploadAvatar } from "@/backend/controllers/userController";
import { isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

connectToDB();

router.use(isAuthenticated).put(uploadAvatar);

export const PUT = async (request: NextRequest, ctx: RequestContext):Promise<any> => {
  return router.run(request, ctx);
};
