import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, ArrowRight, ChevronRight } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { ScheduledContact, getUpcomingContacts } from '@/data/communicationLogs';

const timeRanges = [
  { value: '7', label: 'Next 7 days' },
  { value: '14', label: 'Next 14 days' },
  { value: '30', label: 'Next 30 days' },
  { value: '90', label: 'Next 90 days' },
];

interface ContactItemProps {
  contact: ScheduledContact;
  onViewDetails: (contact: ScheduledContact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onViewDetails }) => {
  const contactDate = new Date(contact.date);
  const formattedDate = formatDate(contactDate);
  
  // Color coding by contact type
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'site-visit': return 'bg-amber-100 text-amber-800';
      case 'conference': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const isToday = () => {
    const today = new Date();
    return contactDate.getDate() === today.getDate() &&
           contactDate.getMonth() === today.getMonth() &&
           contactDate.getFullYear() === today.getFullYear();
  };
  
  const isThisWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return contactDate >= startOfWeek && contactDate <= endOfWeek;
  };
  
  return (
    <div 
      className="p-4 border rounded-lg mb-3 hover:border-[#275E91] hover:shadow-sm transition-all duration-200 cursor-pointer bg-white"
      onClick={() => onViewDetails(contact)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded ${getTypeColor(contact.type)} mr-2`}>
              {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
            </span>
            {isToday() && (
              <span className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-800">
                Today
              </span>
            )}
            {!isToday() && isThisWeek() && (
              <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-800">
                This Week
              </span>
            )}
          </div>
          
          <h4 className="font-medium text-gray-900 mb-1">{contact.purpose}</h4>
          <p className="text-sm text-gray-500 mb-3">{contact.lpName}</p>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1.5" />
              {formattedDate}
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="h-3 w-3 mr-1.5" />
              {contact.time} ({contact.duration} min)
            </div>
            
            {contact.location && (
              <div className="flex items-center text-xs text-gray-600 col-span-2">
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
};

interface ContactScheduleCardProps {
  title?: string;
  compact?: boolean;
}

const ContactScheduleCard: React.FC<ContactScheduleCardProps> = ({ 
  title = "Contact Schedule", 
  compact = false 
}) => {
  const [timeRange, setTimeRange] = useState('14');
  const [activeView, setActiveView] = useState('all');
  
  const contacts = useMemo(() => {
    return getUpcomingContacts(parseInt(timeRange));
  }, [timeRange]);
  
  const filteredContacts = useMemo(() => {
    if (activeView === 'all') return contacts;
    return contacts.filter(contact => contact.type === activeView);
  }, [contacts, activeView]);
  
  const handleViewDetails = (contact: ScheduledContact) => {
    console.log('View details for contact:', contact);
    // Implementation would typically open a dialog or navigate to details page
  };
  
  // Group contacts by date for the calendar view
  const groupedByDate = useMemo(() => {
    const groups: Record<string, ScheduledContact[]> = {};
    
    filteredContacts.forEach(contact => {
      if (!groups[contact.date]) {
        groups[contact.date] = [];
      }
      groups[contact.date].push(contact);
    });
    
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());
  }, [filteredContacts]);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value} className="text-xs">
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="w-full mb-4 bg-gray-100">
            <TabsTrigger value="all" className="text-xs flex-1">All</TabsTrigger>
            <TabsTrigger value="call" className="text-xs flex-1">Calls</TabsTrigger>
            <TabsTrigger value="meeting" className="text-xs flex-1">Meetings</TabsTrigger>
            <TabsTrigger value="site-visit" className="text-xs flex-1">Site Visits</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeView} className="mt-0">
            {filteredContacts.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">No scheduled contacts found</p>
              </div>
            ) : (
              <>
                <ScrollArea className={compact ? "h-[320px]" : "h-[420px]"}>
                  <div className="pr-4">
                    {compact ? (
                      // List view for compact mode
                      filteredContacts.map(contact => (
                        <ContactItem 
                          key={contact.id} 
                          contact={contact} 
                          onViewDetails={handleViewDetails} 
                        />
                      ))
                    ) : (
                      // Calendar view grouped by date
                      groupedByDate.map(([date, dateContacts]) => (
                        <div key={date} className="mb-5">
                          <h3 className="text-sm font-medium mb-2 text-gray-700 bg-gray-50 p-2 rounded">
                            {formatDate(new Date(date))}
                          </h3>
                          <div className="space-y-3">
                            {dateContacts.map(contact => (
                              <ContactItem 
                                key={contact.id} 
                                contact={contact} 
                                onViewDetails={handleViewDetails} 
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="text-[#275E91] border-[#275E91]">
                    Schedule New Contact
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContactScheduleCard;