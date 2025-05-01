import React from 'react';

interface ArchitectureDiagramProps {
  className?: string;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ className }) => {
  return (
    <div className={`architecture-diagram ${className || ''}`}>
      <div className="p-6 border rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4 text-center text-blue-700">System Architecture</h3>
        
        {/* Simple static diagram using divs instead of mermaid */}
        <div className="flex flex-col gap-4">
          {/* Data Sources */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="text-blue-800 font-medium mb-2 text-center">DATA SOURCES</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded text-sm text-center">HubSpot CRM</div>
              <div className="bg-white p-2 rounded text-sm text-center">Pro Forma Sheets</div>
              <div className="bg-white p-2 rounded text-sm text-center">Pitch Decks</div>
              <div className="bg-white p-2 rounded text-sm text-center">Market/Property Data</div>
            </div>
          </div>
          
          {/* Security Layer */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="text-blue-800 font-medium mb-2 text-center">SECURITY LAYER</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded text-sm text-center">Role-based Access</div>
              <div className="bg-white p-2 rounded text-sm text-center">Encryption Controls</div>
              <div className="bg-white p-2 rounded text-sm text-center">Compliance Management</div>
              <div className="bg-white p-2 rounded text-sm text-center">Audit Trails</div>
            </div>
          </div>
          
          {/* AI Core */}
          <div className="bg-blue-700 border border-blue-800 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 text-center">AI CORE SYSTEM</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="bg-blue-100 p-2 rounded text-sm text-center text-blue-800">LP Profile Engine</div>
              <div className="bg-blue-100 p-2 rounded text-sm text-center text-blue-800">Deal Analysis Engine</div>
              <div className="bg-blue-100 p-2 rounded text-sm text-center text-blue-800">Capital Raise Tracker</div>
              <div className="bg-blue-100 p-2 rounded text-sm text-center text-blue-800">Market Analysis Engine</div>
              <div className="bg-blue-100 p-2 rounded text-sm text-center text-blue-800">Matching Algorithm</div>
              <div className="bg-blue-100 p-2 rounded text-sm text-center text-blue-800">Reporting Generator</div>
            </div>
          </div>
          
          {/* Feedback Loops */}
          <div className="bg-indigo-100 border border-indigo-200 p-4 rounded-lg">
            <h4 className="text-indigo-800 font-medium mb-2 text-center">FEEDBACK LOOPS</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded text-sm text-center">LP Feedback Integration</div>
              <div className="bg-white p-2 rounded text-sm text-center">Deal Outcomes</div>
              <div className="bg-white p-2 rounded text-sm text-center">Outreach Optimization</div>
              <div className="bg-white p-2 rounded text-sm text-center">Performance Learning</div>
            </div>
          </div>
          
          {/* Integrations */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="text-blue-800 font-medium mb-2 text-center">INTEGRATIONS</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded text-sm text-center">MS Teams Updates</div>
              <div className="bg-white p-2 rounded text-sm text-center">Office 365 Documents</div>
              <div className="bg-white p-2 rounded text-sm text-center">HubSpot Actions</div>
              <div className="bg-white p-2 rounded text-sm text-center">ShareFile Secure Docs</div>
            </div>
          </div>
        </div>
        
        {/* Arrows connecting sections */}
        <div className="flex justify-center my-4">
          <div className="text-blue-700 text-sm">
            Data flow: Data Sources → Security Layer → AI Core → Feedback Loops → Integrations
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;