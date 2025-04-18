import React from 'react';
import FilterControls from '../dashboard/FilterControls';
import MetricCard from '../dashboard/MetricCard';
import ChartCard from '../dashboard/ChartCard';
import ActivityChart from '../dashboard/ActivityChart';
import TopicsList from '../dashboard/TopicsList';
import Leaderboard from '../dashboard/Leaderboard';
import { Download } from 'lucide-react'; // ✅ Add this
import { activityData } from '../../../data/mockData';
import { useGetStore } from '../../../hooks/admin/Storehooks';

// import { useGetStoreCount } from '../../../hooks/admin/Storehooks'; // if using separate hook

const MainContent = () => {
  const { stores, loading, error } = useGetStore(); // or useGetStoreCount
  const storeCount = stores?.length || 0;

  const visitorCount = 1524; // Replace with real analytics if available

  const chartData = [
    { name: 'Stores', value: storeCount },
    { name: 'Visitors', value: visitorCount },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 ml-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Reports</h1>
        <button className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2">
          <Download size={16} className="mr-2" />
          <span>Download</span>
        </button>
      </div>

      {/* <FilterControls /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Stores" value={storeCount} />
        <MetricCard title="Site Visitors" value={visitorCount} />
        <MetricCard title="Av. Search Length" value="2m 34s" />
        <MetricCard
          title="Activity"
          chart={<ActivityChart data={chartData} height={40} showAxis={false} />}
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium">Activity</div>
          <div className="text-sm text-gray-500">Month</div>
        </div>
        <ActivityChart data={chartData} height={120} showAxis={true} />
      </div>
    </div>
  );
};

export default MainContent;
