import connectToDB from "@/backend/config/db.Connect";
import { resetPassword } from "@/backend/controllers/userController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest,RequestContext>()

connectToDB();

router.put(resetPassword)

export const PUT = async (request:NextRequest,ctx:RequestContext) => {
    return router.run(request,ctx)
}