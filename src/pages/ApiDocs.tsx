import React from 'react';
import { Separator } from "@/components/ui/separator";
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ApiDocs = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <h1 className="text-3xl font-bold mb-3">API Documentation</h1>
          <p className="text-muted-foreground mb-6">
            Documentation for Capital Match AI Platform APIs that can be used with OpenAI's Custom GPTs
          </p>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="mb-4">
                Our platform provides APIs that can be integrated with OpenAI's Custom GPTs to enable 
                real-time property data retrieval and investor matching.
              </p>
              <p>
                These APIs allow Custom GPTs to access structured data about zoning, parcel information,
                and potential investors matching specific deal criteria.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Available APIs</h2>
              
              <div className="space-y-8">
                <div className="rounded-lg border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Chicago Parcel and Zoning Lookup API</h3>
                  <p className="mb-4 text-muted-foreground">
                    Retrieve property zoning and parcel information for addresses in Chicago.
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">OpenAPI Schema</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono">
                        https://capital-match-ai-platform.vercel.app/api/openapi/zoning
                      </code>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Endpoint</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono">
                        GET https://capital-match-ai-platform.vercel.app/api/zoning?address={address}
                      </code>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Example Usage in Custom GPT</h4>
                    <div className="bg-muted p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre">
{`// When a user asks about property zoning
"I'd like to know the zoning for 123 N State St, Chicago"

// Your GPT can use the Zoning API to get the information
GET /api/zoning?address=123%20N%20State%20St%2C%20Chicago

// And then present the results to the user
"The property at 123 N State St is zoned B3-5 (Community Shopping District).
The PIN is 17091230120000 and it's located in the Chicago township."
`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Investor Matching API</h3>
                  <p className="mb-4 text-muted-foreground">
                    Find potential investors that match specific real estate deal criteria.
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">OpenAPI Schema</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono">
                        https://capital-match-ai-platform.vercel.app/api/openapi/investor-match
                      </code>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Endpoint</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono">
                        POST https://capital-match-ai-platform.vercel.app/api/investor-match
                      </code>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Example Request</h4>
                    <div className="bg-muted p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre">
{`{
  "assetType": "multifamily",
  "market": "Chicago",
  "investmentAmount": 5000000,
  "expectedReturn": 12,
  "riskProfile": "moderate",
  "projectName": "Lakeview Apartments",
  "description": "256-unit apartment complex in Lakeview neighborhood"
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Example Usage in Custom GPT</h4>
                    <div className="bg-muted p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre">
{`// When a user asks about finding investors
"Help me find investors for my multifamily deal in Chicago. 
It's a $5M investment with 12% returns and moderate risk."

// Your GPT can use the Investor Match API
POST /api/investor-match
{
  "assetType": "multifamily",
  "market": "Chicago",
  "investmentAmount": 5000000,
  "expectedReturn": 12,
  "riskProfile": "moderate"
}

// And then present the results to the user
"I've found 3 potential investors for your multifamily deal:
1. Blackstone Real Estate (85% match) - Strong match for asset type and market
2. Starwood Capital (78% match) - Good match but prefers higher returns
3. Greystar Real Estate (73% match) - Specializes in multifamily in Chicago"
`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Market Comparison API</h3>
                  <p className="mb-4 text-muted-foreground">
                    Compare real estate metrics against local market averages in various cities.
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">OpenAPI Schema</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono">
                        https://capital-match-ai-platform.vercel.app/api/openapi/market-comparison
                      </code>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Endpoint</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono">
                        GET https://capital-match-ai-platform.vercel.app/api/market-comparison?city={city}&assetType={assetType}&capRate={capRate}&rentPerSqFt={rentPerSqFt}&pricePerUnit={pricePerUnit}
                      </code>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Example Usage in Custom GPT</h4>
                    <div className="bg-muted p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre">
{`// When a user asks about comparing their deal to the market
"How does my multifamily deal in Chicago compare to the market? 
Cap rate is 5.5%, rents are $2.25/sqft, and price per unit is $230,000."

// Your GPT can use the Market Comparison API
GET /api/market-comparison?city=Chicago&assetType=multifamily&capRate=5.5&rentPerSqFt=2.25&pricePerUnit=230000

// And then present the results to the user
"Based on market analysis:
- Your cap rate of 5.5% is slightly below the market average of 5.2%
- Your rent of $2.25/sqft is above the market average of $2.15/sqft
- Your price per unit of $230,000 is higher than the market average of $225,000
- Chicago multifamily market is showing a positive 3.5% year-over-year growth
- Current vacancy rate in this market is 5.7%"
`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Integration with Custom GPTs</h2>
              <p className="mb-4">
                To integrate these APIs with your Custom GPT, follow these steps:
              </p>
              
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>
                  <strong>Configure Actions in GPT Editor:</strong> Access the GPT Editor in ChatGPT and go to the "Actions" section.
                </li>
                <li>
                  <strong>Add Schema URLs:</strong> Add the OpenAPI schema URLs provided above.
                </li>
                <li>
                  <strong>Set Up Instructions:</strong> In the "Instructions" section, guide your GPT on how to use these actions.
                </li>
                <li>
                  <strong>Test Functionality:</strong> Test your GPT by asking it to look up zoning information or match investors to a deal.
                </li>
              </ol>
              
              <div className="bg-muted p-4 rounded-md border border-border">
                <h4 className="text-lg font-medium mb-2">Sample GPT Instructions</h4>
                <pre className="text-sm font-mono whitespace-pre-wrap">
{`When a user provides a property address in Chicago, use the chicago_parcel_zoning_lookup action to retrieve and present the parcel and zoning information.

When a user wants to find investors for their real estate deal, extract the following details from their query:
- Asset type (multifamily, office, industrial, retail, etc.)
- Market location
- Investment amount
- Expected return
- Risk profile (low, moderate, high)

Then use the match_investors action to find potential matching investors and present the results in a clear, organized format.`}
                </pre>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiDocs;