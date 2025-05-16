import React, { useEffect, useState } from 'react';
import MetricCard from '../dashboard/MetricCard';
import ActivityChart from '../dashboard/ActivityChart';
import { Download, RefreshCw } from 'lucide-react'; // Added RefreshCw icon
import { useGetStore } from '../../../hooks/admin/Storehooks';
import { useGetTotalAdImagesCount } from '../../../hooks/admin/Storeads';
import { getVisitorsCount, resetVisitorsCount } from '../../../hooks/common/Visitorscount';
import { resetcategoryclickCount, getcategoryclickCount } from '../../../hooks/common/Ctegoryclickcount';
import { getadsVisitorsCount, resetadsVisitorsCount } from '../../../hooks/common/Adscount';

const MainContent = () => {
  const { stores, loading, error } = useGetStore();
  const { totalImages, loading: adImagesLoading, error: adImagesError } = useGetTotalAdImagesCount();
  const storeCount = stores?.length || 0;
  const [visitorCount, setVisitorCount] = useState(0);
  const [categoryClicks, setCategoryClicks] = useState(0);
  const [adsClicks, setAdsClicks] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [visitorCount, categoryCount, adsCount] = await Promise.all([
        getVisitorsCount(),
        getcategoryclickCount(),
        getadsVisitorsCount()
      ]);
      setVisitorCount(visitorCount || 0);
      setCategoryClicks(categoryCount || 0);
      setAdsClicks(adsCount || 0);
    };
    fetchCounts();
  }, []);

  const handleReset = async (resetFunction, setFunction) => {
    const newCount = await resetFunction();
    if (newCount !== null) {
      setFunction(newCount);
    }
  };

  const chartData = [
    { name: 'Stores', value: storeCount },
    { name: 'Visitors', value: visitorCount },
    { name: 'Ads Clicks', value: adsClicks },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 ml-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <button 
            className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2"
            onClick={() => handleReset(resetVisitorsCount, setVisitorCount)}
          >
            <RefreshCw size={16} className="mr-2" />
            <span>Reset Visitors</span>
          </button>
          <button 
            className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2"
            onClick={() => handleReset(resetcategoryclickCount, setCategoryClicks)}
          >
            <RefreshCw size={16} className="mr-2" />
            <span>Reset Categories</span>
          </button>
          <button 
            className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2"
            onClick={() => handleReset(resetadsVisitorsCount, setAdsClicks)}
          >
            <RefreshCw size={16} className="mr-2" />
            <span>Reset Ads</span>
          </button>
          <button className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2">
            <Download size={16} className="mr-2" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Stores" value={storeCount} />
        <MetricCard title="Site Visitors" value={visitorCount} />
        <MetricCard title="Ads Clicks" value={adsClicks} />
        <MetricCard title="Total Ads" value={adImagesLoading ? 'Loading...' : totalImages} />
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