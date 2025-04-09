import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Filter, ArrowRight, ChevronRight, Users, Calendar, Clock, MapPin, Building, FileText, Mail, Phone, PlusCircle, BarChart2, Heart, Activity } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Sample data for upcoming contacts
const upcomingContacts = [
  { 
    id: 1, 
    name: "Midwest Opportunity Fund", 
    purpose: "Quarterly Review", 
    date: "Today", 
    time: "10:00", 
    duration: 60,
    location: "Their office - Chicago",
    type: "meeting", 
    participants: ["John Smith", "Sarah Johnson", "Michael Brown"] 
  },
  { 
    id: 2, 
    name: "Blue Harbor Capital", 
    purpose: "Denver Highlands Timeline", 
    date: "Tomorrow", 
    time: "14:00", 
    duration: 45,
    type: "call", 
    participants: ["Michael Chen", "Rebecca Lee"] 
  },
  { 
    id: 3, 
    name: "Summit Ventures", 
    purpose: "Present Short-term Opportunities", 
    date: "Apr 15", 
    time: "11:30", 
    duration: 90,
    location: "Virtual - Zoom",
    type: "meeting", 
    participants: ["Robert Williams", "Amanda Clark"] 
  },
];

// Sample data for action items
const actionItems = [
  { 
    id: 1, 
    description: "Follow up on Riverfront Commons proposal", 
    lpName: "Midwest Opportunity Fund",
    dueDate: "Today", 
    type: "follow-up",
    priority: "high", 
    completed: false 
  },
  { 
    id: 2, 
    description: "Prepare for Blue Harbor quarterly review", 
    lpName: "Blue Harbor Capital",
    dueDate: "Tomorrow", 
    type: "meeting-prep",
    priority: "medium", 
    completed: false 
  },
  { 
    id: 3, 
    description: "Schedule site visit with Alex Thompson", 
    lpName: "Greentree Investments",
    dueDate: "Apr 12", 
    type: "outreach",
    priority: "medium", 
    completed: false 
  },
  { 
    id: 4, 
    description: "Send Denver expansion details to Elizabeth", 
    lpName: "Lakefront Partners",
    dueDate: "Apr 10", 
    type: "follow-up",
    priority: "high", 
    completed: true 
  },
];

// Sample data for communications
const communications = [
  { 
    id: 1, 
    subject: "Riverfront Commons Discussion", 
    lpName: "Midwest Opportunity Fund",
    content: "Met with John and team to discuss additional investment in Riverfront Commons project. They expressed interest in increasing allocation to $2.5M based on current progress.",
    direction: "outgoing",
    date: "Apr 5", 
    type: "meeting",
    sentiment: "positive",
    participants: ["John Smith", "Sarah Johnson"] 
  },
  { 
    id: 2, 
    subject: "Follow-up: Financial Projections", 
    lpName: "Midwest Opportunity Fund",
    content: "Sent updated financial projections as discussed during our meeting on April 5. Highlighted the improved IRR estimates based on recent cost savings.",
    direction: "outgoing",
    date: "Apr 6", 
    type: "email",
    sentiment: "neutral",
    participants: ["John Smith"] 
  },
  { 
    id: 3, 
    subject: "Denver Highlands Timeline Questions", 
    lpName: "Blue Harbor Capital",
    content: "Michael called with questions about the revised timeline for Denver Highlands Phase 2. Explained our approach and recent contractor negotiations. He seemed satisfied with the explanation.",
    direction: "incoming",
    date: "Mar 28", 
    type: "call",
    sentiment: "positive",
    participants: ["Michael Chen"] 
  },
];

// Get contact type icon
const getContactTypeIcon = (type: string) => {
  switch(type) {
    case 'meeting': return <Users className="h-5 w-5 text-[#275E91]" />;
    case 'call': return <Phone className="h-5 w-5 text-[#275E91]" />;
    case 'site-visit': return <Building className="h-5 w-5 text-[#275E91]" />;
    default: return <Users className="h-5 w-5 text-[#275E91]" />;
  }
};

// Get color by contact type
const getTypeColor = (type: string) => {
  switch(type) {
    case 'meeting': return 'bg-[#E7EDF3] text-[#275E91]';
    case 'call': return 'bg-[#E7F3ED] text-[#27915E]';
    case 'site-visit': return 'bg-[#F3EFE7] text-[#91652C]';
    default: return 'bg-[#E7EDF3] text-[#275E91]';
  }
};

// Get action item type icon
const getActionTypeIcon = (type: string) => {
  switch(type) {
    case 'follow-up': return <ArrowRight className="h-4 w-4" />;
    case 'outreach': return <Calendar className="h-4 w-4" />;
    case 'meeting-prep': return <Clock className="h-4 w-4" />;
    case 'review': return <FileText className="h-4 w-4" />;
    default: return <ArrowRight className="h-4 w-4" />;
  }
};

// Get action item type color
const getActionTypeColor = (type: string) => {
  switch(type) {
    case 'follow-up': return 'bg-[#E7EDF3] text-[#275E91]';
    case 'outreach': return 'bg-[#EBE7F3] text-[#5E2791]';
    case 'meeting-prep': return 'bg-[#F3EFE7] text-[#91652C]';
    case 'review': return 'bg-[#E7F3ED] text-[#27915E]';
    default: return 'bg-[#E7EDF3] text-[#275E91]';
  }
};

// Get priority color
const getPriorityColor = (priority: string) => {
  switch(priority) {
    case 'high': return 'bg-[#F3E7E7] text-[#91272C]';
    case 'medium': return 'bg-[#F3EFE7] text-[#91652C]';
    case 'low': return 'bg-[#E7F3ED] text-[#27915E]';
    default: return 'bg-[#F3EFE7] text-[#91652C]';
  }
};

// Get communication icon
const getCommunicationIcon = (type: string) => {
  switch(type) {
    case 'email': return <Mail className="h-5 w-5" />;
    case 'call': return <Phone className="h-5 w-5" />;
    case 'meeting': return <Users className="h-5 w-5" />;
    default: return <FileText className="h-5 w-5" />;
  }
};

// Get sentiment color
const getSentimentColor = (sentiment: string) => {
  switch(sentiment) {
    case 'very-positive': return 'bg-[#E7F3ED] text-[#27915E]';
    case 'positive': return 'bg-[#EAF3E7] text-[#5A9127]';
    case 'neutral': return 'bg-[#F0F0F0] text-[#6B7280]';
    case 'negative': return 'bg-[#F3E7E7] text-[#91272C]';
    default: return 'bg-[#F0F0F0] text-[#6B7280]';
  }
};

// Simple component for contacts
const SimpleContactCard = ({ contact }: { contact: any }) => (
  <div className="p-4 border border-gray-200 rounded-lg mb-3 hover:border-[#275E91] hover:shadow-sm transition-all duration-200 cursor-pointer bg-white">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-[#F8F5F0] rounded-md flex-shrink-0">
        {getContactTypeIcon(contact.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-1 gap-2">
          <Badge className={cn("text-xs font-medium", getTypeColor(contact.type))}>
            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
          </Badge>
          
          <Badge variant="outline" className="text-xs border-amber-300 text-amber-600">
            {contact.date}
          </Badge>
        </div>
        
        <h4 className="font-medium text-gray-900 mb-1">{contact.purpose}</h4>
        <p className="text-sm text-gray-500 mb-2">{contact.name}</p>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1.5" />
            {contact.time} ({contact.duration} min)
          </div>
          
          {contact.location && (
            <div className="flex items-center text-xs text-gray-600">
              <MapPin className="h-3 w-3 mr-1.5" />
              {contact.location}
            </div>
          )}
          
          <div className="flex items-center text-xs text-gray-600 col-span-2">
            <Users className="h-3 w-3 mr-1.5" />
            {contact.participants.length > 2 
              ? `${contact.participants[0]}, ${contact.participants[1]}, +${contact.participants.length - 2}` 
              : contact.participants.join(', ')}
          </div>
        </div>
      </div>
      
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  </div>
);

// Simple component for action items
const SimpleActionItem = ({ item }: { item: any }) => (
  <div className={`p-4 border rounded-lg mb-3 ${item.completed ? 'bg-gray-50' : 'bg-white'} hover:border-[#275E91] transition-all`}>
    <div className="flex items-start gap-3">
      <div className="p-2 bg-[#F8F5F0] rounded-md flex-shrink-0">
        {getActionTypeIcon(item.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-1 gap-2 flex-wrap">
          <Badge className={getActionTypeColor(item.type)} variant="secondary">
            {item.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Badge>
          
          <Badge className={getPriorityColor(item.priority)} variant="secondary">
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
          </Badge>
          
          <span className="text-xs text-amber-600 ml-auto font-medium">
            {item.dueDate}
          </span>
        </div>
        
        <h4 className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'} mb-1`}>
          {item.description}
        </h4>
        
        <p className="text-sm text-gray-500">
          {item.lpName}
        </p>
      </div>
    </div>
  </div>
);

// Simple component for communications
const SimpleCommunicationItem = ({ communication }: { communication: any }) => (
  <div className="p-4 border rounded-lg mb-3 hover:border-[#275E91] hover:shadow-sm transition-all duration-200 cursor-pointer bg-white">
    <div className="flex items-start gap-3">
      <div className={cn(
        "p-2 rounded-full", 
        communication.direction === 'incoming' ? 'bg-[#E7EDF3]' : 'bg-[#F8F5F0]'
      )}>
        {getCommunicationIcon(communication.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-1 gap-2">
          <Badge className={cn(
            "text-xs font-medium", 
            getTypeColor(communication.type)
          )}>
            {communication.type.charAt(0).toUpperCase() + communication.type.slice(1)}
          </Badge>
          
          <Badge className={cn(
            "text-xs font-medium", 
            getSentimentColor(communication.sentiment)
          )}>
            {communication.sentiment.charAt(0).toUpperCase() + communication.sentiment.slice(1)}
          </Badge>
          
          <span className="text-xs text-gray-500 ml-auto">
            {communication.date}
          </span>
        </div>
        
        <h4 className="font-medium text-gray-900 mb-1">{communication.subject}</h4>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{communication.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-600">
            <Users className="h-3 w-3 mr-1" />
            {communication.participants.join(', ')}
          </div>
          
          <Badge variant="outline" className="text-xs border-[#275E91] text-[#275E91]">
            {communication.lpName}
          </Badge>
        </div>
      </div>
    </div>
  </div>
);

// Simple health score card
const SimpleHealthScore = () => (
  <Card className="shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-gray-900">Portfolio Relationship Health</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">75</h3>
            <p className="text-sm text-gray-500">Overall Health Score</p>
          </div>
          <div className="text-right text-green-600">
            <span className="text-lg font-semibold">Good</span>
            <p className="text-sm">Relationship Status</p>
          </div>
        </div>
        
        <div className="mt-4">
          <Progress value={75} max={100} className="h-2.5 bg-gray-100" indicatorClassName="bg-green-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-md bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-800">Recency</h4>
            </div>
          </div>
          
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-blue-600">85</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
          
          <Progress value={85} max={100} className="h-2 bg-gray-100" indicatorClassName="bg-blue-600" />
        </div>
        
        <div className="p-4 border rounded-md bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-full">
                <BarChart2 className="h-4 w-4 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-800">Frequency</h4>
            </div>
          </div>
          
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-purple-600">65</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
          
          <Progress value={65} max={100} className="h-2 bg-gray-100" indicatorClassName="bg-purple-600" />
        </div>
        
        <div className="p-4 border rounded-md bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-full">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
              <h4 className="font-medium text-gray-800">Sentiment</h4>
            </div>
          </div>
          
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-red-600">80</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
          
          <Progress value={80} max={100} className="h-2 bg-gray-100" indicatorClassName="bg-red-600" />
        </div>
        
        <div className="p-4 border rounded-md bg-white">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-full">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800">Engagement</h4>
            </div>
          </div>
          
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-green-600">70</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
          
          <Progress value={70} max={100} className="h-2 bg-gray-100" indicatorClassName="bg-green-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Simple engagement metrics chart placeholder
const SimpleEngagementMetrics = () => (
  <Card className="shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-gray-900">Investor Engagement Analytics</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Metrics Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Total Communications</p>
          <h3 className="text-2xl font-bold text-gray-900">42</h3>
        </div>
        
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Incoming Ratio</p>
          <h3 className="text-2xl font-bold text-gray-900">45%</h3>
        </div>
        
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Follow-up Rate</p>
          <h3 className="text-2xl font-bold text-gray-900">68%</h3>
        </div>
        
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Positive Sentiment</p>
          <h3 className="text-2xl font-bold text-gray-900">75%</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Communication by Type Chart Placeholder */}
        <div className="border rounded-lg p-4 bg-white h-60">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Communication by Type</h3>
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">Chart visualization will appear here</p>
            </div>
          </div>
        </div>
        
        {/* Communication by Sentiment Chart Placeholder */}
        <div className="border rounded-lg p-4 bg-white h-60">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Communication by Sentiment</h3>
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">Chart visualization will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SimpleRelationshipsDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  
  return (
    <div className="space-y-6">
      {/* Filter and Controls Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Investor Relationships Dashboard
        </h3>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-1.5" />
            Filters
          </Button>
          
          <Button variant="outline" size="sm" className="h-10">
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* View Selection */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-auto">
        <TabsList className="grid w-auto grid-cols-3">
          <TabsTrigger value="overview" className="px-3 py-1.5">Overview</TabsTrigger>
          <TabsTrigger value="communications" className="px-3 py-1.5">Communications</TabsTrigger>
          <TabsTrigger value="analytics" className="px-3 py-1.5">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Overview tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming contacts */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[320px]">
                  <div className="pr-4">
                    {upcomingContacts.map(contact => (
                      <SimpleContactCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 flex justify-end">
                  <Button className="bg-[#275E91] hover:bg-[#1E4A73] text-white">
                    <PlusCircle className="h-4 w-4 mr-1.5" />
                    Schedule Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Relationship health */}
            <SimpleHealthScore />
          </div>
          
          {/* Action items */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-900">Relationship Action Items</CardTitle>
                <p className="text-sm text-gray-500">3 pending, 1 completed</p>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[320px]">
                <div className="pr-4">
                  {actionItems.map(item => (
                    <SimpleActionItem key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 flex justify-end">
                <Button className="bg-[#275E91] hover:bg-[#1E4A73] text-white">
                  <PlusCircle className="h-4 w-4 mr-1.5" />
                  Add Action
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Communications tab */}
        <TabsContent value="communications" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-900">Investor Communications Log</CardTitle>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
                    Filters
                  </Button>
                  
                  <Button 
                    className="h-8 bg-[#275E91] hover:bg-[#1E4A73] text-white"
                    size="sm"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                    New Communication
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="text-xs">All Communications</Button>
                <Button variant="outline" size="sm" className="text-xs">Follow-ups</Button>
                <Button variant="outline" size="sm" className="text-xs">Incoming</Button>
                <Button variant="outline" size="sm" className="text-xs">Outgoing</Button>
              </div>
                
              <ScrollArea className="h-[500px]">
                <div className="pr-4">
                  {communications.map(communication => (
                    <SimpleCommunicationItem key={communication.id} communication={communication} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics tab */}
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <SimpleEngagementMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimpleRelationshipsDashboard;