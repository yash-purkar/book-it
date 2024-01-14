import connectToDB from '@/backend/config/db.Connect';
import { addNewRoom } from '@/backend/controllers/roomController';
import {createEdgeRouter} from 'next-connect'
import { NextRequest } from 'next/server';

interface RequestContext {};

const router = createEdgeRouter<NextRequest,RequestContext>();

connectToDB();

router.post(addNewRoom);
// It will call for all POST requests on this route.
export async function POST(request:NextRequest,ctx:RequestContext) {
    return router.run(request,ctx);
}