import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, AlertCircle, Clock, Calendar, ArrowUpRight, CheckCheck, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommunicationLog, communicationLogs, ScheduledContact, scheduledContacts } from '@/data/communicationLogs';
import { lps } from '@/data/lps';
import { formatDate } from '@/lib/utils';

// Action item types
interface ActionItem {
  id: string;
  lpId: string;
  lpName: string;
  type: 'follow-up' | 'outreach' | 'meeting-prep' | 'review';
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  relatedCommId?: string;
  relatedContactId?: string;
}

// Generate action items from communication logs and scheduled contacts
const generateActionItems = (lpId?: string): ActionItem[] => {
  const actionItems: ActionItem[] = [];
  
  // Filter by LP ID if provided
  const filteredLogs = lpId 
    ? communicationLogs.filter(log => log.lpId === lpId)
    : communicationLogs;
  
  const filteredContacts = lpId
    ? scheduledContacts.filter(contact => contact.lpId === lpId && contact.status === 'scheduled')
    : scheduledContacts.filter(contact => contact.status === 'scheduled');
  
  // Add follow-up action items from communication logs
  filteredLogs.forEach(log => {
    if (log.followUpAction && log.followUpDate) {
      // Find LP name
      const lp = lps.find(l => l.id === log.lpId);
      const lpName = lp ? lp.name : 'Unknown LP';
      
      actionItems.push({
        id: `action-${log.id}`,
        lpId: log.lpId,
        lpName,
        type: 'follow-up',
        description: log.followUpAction,
        dueDate: log.followUpDate,
        // Set priority based on due date proximity
        priority: isHighPriority(log.followUpDate) ? 'high' : 'medium',
        completed: false,
        relatedCommId: log.id
      });
    }
  });
  
  // Add meeting preparation action items from scheduled contacts
  filteredContacts.forEach(contact => {
    // Find LP name
    const lp = lps.find(l => l.id === contact.lpId);
    const lpName = lp ? lp.name : 'Unknown LP';
    
    // Add preparation action item 2 days before the meeting
    const contactDate = new Date(contact.date);
    const prepDate = new Date(contactDate);
    prepDate.setDate(contactDate.getDate() - 2);
    
    // Only add if prep date is in the future
    if (prepDate > new Date()) {
      actionItems.push({
        id: `prep-${contact.id}`,
        lpId: contact.lpId,
        lpName,
        type: 'meeting-prep',
        description: `Prepare for ${contact.type}: ${contact.purpose}`,
        dueDate: prepDate.toISOString().split('T')[0],
        priority: isHighPriority(prepDate.toISOString().split('T')[0]) ? 'high' : 'medium',
        completed: false,
        relatedContactId: contact.id
      });
    }
  });
  
  // Add outreach action items for LPs with no recent communication
  lps.forEach(lp => {
    if (lpId && lp.id !== lpId) return;
    
    const lastComm = communicationLogs
      .filter(log => log.lpId === lp.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    // If last communication was more than 30 days ago, suggest an outreach
    if (lastComm) {
      const lastCommDate = new Date(lastComm.date);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastCommDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 30) {
        actionItems.push({
          id: `outreach-${lp.id}`,
          lpId: lp.id,
          lpName: lp.name,
          type: 'outreach',
          description: `Reconnect with ${lp.name} (${daysDiff} days since last contact)`,
          dueDate: new Date().toISOString().split('T')[0],
          priority: daysDiff > 60 ? 'high' : 'medium',
          completed: false
        });
      }
    } else {
      // No communication record at all
      actionItems.push({
        id: `outreach-new-${lp.id}`,
        lpId: lp.id,
        lpName: lp.name,
        type: 'outreach',
        description: `Initiate contact with ${lp.name} (no prior communication)`,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'high',
        completed: false
      });
    }
  });
  
  // Add quarterly review action items
  lps.forEach(lp => {
    if (lpId && lp.id !== lpId) return;
    
    // Find any scheduled quarterly reviews
    const hasQuarterlyReview = scheduledContacts.some(contact => 
      contact.lpId === lp.id && 
      contact.purpose.toLowerCase().includes('quarterly') &&
      contact.status === 'scheduled' &&
      new Date(contact.date) > new Date()
    );
    
    // If no quarterly review is scheduled, suggest one
    if (!hasQuarterlyReview) {
      actionItems.push({
        id: `review-${lp.id}`,
        lpId: lp.id,
        lpName: lp.name,
        type: 'review',
        description: `Schedule quarterly portfolio review with ${lp.name}`,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        completed: false
      });
    }
  });
  
  // Sort by priority and due date
  return actionItems.sort((a, b) => {
    // Sort by completed first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
};

// Check if date is high priority (due today or overdue)
const isHighPriority = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
};

// Format the relative time for due dates
const getRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
  if (date.getTime() === yesterday.getTime()) return 'Yesterday';
  
  const daysDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 0) {
    return `${Math.abs(daysDiff)} day${Math.abs(daysDiff) !== 1 ? 's' : ''} overdue`;
  }
  
  if (daysDiff < 30) {
    return `In ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
  }
  
  return formatDate(date);
};

// Get action item type icon
const getActionTypeIcon = (type: string) => {
  switch(type) {
    case 'follow-up': return <ArrowUpRight className="h-4 w-4" />;
    case 'outreach': return <Calendar className="h-4 w-4" />;
    case 'meeting-prep': return <Clock className="h-4 w-4" />;
    case 'review': return <AlertCircle className="h-4 w-4" />;
    default: return <ArrowUpRight className="h-4 w-4" />;
  }
};

// Get action item type color
const getActionTypeColor = (type: string) => {
  switch(type) {
    case 'follow-up': return 'bg-blue-100 text-blue-700';
    case 'outreach': return 'bg-purple-100 text-purple-700';
    case 'meeting-prep': return 'bg-amber-100 text-amber-700';
    case 'review': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// Get priority color
const getPriorityColor = (priority: string) => {
  switch(priority) {
    case 'high': return 'bg-red-100 text-red-700';
    case 'medium': return 'bg-amber-100 text-amber-700';
    case 'low': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// Get due date color based on urgency
const getDueDateColor = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date < today) return 'text-red-600';
  if (date.getTime() === today.getTime()) return 'text-orange-600';
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (date.getTime() === tomorrow.getTime()) return 'text-amber-600';
  
  return 'text-gray-600';
};

interface ActionItemRowProps {
  item: ActionItem;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const ActionItemRow: React.FC<ActionItemRowProps> = ({ item, onToggleComplete }) => {
  return (
    <div className={`p-4 border rounded-lg mb-3 ${item.completed ? 'bg-gray-50' : 'bg-white'} hover:border-[#275E91] transition-all`}>
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <Checkbox 
            checked={item.completed} 
            onCheckedChange={(checked) => onToggleComplete(item.id, !!checked)}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-1 gap-2 flex-wrap">
            <Badge className={getActionTypeColor(item.type)} variant="secondary">
              <span className="flex items-center gap-1">
                {getActionTypeIcon(item.type)}
                {item.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </Badge>
            
            <Badge className={getPriorityColor(item.priority)} variant="secondary">
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
            </Badge>
            
            <span className={`text-xs ${getDueDateColor(item.dueDate)} ml-auto font-medium`}>
              {getRelativeTime(item.dueDate)}
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
};

interface RelationshipActionItemsProps {
  lpId?: string;
  title?: string;
}

const RelationshipActionItems: React.FC<RelationshipActionItemsProps> = ({ 
  lpId,
  title = "Action Items"
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [actionItems, setActionItems] = useState<ActionItem[]>(() => generateActionItems(lpId));
  
  // Filter action items based on current filters
  const filteredItems = useMemo(() => {
    let filtered = [...actionItems];
    
    // Apply completion filter
    if (filter === 'pending') {
      filtered = filtered.filter(item => !item.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(item => item.completed);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }
    
    return filtered;
  }, [actionItems, filter, typeFilter]);
  
  // Toggle item completion status
  const handleToggleComplete = (id: string, completed: boolean) => {
    setActionItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed } : item
      )
    );
  };
  
  // Get counts for the header
  const counts = useMemo(() => {
    const total = actionItems.length;
    const pending = actionItems.filter(item => !item.completed).length;
    const overdue = actionItems.filter(item => 
      !item.completed && new Date(item.dueDate) < new Date()
    ).length;
    
    return { total, pending, overdue };
  }, [actionItems]);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {counts.pending} pending, {counts.overdue > 0 ? `${counts.overdue} overdue` : 'none overdue'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-[#275E91] hover:bg-[#F8F5F0] hover:text-[#275E91] h-9 px-3"
            >
              <Filter className="h-4 w-4 mr-1.5" />
              Filters
            </Button>
            
            <Button 
              className="h-9 px-3 bg-[#275E91] hover:bg-[#1E4A73] text-white"
              size="sm"
            >
              Add Action
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-[#275E91] hover:bg-[#1E4A73]' : ''}
            >
              All
            </Button>
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('pending')}
              className={filter === 'pending' ? 'bg-[#275E91] hover:bg-[#1E4A73]' : ''}
            >
              Pending
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'bg-[#275E91] hover:bg-[#1E4A73]' : ''}
            >
              <CheckCheck className="h-4 w-4 mr-1.5" />
              Completed
            </Button>
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="outreach">Outreach</SelectItem>
              <SelectItem value="meeting-prep">Meeting Prep</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center">
            <CircleCheck className="h-12 w-12 mx-auto text-green-500 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">All done!</h3>
            <p className="text-gray-500">
              {filter === 'completed' 
                ? 'No completed action items match your filters.'
                : 'You have no pending action items that match your filters.'}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="pr-4 space-y-1">
              {filteredItems.map(item => (
                <ActionItemRow 
                  key={item.id}
                  item={item}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default RelationshipActionItems;