export const revalidate = async (tag:string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revalidate?tag=${tag}&secret=${process.env.NEXT_PUBLIC_REVALDATE_SECRET}`,{
        method:'POST'
    });
}
