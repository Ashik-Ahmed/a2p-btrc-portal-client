import { Suspense } from "react";
import WeeklyData from "./@weeklydata/page";
import TopClientsData from "./@topclients/page";

export default function Home() {
  return (
    <>
      {/* <p>Hello, Ashik</p> */}
      <Suspense fallback={<div>Loading...</div>}>
        <WeeklyData />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TopClientsData />
      </Suspense>
    </>
  );
}
