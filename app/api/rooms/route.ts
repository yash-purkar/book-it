import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { allRooms } from "@/backend/controllers/roomController";


/**
 * createEdgeRoute - For creating instance of router with given types
 * NextRequest - Upcoming HTTP Req type
 * RequestContext - Contains params or additional info to the route
 *
 * router.get() - For get requests on this route it will handle using given controller.
 * router.run() - It is responsible for executing the appropriate route handler based on the HTTP method path specified in the incoming request.
 */

interface RequestContext {
    params :{
        id:string;
    }
}

const router = createEdgeRouter<NextRequest,RequestContext>();

router.get(allRooms);

export async function GET(request:NextRequest,ctx:RequestContext) {
    return router.run(request,ctx)
}