import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { HelpCircle, MessageCircle, FileText, Book, Search, ExternalLink, Video, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h1>
            <p className="text-gray-500">
              Get help with using Capital Match and find answers to common questions
            </p>
          </div>
          
          <div className="mb-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for help topics..." 
                className="pl-10 h-12"
              />
            </div>
          </div>
          
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="faq" className="flex flex-col items-center gap-1 h-auto py-2">
                <HelpCircle className="h-5 w-5" />
                <span>FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="documentation" className="flex flex-col items-center gap-1 h-auto py-2">
                <FileText className="h-5 w-5" />
                <span>Documentation</span>
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex flex-col items-center gap-1 h-auto py-2">
                <Video className="h-5 w-5" />
                <span>Tutorials</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex flex-col items-center gap-1 h-auto py-2">
                <MessageCircle className="h-5 w-5" />
                <span>Contact</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about using Capital Match</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is Capital Match?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Capital Match is a property acquisition intelligence platform that helps real estate investors identify high-opportunity properties in Cook County. It combines market data, property information, and investor preferences to create optimal matches between properties and potential investors.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do property alerts work?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Property alerts are notifications about opportunities that match your investment criteria. The system continuously monitors property data, price changes, and market trends to identify high-opportunity properties. You can customize your alert preferences in the Settings page to control which types of alerts you receive and how they're delivered.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How is the opportunity score calculated?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The opportunity score is calculated using a proprietary algorithm that considers multiple factors, including:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                          <li>Price relative to comparable properties</li>
                          <li>Neighborhood growth potential</li>
                          <li>Historical property value trends</li>
                          <li>Renovation potential and estimated ROI</li>
                          <li>Current and projected rental income</li>
                          <li>Local market conditions and liquidity</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          Scores range from 1 to 100, with higher scores indicating stronger investment opportunities.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Can I export data from Capital Match?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Yes, you can export data in several formats including CSV, PDF, and Excel. Look for the export button in different sections of the platform, such as property listings, market analysis reports, and deal summaries. For API access to data, please contact our support team to set up integration credentials.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How often is property data updated?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Property data is updated from multiple sources on different schedules:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                          <li>Cook County tax and assessment data: Updated daily</li>
                          <li>MLS listings: Updated in real-time (within minutes of changes)</li>
                          <li>Market trends and analytics: Updated weekly</li>
                          <li>Property transaction records: Updated daily</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          You can see the last update time for specific properties in their detailed view.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documentation" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      <span>User Guide</span>
                    </CardTitle>
                    <CardDescription>Learn how to use Capital Match effectively</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Getting Started with Capital Match</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Understanding Property Alerts</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Working with the Deal Pipeline</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Investor Relationship Management</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Analyzing Market Trends</a>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      <span>Browse All Documentation</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>API Documentation</span>
                    </CardTitle>
                    <CardDescription>Integrate with Capital Match API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">API Overview and Authentication</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Property Data Endpoints</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Market Analytics API</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Investor Matching Endpoints</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">Webhooks and Notifications</a>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      <span>View API Reference</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md cursor-pointer transition-shadow">
                    <div className="h-40 bg-muted flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base mb-1">
                        {[
                          'Getting Started with Capital Match',
                          'Setting Up Your Alert Preferences',
                          'Finding High-Value Properties',
                          'Managing Investor Relationships',
                          'Analyzing Market Trends',
                          'Creating and Managing Deals'
                        ][index]}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {[
                          'Learn the basics of navigating and using Capital Match',
                          'Customize your alerts to match your investment criteria',
                          'Use filters and analytics to find the best opportunities',
                          'Track and manage your investor contacts effectively',
                          'Understand market data visualization and analytics',
                          'Create, track, and close deals efficiently'
                        ][index]}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>Duration:</span>
                        <span>{[5, 8, 12, 10, 15, 9][index]} minutes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="gap-2">
                  <span>View All Tutorials</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>Contact Support</span>
                    </CardTitle>
                    <CardDescription>Get help from our support team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="subject">Subject</label>
                        <Input id="subject" placeholder="What do you need help with?" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="message">Message</label>
                        <textarea 
                          id="message" 
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]" 
                          placeholder="Describe your issue or question in detail..."
                        />
                      </div>
                      
                      <Button className="w-full">Submit Support Request</Button>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        Our support team typically responds within 24 hours
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact Options</CardTitle>
                    <CardDescription>Other ways to get support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Email Support</h4>
                            <p className="text-sm text-muted-foreground">support@capitalmatch.com</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          For general inquiries and non-urgent support
                        </p>
                      </div>
                      
                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Live Chat</h4>
                            <p className="text-sm text-muted-foreground">Available weekdays 9AM-5PM CT</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">Start Chat</Button>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">Emergency Support</h4>
                        <p className="text-sm text-muted-foreground">
                          For urgent issues affecting your ability to use Capital Match, please call our emergency support line:
                        </p>
                        <p className="font-medium text-center my-3">(555) 123-4567</p>
                        <p className="text-xs text-muted-foreground text-center">
                          Available 24/7 for critical issues only
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;