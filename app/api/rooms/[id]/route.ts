import connectToDB from '@/backend/config/db.Connect';
import { getRoomDetails } from '@/backend/controllers/roomController';
import {createEdgeRouter} from 'next-connect';
import { NextRequest } from 'next/server';

interface RequestContext {
    params:{
        id:string
    }
};

const router = createEdgeRouter<NextRequest,RequestContext>();

connectToDB();

router.get(getRoomDetails);

export const GET = async(request:NextRequest,ctx:RequestContext):Promise<any> => {
    return router.run(request,ctx);
}