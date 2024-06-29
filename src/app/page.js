import DataChart from './components/DataChart/DataChart'
import TopClients from './components/TopClients/TopClients'

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4 2xl:gap-6 mt-2">
        <div className=" rounded border border-stroke bg-white px-7.5 py-6 dark:border-strokedark dark:bg-boxdark hover:bg-primary hover:text-white hover:scale-105 duration-150">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Yesterday's Dipping</span>
              <div className="text-900 font-medium text-xl">15187312</div>
            </div>
            <div className="flex items-center justify-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-shopping-cart text-blue-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">+13% </span>
          <span className="text-500">since previous day</span>
        </div>
        <div className=" rounded border border-stroke bg-white px-7.5 py-6 dark:border-strokedark dark:bg-boxdark hover:bg-primary hover:text-white hover:scale-105 duration-150">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Yesterday's SMS</span>
              <div className="text-900 font-medium text-xl">21187312</div>
            </div>
            <div className="flex items-center justify-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-map-marker text-orange-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">+17% </span>
          <span className="text-500">since previous day</span>
        </div>
        <div className=" rounded border border-stroke bg-white px-7.5 py-6 dark:border-strokedark dark:bg-boxdark hover:bg-primary hover:text-white hover:scale-105 duration-150">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Today's Dipping</span>
              <div className="text-900 font-medium text-xl">28441</div>
            </div>
            <div className="flex items-center justify-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-inbox text-cyan-500 text-xl" />
            </div>
          </div>
          <span className="text-red font-medium">-8% </span>
          <span className="text-500">than yesterday</span>
        </div>
        <div className=" rounded border border-stroke bg-white px-7.5 py-6 dark:border-strokedark dark:bg-boxdark hover:bg-primary hover:text-white hover:scale-105 duration-150">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Today's SMS</span>
              <div className="text-900 font-medium text-xl">152</div>
            </div>
            <div className="flex items-center justify-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-comment text-purple-500 text-xl" />
            </div>
          </div>
          <span className="text-red font-medium">-11% </span>
          <span className="text-500">than yesterday</span>
        </div>
      </div>

      <div className='border border-stroke shadow-md bg-white my-4 p-2 rounded'>
        <DataChart />
      </div>

      <div>
        <TopClients />
      </div>
    </>
  );
}
