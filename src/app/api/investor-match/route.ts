import { NextRequest, NextResponse } from 'next/server';

// Mock database of investors with their preferences
// In a real application, this would come from your database
const investorPreferences = [
  {
    id: "INV001",
    name: "Blackstone Real Estate",
    minimumInvestment: 5000000,
    maximumInvestment: 100000000,
    preferredAssetTypes: ["multifamily", "office", "industrial", "retail"],
    preferredMarkets: ["Chicago", "New York", "Los Angeles", "Miami", "Dallas"],
    minimumReturnExpectation: 12,
    riskProfile: "moderate",
    investmentHorizon: "5-7 years"
  },
  {
    id: "INV002",
    name: "Brookfield Properties",
    minimumInvestment: 10000000,
    maximumInvestment: 200000000,
    preferredAssetTypes: ["office", "retail", "mixed-use"],
    preferredMarkets: ["New York", "Boston", "Washington DC", "San Francisco"],
    minimumReturnExpectation: 10,
    riskProfile: "low",
    investmentHorizon: "7-10 years"
  },
  {
    id: "INV003",
    name: "Starwood Capital",
    minimumInvestment: 3000000,
    maximumInvestment: 75000000,
    preferredAssetTypes: ["multifamily", "hotel", "mixed-use"],
    preferredMarkets: ["Chicago", "Miami", "Phoenix", "Nashville", "Austin"],
    minimumReturnExpectation: 15,
    riskProfile: "high",
    investmentHorizon: "3-5 years"
  },
  {
    id: "INV004",
    name: "Greystar Real Estate",
    minimumInvestment: 2000000,
    maximumInvestment: 50000000,
    preferredAssetTypes: ["multifamily", "student housing"],
    preferredMarkets: ["Chicago", "Austin", "Atlanta", "Denver", "Seattle"],
    minimumReturnExpectation: 8,
    riskProfile: "low",
    investmentHorizon: "5-10 years"
  },
  {
    id: "INV005",
    name: "Hines",
    minimumInvestment: 5000000,
    maximumInvestment: 150000000,
    preferredAssetTypes: ["office", "multifamily", "industrial", "mixed-use"],
    preferredMarkets: ["Chicago", "New York", "Houston", "San Francisco", "London"],
    minimumReturnExpectation: 11,
    riskProfile: "moderate",
    investmentHorizon: "5-8 years"
  }
];

// Calculate match score between deal and investor (0-100)
function calculateMatchScore(deal: any, investor: any): number {
  let score = 0;
  const factors = {
    assetType: 30,
    market: 25,
    investmentSize: 20,
    returnExpectation: 15,
    riskProfile: 10
  };
  
  // Asset type match
  if (investor.preferredAssetTypes.includes(deal.assetType)) {
    score += factors.assetType;
  }
  
  // Market match
  if (investor.preferredMarkets.includes(deal.market)) {
    score += factors.market;
  }
  
  // Investment size within range
  if (deal.investmentAmount >= investor.minimumInvestment && 
      deal.investmentAmount <= investor.maximumInvestment) {
    score += factors.investmentSize;
  } else if (deal.investmentAmount < investor.minimumInvestment * 0.8 ||
             deal.investmentAmount > investor.maximumInvestment * 1.2) {
    // Well outside their range
    score += 0;
  } else {
    // Close to their range
    score += factors.investmentSize * 0.5;
  }
  
  // Return expectation match
  if (deal.expectedReturn >= investor.minimumReturnExpectation) {
    score += factors.returnExpectation;
  } else if (deal.expectedReturn >= investor.minimumReturnExpectation * 0.8) {
    // Close to their minimum
    score += factors.returnExpectation * 0.5;
  }
  
  // Risk profile alignment (simple match)
  if (deal.riskProfile === investor.riskProfile) {
    score += factors.riskProfile;
  } else if (
    (deal.riskProfile === "moderate" && investor.riskProfile === "high") ||
    (deal.riskProfile === "low" && investor.riskProfile === "moderate")
  ) {
    // Partial match - investor can tolerate higher risk than the deal
    score += factors.riskProfile * 0.5;
  }
  
  return Math.round(score);
}

export async function POST(request: NextRequest) {
  // Add CORS headers
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }
  
  try {
    console.log('Processing investor match request');
    
    // Parse the deal information from the request body
    const dealData = await request.json();
    console.log(`Received deal data: ${JSON.stringify(dealData)}`);
    
    // Validate required fields
    const requiredFields = ['assetType', 'market', 'investmentAmount', 'expectedReturn', 'riskProfile'];
    for (const field of requiredFields) {
      if (!dealData[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json({ 
          error: `Missing required field: ${field}`
        }, { status: 400, headers });
      }
    }
    
    // Normalize the asset type to lowercase for matching
    dealData.assetType = dealData.assetType.toLowerCase();
    
    // Find matching investors and calculate match scores
    const matches = investorPreferences.map(investor => {
      const matchScore = calculateMatchScore(dealData, investor);
      return {
        investorId: investor.id,
        investorName: investor.name,
        matchScore,
        matchDetails: {
          assetTypeMatch: investor.preferredAssetTypes.includes(dealData.assetType),
          marketMatch: investor.preferredMarkets.includes(dealData.market),
          investmentSizeMatch: dealData.investmentAmount >= investor.minimumInvestment && 
                              dealData.investmentAmount <= investor.maximumInvestment,
          returnExpectationMatch: dealData.expectedReturn >= investor.minimumReturnExpectation,
          riskProfileMatch: dealData.riskProfile === investor.riskProfile
        }
      };
    });
    
    // Sort matches by score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    // Create the response
    const response = {
      deal: dealData,
      matches: matches.slice(0, 3),  // Return top 3 matches
      totalMatches: matches.filter(m => m.matchScore > 50).length  // Count of good matches (>50%)
    };
    
    console.log(`Sending response with ${response.matches.length} matches`);
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Error processing investor match request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500, headers }
    );
  }
}