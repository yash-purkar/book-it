import { Home } from '@/components/layout/home/Home'

const getRoomsData = async () => {
try {
  const response = await fetch('http://localhost:3000/api/rooms');
  return await response.json();
} catch (error) {
  console.log(error);
}
}

export default async function HomePage() {
  const rooms = await getRoomsData();
console.log("Rooms per page => ", rooms.resultsPerPage);
  return (
    <>
    <Home/>
    </>
  )
}


// Next js extends native fetch method so we can configure the behaviour of caching and revalidating.
// We can fetch data in server components only.

// We've done console.log("Rooms per page => ", rooms.resultsPerPage); => output will be Rooms per page 4
// Now if we go to controller file in room controller and change the value of resultsPerPage it will not reflect here it will be still 4 because Next JS serving us the cached version of data.

// So we are not getting the data dynamically from the backend on each request.

// If data doesn't change frequently we can use caching.
// If data changes frequently we can override the caching behaviour.