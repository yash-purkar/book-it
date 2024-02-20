export const dynamic = 'force-dynamic';

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server"

export const POST = async(request:NextRequest):Promise<any> => {
    const secret = request.nextUrl.searchParams.get('secret');
    const tag = request.nextUrl.searchParams.get('tag');

    if(secret !== process.env.NEXT_PUBLIC_REVALDATE_SECRET) {
        return NextResponse.json({
            errorMessage:"Invalid Secret Token"
        });
    }

    if(!tag){
        return NextResponse.json({
            errorMessage:"Missing tag"
        })
    }

    revalidateTag(tag);

    return NextResponse.json({
        revalidated:true,
        now:Date.now()
    })
}
