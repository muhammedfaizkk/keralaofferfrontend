import React from 'react';
import FilterControls from '../dashboard/FilterControls';
import MetricCard from '../dashboard/MetricCard';
import ChartCard from '../dashboard/ChartCard';
import ActivityChart from '../dashboard/ActivityChart';
import TopicsList from '../dashboard/TopicsList';
import Leaderboard from '../dashboard/Leaderboard';
import { Download } from 'lucide-react';
import { activityData } from '../../../data/mockData';

const MainContent = () => {
  return (
    <div className="flex-1 p-4 md:p-8 ml-0 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Reports</h1>
        <button className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2">
          <Download size={16} className="mr-2" />
          <span>Download</span>
        </button>
      </div>
      
      <FilterControls />
      
      {/* Top metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Action Views" value="27" suffix="HR" />
        <MetricCard title="Questions Answered" value="3,288" />
        <MetricCard title="Av. Search Length" value="2m 34s" />
        <MetricCard 
          title="Activity" 
          chart={
            <ActivityChart 
              data={activityData.slice(-6)} 
              height={40} 
              showAxis={false} 
            />
          } 
        />
      </div>
      
      {/* Middle metrics with charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ChartCard 
          title="Starting Percentage" 
          value="64%" 
          chartType="line" 
          color="#3B82F6" 
          data={[5, 10, 5, 10, 5, 10]} 
        />
        <ChartCard 
          title="Content Knowledge" 
          value="86%" 
          chartType="line" 
          color="#3B82F6" 
          data={[15, 5, 15, 10, 15, 5]} 
        />
        <ChartCard 
          title="Knowledge Gain" 
          value="+34%" 
          chartType="line" 
          color="#10B981" 
          data={[15, 15, 10, 5, 5, 0]} 
          showArrow={true} 
          arrowDirection="up" 
          valueColor="text-green-500" 
        />
      </div>
      
      {/* Activity chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium">Activity</div>
          <div className="text-sm text-gray-500">Month</div>
        </div>
        <ActivityChart data={activityData} height={120} showAxis={true} />
      </div>
      
      {/* Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <TopicsList title="Weakest Topics" topics={[
          { title: 'Food Safety', percentage: 78, icon: 'warning', color: 'red' },
          { title: 'Coronavirus Safety Procedures', percentage: 83, icon: 'chat', color: 'orange' },
          { title: 'Company Positioning', percentage: 86, icon: 'building', color: 'orange' }
        ]} />
        
        <TopicsList title="Strongest Topics" topics={[
          { title: 'Data Protocols', percentage: 97, icon: 'lock', color: 'green' },
          { title: 'Cyber Security Basics', percentage: 93, icon: 'shield', color: 'green' },
          { title: 'Social Media Practices', percentage: 90, icon: 'users', color: 'green' }
        ]} />
      </div>
      
      {/* Leaderboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Leaderboard 
          title="User Leaderboard" 
          users={[
            { name: 'Jesse Thomas', points: 917, correctPercentage: 88, rank: 1 },
            { name: 'Tonia Mathis/Pippen', points: 877, correctPercentage: 86, rank: 2 }
          ]} 
        />
        
        <Leaderboard 
          title="Group Leaderboard" 
          users={[
            { name: 'Houston Facility', points: 10213, correctPercentage: 91, rank: 1 },
            { name: 'Test Group', points: 9851, correctPercentage: 89, rank: 2 }
          ]} 
          isGroup={true}
        />
      </div>
    </div>
  );
};

export default MainContent;