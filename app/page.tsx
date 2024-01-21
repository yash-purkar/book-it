import { Home } from "@/components/layout/home/Home";
import Error from "./error";

export const metadata = {
  title: "Home - BookIT",
};

const getRoomsData = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);

  const queryString = urlParams.toString();

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/rooms?${queryString}`,
      { cache: "no-cache" }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
interface HomePageProps {
  searchParams: string;
}
export default async function HomePage({ searchParams }: HomePageProps) {
  const data = await getRoomsData(searchParams);

  if (data.errorMessage) {
    return <Error error={{ ...data, message: data.errorMessage }} />;
  }
  return (
    <>
      <Home data={data} />
    </>
  );
}
