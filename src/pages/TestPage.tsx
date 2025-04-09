import React from 'react';
import ImprovedRelationshipsDashboard from '@/components/dashboard/relationships/ImprovedRelationshipsDashboard';

const TestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Page: Improved Relationships Dashboard</h1>
        <p className="text-gray-500">This is a temporary page to preview the improved relationships dashboard.</p>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <ImprovedRelationshipsDashboard />
      </div>
    </div>
  );
};

export default TestPage;