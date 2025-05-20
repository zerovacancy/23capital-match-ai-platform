import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight, Building, DollarSign, TrendingUp } from 'lucide-react';

export default function AlertsTab() {
  return (
    <TabsContent value="alerts" className="mt-0">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm h-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
              <Bell className="h-5 w-5 text-[#275E91]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Property Alerts</h3>
              <p className="text-sm text-gray-500">Stay updated on property opportunities, price changes, and market trends</p>
            </div>
          </div>

          <a href="/alerts" target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2 px-6 bg-[#275E91] hover:bg-[#1E4A73] text-white">
              Open Alerts Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="rounded-lg border border-gray-200 p-4 bg-red-50">
            <h4 className="font-medium flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              High Priority
            </h4>
            <div className="text-2xl font-bold mt-2 mb-1">5</div>
            <p className="text-xs text-gray-500">Alerts requiring immediate attention</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 bg-blue-50">
            <h4 className="font-medium flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              New Properties
            </h4>
            <div className="text-2xl font-bold mt-2 mb-1">12</div>
            <p className="text-xs text-gray-500">Properties matching your criteria added this week</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 bg-green-50">
            <h4 className="font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Opportunity Score
            </h4>
            <div className="text-2xl font-bold mt-2 mb-1">3 Properties</div>
            <p className="text-xs text-gray-500">With opportunity score &gt; 90 in target areas</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium mb-4">Recent Alerts</h4>

          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <div className="p-2 rounded-full bg-red-100">
                <Building className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-medium">High Opportunity Property Identified</h5>
                <p className="text-xs text-gray-500 my-1">A property in Lincoln Park has been identified as a high opportunity investment.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">1 hour ago</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">high priority</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <div className="p-2 rounded-full bg-yellow-100">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Price Change Alert</h5>
                <p className="text-xs text-gray-500 my-1">A property in your watch list has decreased in price by 15%.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">1 day ago</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">medium priority</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Market Trend Detected</h5>
                <p className="text-xs text-gray-500 my-1">Cook County residential properties have increased 7% over the last quarter.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">2 days ago</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">low priority</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="/alerts" className="text-[#275E91] text-sm font-medium hover:underline">
              View all alerts →
            </a>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
