import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Filter, 
  Search, 
  Mail, 
  Phone, 
  Users, 
  Briefcase, 
  FileText, 
  PlusCircle, 
  Calendar, 
  X, 
  Download,
  ExternalLink
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CommunicationLog, CommunicationSentiment, communicationLogs } from '@/data/communicationLogs';
import { lps } from '@/data/lps';
import { cn, formatDate } from '@/lib/utils';

// Type filter options
const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'email', label: 'Email' },
  { value: 'call', label: 'Call' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'note', label: 'Note' },
  { value: 'site-visit', label: 'Site Visit' },
];

// Sentiment filter options
const sentimentOptions = [
  { value: 'all', label: 'All Sentiments' },
  { value: 'very-positive', label: 'Very Positive' },
  { value: 'positive', label: 'Positive' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negative' },
];

// Direction filter options
const directionOptions = [
  { value: 'all', label: 'All Directions' },
  { value: 'incoming', label: 'Incoming' },
  { value: 'outgoing', label: 'Outgoing' },
];

// Helper function to get icon by communication type
const getCommunicationIcon = (type: string) => {
  switch(type) {
    case 'email': return <Mail className="h-5 w-5" />;
    case 'call': return <Phone className="h-5 w-5" />;
    case 'meeting': return <Users className="h-5 w-5" />;
    case 'note': return <FileText className="h-5 w-5" />;
    case 'site-visit': return <Briefcase className="h-5 w-5" />;
    default: return <Mail className="h-5 w-5" />;
  }
};

// Helper function to get color by communication sentiment
const getSentimentColor = (sentiment: CommunicationSentiment) => {
  switch(sentiment) {
    case 'very-positive': return 'bg-green-500 text-white';
    case 'positive': return 'bg-green-300 text-green-800';
    case 'neutral': return 'bg-gray-200 text-gray-700';
    case 'negative': return 'bg-red-300 text-red-800';
    default: return 'bg-gray-200 text-gray-700';
  }
};

// Helper function to get color by communication type
const getTypeColor = (type: string) => {
  switch(type) {
    case 'email': return 'bg-blue-100 text-blue-700';
    case 'call': return 'bg-green-100 text-green-700';
    case 'meeting': return 'bg-purple-100 text-purple-700';
    case 'note': return 'bg-gray-100 text-gray-700';
    case 'site-visit': return 'bg-amber-100 text-amber-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

interface CommunicationItemProps {
  communication: CommunicationLog;
  onClick: (communication: CommunicationLog) => void;
}

const CommunicationItem: React.FC<CommunicationItemProps> = ({ communication, onClick }) => {
  const commDate = new Date(communication.date);
  const formattedDate = formatDate(commDate);
  
  // Get LP name
  const lpName = useMemo(() => {
    const lp = lps.find(l => l.id === communication.lpId);
    return lp ? lp.name : 'Unknown LP';
  }, [communication.lpId]);
  
  return (
    <div 
      className="p-4 border rounded-lg mb-3 hover:border-[#275E91] hover:shadow-sm transition-all duration-200 cursor-pointer bg-white"
      onClick={() => onClick(communication)}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-full flex-shrink-0", 
          communication.direction === 'incoming' ? 'bg-blue-50' : 'bg-gray-50'
        )}>
          {getCommunicationIcon(communication.type)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-1 gap-2">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded", 
              getTypeColor(communication.type)
            )}>
              {communication.type.charAt(0).toUpperCase() + communication.type.slice(1)}
            </span>
            
            <Badge className={cn(
              "text-xs font-medium", 
              getSentimentColor(communication.sentiment)
            )}>
              {communication.sentiment.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Badge>
            
            <span className="text-xs text-gray-500 ml-auto">
              {formattedDate}
            </span>
          </div>
          
          <h4 className="font-medium text-gray-900 mb-1">{communication.subject}</h4>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{communication.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-600">
              <Users className="h-3 w-3 mr-1" />
              {communication.participants.length > 2 
                ? `${communication.participants[0]}, ${communication.participants[1]}, +${communication.participants.length - 2}` 
                : communication.participants.join(', ')}
            </div>
            
            {communication.followUpAction && (
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-600 gap-1">
                <Calendar className="h-3 w-3" />
                Follow-up: {formatDate(new Date(communication.followUpDate || ''))}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommunicationDetailProps {
  communication: CommunicationLog;
  onClose: () => void;
}

const CommunicationDetail: React.FC<CommunicationDetailProps> = ({ 
  communication, 
  onClose 
}) => {
  // Get LP name
  const lpName = useMemo(() => {
    const lp = lps.find(l => l.id === communication.lpId);
    return lp ? lp.name : 'Unknown LP';
  }, [communication.lpId]);
  
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-full", 
            communication.direction === 'incoming' ? 'bg-blue-50' : 'bg-gray-50'
          )}>
            {getCommunicationIcon(communication.type)}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{communication.subject}</h3>
            <p className="text-sm text-gray-500">
              {communication.direction === 'incoming' ? 'From' : 'To'}: {lpName} • {formatDate(new Date(communication.date))}
            </p>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
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
          {communication.sentiment.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </Badge>
        
        <Badge variant="outline" className="text-xs">
          {communication.direction.charAt(0).toUpperCase() + communication.direction.slice(1)}
        </Badge>
        
        {communication.tags && communication.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="mt-5 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-800 whitespace-pre-line">{communication.content}</p>
      </div>
      
      {communication.participants.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Participants</h4>
          <div className="flex flex-wrap gap-2">
            {communication.participants.map((participant, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {participant}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {communication.followUpAction && (
        <div className="mt-4 p-3 border border-orange-200 bg-orange-50 rounded-lg">
          <h4 className="text-sm font-medium text-orange-700 mb-1 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Follow-up Required
          </h4>
          <p className="text-sm text-orange-600">
            By {formatDate(new Date(communication.followUpDate || ''))}:
          </p>
          <p className="text-sm text-gray-700 mt-1">{communication.followUpAction}</p>
        </div>
      )}
      
      {communication.attachments && communication.attachments.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
          <div className="space-y-2">
            {communication.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                <span className="text-sm text-gray-700">{attachment.name}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" size="sm">
          Add Note
        </Button>
        <Button variant="outline" size="sm">
          Create Follow-up
        </Button>
        <Button className="bg-[#275E91] hover:bg-[#1E4A73] text-white" size="sm">
          Reply
        </Button>
      </div>
    </div>
  );
};

interface InvestorCommunicationsLogProps {
  lpId?: string;
  title?: string;
}

const InvestorCommunicationsLog: React.FC<InvestorCommunicationsLogProps> = ({ 
  lpId,
  title = "Communications Log"
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedDirection, setSelectedDirection] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState<CommunicationLog | null>(null);
  
  // Filter communications by lpId if provided
  const filteredByLp = useMemo(() => {
    if (!lpId) return communicationLogs;
    return communicationLogs.filter(comm => comm.lpId === lpId);
  }, [lpId]);
  
  // Apply all filters
  const filteredCommunications = useMemo(() => {
    let filtered = [...filteredByLp];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        comm => 
          comm.subject.toLowerCase().includes(query) || 
          comm.content.toLowerCase().includes(query) ||
          comm.participants.some(p => p.toLowerCase().includes(query))
      );
    }
    
    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(comm => comm.type === selectedType);
    }
    
    // Apply sentiment filter
    if (selectedSentiment !== "all") {
      filtered = filtered.filter(comm => comm.sentiment === selectedSentiment);
    }
    
    // Apply direction filter
    if (selectedDirection !== "all") {
      filtered = filtered.filter(comm => comm.direction === selectedDirection);
    }
    
    // Apply timeframe filter
    const today = new Date();
    if (selectedTimeframe !== "all") {
      let startDate = new Date();
      
      switch(selectedTimeframe) {
        case "30days":
          startDate.setDate(today.getDate() - 30);
          break;
        case "90days":
          startDate.setDate(today.getDate() - 90);
          break;
        case "year":
          startDate.setFullYear(today.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(comm => {
        const commDate = new Date(comm.date);
        return commDate >= startDate && commDate <= today;
      });
    }
    
    // Sort by date, newest first
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [
    filteredByLp, 
    searchQuery, 
    selectedType, 
    selectedSentiment, 
    selectedDirection, 
    selectedTimeframe
  ]);
  
  const handleCommunicationClick = (communication: CommunicationLog) => {
    setSelectedCommunication(communication);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => setShowFilters(!showFilters)}
            >
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
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search communications..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Communication Type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                {sentimentOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDirection} onValueChange={setSelectedDirection}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                {directionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full mb-4 bg-gray-100">
            <TabsTrigger value="all" className="text-xs flex-1">All Communications</TabsTrigger>
            <TabsTrigger value="follow-ups" className="text-xs flex-1">Follow-ups</TabsTrigger>
            <TabsTrigger value="incoming" className="text-xs flex-1">Incoming</TabsTrigger>
            <TabsTrigger value="outgoing" className="text-xs flex-1">Outgoing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredCommunications.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">No communications found</p>
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <div className="pr-4">
                  {filteredCommunications.map(comm => (
                    <CommunicationItem
                      key={comm.id}
                      communication={comm}
                      onClick={handleCommunicationClick}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
          
          <TabsContent value="follow-ups" className="mt-0">
            <ScrollArea className="h-[500px]">
              <div className="pr-4">
                {filteredCommunications
                  .filter(comm => comm.followUpAction)
                  .map(comm => (
                    <CommunicationItem
                      key={comm.id}
                      communication={comm}
                      onClick={handleCommunicationClick}
                    />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="incoming" className="mt-0">
            <ScrollArea className="h-[500px]">
              <div className="pr-4">
                {filteredCommunications
                  .filter(comm => comm.direction === 'incoming')
                  .map(comm => (
                    <CommunicationItem
                      key={comm.id}
                      communication={comm}
                      onClick={handleCommunicationClick}
                    />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="outgoing" className="mt-0">
            <ScrollArea className="h-[500px]">
              <div className="pr-4">
                {filteredCommunications
                  .filter(comm => comm.direction === 'outgoing')
                  .map(comm => (
                    <CommunicationItem
                      key={comm.id}
                      communication={comm}
                      onClick={handleCommunicationClick}
                    />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        {/* Communication Detail Dialog */}
        <Dialog 
          open={selectedCommunication !== null} 
          onOpenChange={(open) => {
            if (!open) setSelectedCommunication(null);
          }}
        >
          <DialogContent className="sm:max-w-[650px]">
            {selectedCommunication && (
              <CommunicationDetail 
                communication={selectedCommunication} 
                onClose={() => setSelectedCommunication(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default InvestorCommunicationsLog;