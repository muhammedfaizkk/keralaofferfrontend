import React, { useEffect, useState } from 'react'; // ✅ include useEffect & useState
import MetricCard from '../dashboard/MetricCard';
import ActivityChart from '../dashboard/ActivityChart';
import { Download } from 'lucide-react';
import { useGetStore } from '../../../hooks/admin/Storehooks';
import { useGetTotalAdImagesCount } from '../../../hooks/admin/Storeads';
import { getVisitorsCount } from '../../../hooks/common/Visitorscount';

const MainContent = () => {
  const { stores, loading, error } = useGetStore();
  const { totalImages, loading: adImagesLoading, error: adImagesError } = useGetTotalAdImagesCount();
  const storeCount = stores?.length || 0;
  const [visitorCount, setVisitorCount] = useState(0); // ✅ state for visitors

  useEffect(() => {
    const fetchVisitorCount = async () => {
      const count = await getVisitorsCount();
      setVisitorCount(count);
    };
    fetchVisitorCount();
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard title="Stores" value={storeCount} />
        <MetricCard title="Site Visitors" value={visitorCount} />
        <MetricCard title="Aads" value={adImagesLoading ? 'Loading...' : totalImages} />
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
