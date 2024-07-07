import { Suspense } from 'react';
import WeeklyData from './@weeklydata/page';
import TopClientsData from './@topclients/page';

export default function Home() {
  return (
    <>
      <Suspense>
        <WeeklyData />
      </Suspense>
      <Suspense>
        <TopClientsData />
      </Suspense>
    </>
  );
}
