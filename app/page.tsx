import { Home } from '@/components/layout/home/Home'

// export const revalidate = 10;
// In this case we don't need to pass it in fetch.

const getRoomsData = async () => {
try {
  const response = await fetch('http://localhost:3000/api/rooms',{next:{
    revalidate:10
  }});
  return await response.json();
} catch (error) {
  console.log(error);
}
}

export default async function HomePage() {
  const rooms = await getRoomsData();
  console.log("Revalidate => ", rooms.resultsPerPage);
  return (
    <>
    <Home/>
    </>
  )
}
