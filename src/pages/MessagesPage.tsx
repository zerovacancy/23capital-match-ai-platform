import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { MessageSquare, Search, PlusCircle, Paperclip, Send, User, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const MessagesPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-hidden flex">
        {/* Messages list sidebar */}
        <div className="w-80 border-r bg-muted/10 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Messages</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search messages..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {Array.from({length: 8}).map((_, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg hover:bg-muted cursor-pointer ${index === 0 ? 'bg-muted' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://avatar.vercel.sh/${index + 1}.png`} alt="User" />
                      <AvatarFallback>{['SC', 'JD', 'AR', 'TM', 'KL', 'NP', 'RS', 'BT'][index]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">
                          {['Sequoia Capital', 'John Davis', 'Alex Rodriguez', 'Tom Miller', 'Kate Lewis', 'Nathan Porter', 'Rachel Smith', 'Ben Thompson'][index]}
                        </h4>
                        <span className="text-xs text-muted-foreground">12m</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                          Latest message about the property acquisition in Lincoln Park...
                        </p>
                        
                        {index < 3 && (
                          <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                            {index + 1}
                          </Badge>
                        )}
                        
                        {index === 3 && (
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Main conversation area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://avatar.vercel.sh/1.png" alt="Sequoia Capital" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium">Sequoia Capital</h3>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[75%]">
                  <p className="text-sm">Hi there! We're interested in the Lincoln Park property you mentioned. Could you share more details about the opportunity?</p>
                  <span className="text-xs text-muted-foreground block mt-1">10:32 AM</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[75%]">
                  <p className="text-sm">Of course! The Lincoln Park mixed-use property has 3 retail spaces on the ground floor and 8 residential units above. It's currently 85% occupied with a cap rate of 5.2%.</p>
                  <span className="text-xs text-primary-foreground/70 block mt-1">10:45 AM</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[75%]">
                  <p className="text-sm">I've attached the financial summary and property report. Let me know if you'd like to schedule a tour or have any other questions.</p>
                  <div className="mt-2 p-2 rounded bg-primary-foreground/10 text-xs flex items-center gap-2">
                    <Paperclip className="h-3 w-3" />
                    <span>Lincoln_Park_Property_Report.pdf (2.4 MB)</span>
                  </div>
                  <span className="text-xs text-primary-foreground/70 block mt-1">10:47 AM</span>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[75%]">
                  <p className="text-sm">Thanks for the quick response! The property looks promising. Our acquisition team would like to schedule a tour this Thursday afternoon if possible.</p>
                  <span className="text-xs text-muted-foreground block mt-1">11:02 AM</span>
                </div>
              </div>
              
              <div className="flex justify-center my-6">
                <Separator className="w-full max-w-xs" />
              </div>
              
              <div className="flex justify-center">
                <Badge variant="outline" className="text-xs bg-muted/50">Today</Badge>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[75%]">
                  <p className="text-sm">Following up on our property tour - our team was impressed with the location and condition of the building. We'd like to discuss potential terms. Are you available for a call tomorrow?</p>
                  <span className="text-xs text-muted-foreground block mt-1">12:15 PM</span>
                </div>
              </div>
            </div>
            
            {/* Extra space at the bottom of the scroll area */}
            <div className="h-4"></div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="relative">
              <Input 
                placeholder="Type a message..." 
                className="pr-24"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button size="sm" className="rounded-full h-8 w-8 p-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;