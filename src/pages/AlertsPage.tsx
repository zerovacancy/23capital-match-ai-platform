import React from 'react';
import { AlertCenter } from '@/components/alerts/AlertCenter';
import { AlertsProvider } from '@/context/AlertsContext';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';

const AlertsPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cook County Property Alerts</h1>
            <p className="text-gray-500">
              Stay updated on property opportunities, price changes, and market trends
            </p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <AlertsProvider>
              <AlertCenter />
            </AlertsProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;