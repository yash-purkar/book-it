import { Home } from "@/components/layout/home/Home";
import Error from "./error";

const getRoomsData = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/rooms`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function HomePage() {
  const data = await getRoomsData();

  if(data.errorMessage) {
    return <Error error={{...data,message:data.errorMessage}}/>
  }
  return (
    <>
      <Home data={data}/>
    </>
  );
}
