import { Home } from '@/components/layout/home/Home'

const getRoomsData = async () => {
try {
  const response = await fetch('http://localhost:3000/api/rooms',{cache:'no-cache'});
  return await response.json();
} catch (error) {
  console.log(error);
}
}

export default async function HomePage() {
  const rooms = await getRoomsData();
  return (
    <>
    <Home/>
    </>
  )
}
