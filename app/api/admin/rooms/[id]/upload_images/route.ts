import connectToDB from "@/backend/config/db.Connect";
import { uploadImages } from "@/backend/controllers/roomController";
import { authorizeRoles, isAuthenticated } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {

}

const router = createEdgeRouter<NextRequest,RequestContext>();

connectToDB();
router.use(isAuthenticated,authorizeRoles('admin')).put(uploadImages)

export const PUT = async (request:NextRequest,ctx:RequestContext):Promise<any> => {
return router.run(request,ctx)
}