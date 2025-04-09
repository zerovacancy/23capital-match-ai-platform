import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RelationshipsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relationships Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Relationship management tools will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelationshipsDashboard;