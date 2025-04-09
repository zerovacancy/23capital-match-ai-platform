// Types for communication logs
export type CommunicationType = 'email' | 'call' | 'meeting' | 'note' | 'site-visit';
export type CommunicationDirection = 'incoming' | 'outgoing';

// Sentiment represents the tone/outcome of the communication
export type CommunicationSentiment = 'positive' | 'neutral' | 'negative' | 'very-positive';

export interface CommunicationLog {
  id: string;
  lpId: string;
  type: CommunicationType;
  direction: CommunicationDirection;
  date: string;
  subject: string;
  content: string;
  participants: string[];
  sentiment: CommunicationSentiment;
  followUpDate?: string;
  followUpAction?: string;
  tags?: string[];
  attachments?: { name: string; url: string }[];
}

// Scheduled contact/meeting data
export interface ScheduledContact {
  id: string;
  lpId: string;
  lpName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'call' | 'meeting' | 'site-visit' | 'conference';
  purpose: string;
  location?: string;
  participants: string[];
  preparationNotes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'postponed';
}

// Sample communication logs data
export const communicationLogs: CommunicationLog[] = [
  {
    id: "comm-001",
    lpId: "lp1",
    type: "meeting",
    direction: "outgoing",
    date: "2025-03-15",
    subject: "Riverfront Commons Investment Discussion",
    content: "Met with John and team to discuss additional investment in Riverfront Commons project. They expressed interest in increasing allocation to $2.5M based on current progress. Reviewed site plans and financial projections.",
    participants: ["John Smith", "Sarah Johnson"],
    sentiment: "positive",
    followUpDate: "2025-03-25",
    followUpAction: "Send updated financial projections",
    tags: ["investment", "Riverfront Commons"]
  },
  {
    id: "comm-002",
    lpId: "lp1",
    type: "email",
    direction: "outgoing",
    date: "2025-03-17",
    subject: "Follow-up: Riverfront Commons Financial Projections",
    content: "Sent updated financial projections as discussed during our meeting on March 15. Highlighted the improved IRR estimates based on recent cost savings.",
    participants: ["John Smith"],
    sentiment: "neutral",
    followUpDate: "2025-03-24",
    followUpAction: "Check if they received and reviewed the projections",
    tags: ["follow-up", "financials"]
  },
  {
    id: "comm-003",
    lpId: "lp1",
    type: "call",
    direction: "incoming",
    date: "2025-03-24",
    subject: "Questions about Riverfront Projections",
    content: "John called with questions about the labor cost assumptions in the projections. Explained our approach and recent contractor negotiations. He seemed satisfied with the explanation.",
    participants: ["John Smith"],
    sentiment: "positive",
    tags: ["clarification", "financials"]
  },
  {
    id: "comm-004",
    lpId: "lp2",
    type: "meeting",
    direction: "outgoing",
    date: "2025-03-25",
    subject: "Quarterly Portfolio Review",
    content: "Met with Blue Harbor team for quarterly review of their investments. Presented performance updates on Denver Highlands. They expressed satisfaction with current progress but had questions about timeline.",
    participants: ["Michael Chen", "Rebecca Lee"],
    sentiment: "neutral",
    followUpDate: "2025-04-10",
    followUpAction: "Share revised timeline for Denver Highlands Phase 2",
    tags: ["quarterly review", "Denver Highlands"]
  },
  {
    id: "comm-005",
    lpId: "lp3",
    type: "email",
    direction: "outgoing",
    date: "2025-02-15",
    subject: "New Opportunity: Chicago Lakeview Project",
    content: "Shared preliminary information about the Chicago Lakeview opportunity. Highlighting 8.5% projected IRR and tax benefits.",
    participants: ["Robert Williams"],
    sentiment: "neutral",
    followUpDate: "2025-02-22",
    followUpAction: "Follow up if no response",
    tags: ["new opportunity", "Chicago"]
  },
  {
    id: "comm-006",
    lpId: "lp3",
    type: "call",
    direction: "incoming",
    date: "2025-02-20",
    subject: "Questions about Chicago Lakeview",
    content: "Robert called with interest in Lakeview project but concerns about the timeline. He's looking for shorter-term investments currently.",
    participants: ["Robert Williams"],
    sentiment: "neutral",
    followUpDate: "2025-04-05",
    followUpAction: "Share info on shorter-term opportunities when available",
    tags: ["lead qualification", "Chicago"]
  },
  {
    id: "comm-007",
    lpId: "lp4",
    type: "meeting",
    direction: "outgoing",
    date: "2025-04-01",
    subject: "Quarterly Strategic Review",
    content: "Comprehensive review of all active investments with Lakefront Partners team. Discussed potential for two new opportunities in Q3. They're very satisfied with portfolio performance.",
    participants: ["Elizabeth Davis", "Thomas Moore", "Jennifer Wilson"],
    sentiment: "very-positive",
    followUpDate: "2025-04-15",
    followUpAction: "Share preliminary info on Q3 opportunities",
    tags: ["strategic", "quarterly review"],
    attachments: [
      { name: "Portfolio Performance Q1 2025.pdf", url: "/docs/portfolio-q1-2025.pdf" }
    ]
  },
  {
    id: "comm-008",
    lpId: "lp4",
    type: "email",
    direction: "incoming",
    date: "2025-04-10",
    subject: "Thank You and Next Steps",
    content: "Email from Elizabeth expressing appreciation for the thorough quarterly review and excitement about upcoming opportunities. Requested more information about the Denver expansion.",
    participants: ["Elizabeth Davis"],
    sentiment: "very-positive",
    followUpDate: "2025-04-12",
    followUpAction: "Send Denver expansion details",
    tags: ["follow-up", "Denver"]
  },
  {
    id: "comm-009",
    lpId: "lp5",
    type: "site-visit",
    direction: "outgoing",
    date: "2025-03-05",
    subject: "Charlotte Commons Progress Tour",
    content: "Took Alex and team on a site tour of Charlotte Commons. Showed construction progress which is ahead of schedule. Discussed potential for similar projects in the region.",
    participants: ["Alex Thompson", "Patricia Garcia"],
    sentiment: "positive",
    followUpDate: "2025-03-20",
    followUpAction: "Send photos and construction milestone update",
    tags: ["site visit", "Charlotte Commons"]
  },
  {
    id: "comm-010",
    lpId: "lp5",
    type: "call",
    direction: "incoming",
    date: "2025-03-15",
    subject: "Questions After Site Visit",
    content: "Alex called with follow-up questions about contractor selection for Charlotte Commons. Explained our vetting process and past experience with the general contractor.",
    participants: ["Alex Thompson"],
    sentiment: "neutral",
    tags: ["follow-up", "operations"]
  }
];

// Sample scheduled contacts
export const scheduledContacts: ScheduledContact[] = [
  {
    id: "meet-001",
    lpId: "lp1",
    lpName: "Midwest Opportunity Fund",
    date: "2025-04-15",
    time: "10:00",
    duration: 60,
    type: "meeting",
    purpose: "Finalize Riverfront Commons commitment",
    location: "Their office - Chicago",
    participants: ["John Smith", "Sarah Johnson", "Michael Brown"],
    preparationNotes: "Bring revised financial projections and updated site plans",
    status: "scheduled"
  },
  {
    id: "meet-002",
    lpId: "lp2",
    lpName: "Blue Harbor Capital",
    date: "2025-04-10",
    time: "14:00",
    duration: 45,
    type: "call",
    purpose: "Review revised Denver Highlands timeline",
    participants: ["Michael Chen", "Rebecca Lee"],
    preparationNotes: "Prepare timeline visualization and risk mitigation strategy",
    status: "scheduled"
  },
  {
    id: "meet-003",
    lpId: "lp3",
    lpName: "Summit Ventures",
    date: "2025-05-05",
    time: "11:30",
    duration: 90,
    type: "meeting",
    purpose: "Present new short-term opportunities",
    location: "Virtual - Zoom",
    participants: ["Robert Williams", "Amanda Clark"],
    preparationNotes: "Focus on 12-18 month investment cycles with higher liquidity",
    status: "scheduled"
  },
  {
    id: "meet-004",
    lpId: "lp4",
    lpName: "Lakefront Partners",
    date: "2025-04-22",
    time: "09:00",
    duration: 120,
    type: "site-visit",
    purpose: "Tour potential Denver expansion site",
    location: "Denver - Highland Park Area",
    participants: ["Elizabeth Davis", "Thomas Moore"],
    preparationNotes: "Coordinate with local development team, prepare site plans and market analysis",
    status: "scheduled"
  },
  {
    id: "meet-005",
    lpId: "lp5",
    lpName: "Greentree Investments",
    date: "2025-06-10",
    time: "13:00",
    duration: 60,
    type: "meeting",
    purpose: "Mid-year portfolio review",
    location: "Our office - Charlotte",
    participants: ["Alex Thompson", "Patricia Garcia"],
    preparationNotes: "Prepare Charlotte Commons progress report and regional market analysis",
    status: "scheduled"
  },
  {
    id: "meet-006",
    lpId: "lp1",
    lpName: "Midwest Opportunity Fund",
    date: "2025-03-18",
    time: "11:00",
    duration: 30,
    type: "call",
    purpose: "Discuss financial projections for Riverfront Commons",
    participants: ["John Smith"],
    status: "completed"
  },
  {
    id: "meet-007",
    lpId: "lp4",
    lpName: "Lakefront Partners",
    date: "2025-04-05",
    time: "10:30",
    duration: 45,
    type: "call",
    purpose: "Discuss Denver expansion opportunity",
    participants: ["Elizabeth Davis"],
    status: "scheduled"
  }
];

// Helper functions
export const getLpCommunications = (lpId: string): CommunicationLog[] => {
  return communicationLogs.filter(log => log.lpId === lpId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getUpcomingContacts = (days: number = 30): ScheduledContact[] => {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + days);
  
  return scheduledContacts
    .filter(contact => {
      const contactDate = new Date(contact.date);
      return contact.status === 'scheduled' && 
             contactDate >= today && 
             contactDate <= endDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getContactsForLp = (lpId: string): ScheduledContact[] => {
  return scheduledContacts
    .filter(contact => contact.lpId === lpId && contact.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Calculate relationship health score based on communication patterns and sentiment
export const calculateHealthScore = (lpId: string): {
  overall: number;
  recency: number;
  frequency: number;
  sentiment: number;
  engagement: number;
} => {
  const communications = getLpCommunications(lpId);
  
  // No communications means no relationship yet
  if (communications.length === 0) {
    return {
      overall: 0,
      recency: 0,
      frequency: 0,
      sentiment: 0,
      engagement: 0
    };
  }
  
  // Calculate recency (how recent was the last communication)
  const mostRecent = new Date(communications[0].date);
  const today = new Date();
  const daysSinceLastContact = Math.ceil((today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));
  const recency = Math.max(0, 100 - daysSinceLastContact * 3); // Older than ~33 days gets 0
  
  // Calculate frequency (how often do we communicate)
  const frequency = Math.min(100, communications.length * 20); // 5+ communications = 100%
  
  // Calculate sentiment (average sentiment of communications)
  const sentimentMap = {
    'very-positive': 100,
    'positive': 75,
    'neutral': 50,
    'negative': 25
  };
  
  const sentimentSum = communications.reduce((sum, log) => {
    return sum + sentimentMap[log.sentiment as keyof typeof sentimentMap];
  }, 0);
  const sentiment = sentimentSum / communications.length;
  
  // Calculate engagement (based on follow-ups and incoming communications)
  const incomingRatio = communications.filter(c => c.direction === 'incoming').length / communications.length;
  const followUpRatio = communications.filter(c => c.followUpAction).length / communications.length;
  const engagement = Math.min(100, (incomingRatio * 50) + (followUpRatio * 50));
  
  // Overall score is weighted average
  const overall = Math.round(
    (recency * 0.3) + 
    (frequency * 0.2) + 
    (sentiment * 0.25) + 
    (engagement * 0.25)
  );
  
  return {
    overall,
    recency: Math.round(recency),
    frequency: Math.round(frequency),
    sentiment: Math.round(sentiment),
    engagement: Math.round(engagement)
  };
};