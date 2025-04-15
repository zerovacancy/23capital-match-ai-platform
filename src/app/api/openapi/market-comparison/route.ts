import { NextResponse } from 'next/server';

// Define the schema directly in this file
const schema = {
  "openapi": "3.1.0",
  "info": {
    "title": "Real Estate Market Comparison API",
    "description": "Compare real estate deal metrics against local market averages.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://capital-match-ai-platform.vercel.app/api",
      "description": "Production server"
    }
  ],
  "paths": {
    "/market-comparison": {
      "get": {
        "summary": "Compare real estate metrics against market averages",
        "operationId": "getMarketComparison",
        "tags": [
          "Market Analysis"
        ],
        "parameters": [
          {
            "name": "city",
            "in": "query",
            "description": "The city to compare against (e.g., Chicago, New York, Los Angeles, Miami, Dallas, Nashville)",
            "required": true,
            "schema": {
              "type": "string",
              "example": "Chicago"
            }
          },
          {
            "name": "assetType",
            "in": "query",
            "description": "The type of real estate asset",
            "required": true,
            "schema": {
              "type": "string",
              "enum": [
                "multifamily",
                "office",
                "retail",
                "industrial"
              ],
              "example": "multifamily"
            }
          },
          {
            "name": "capRate",
            "in": "query",
            "description": "The capitalization rate (%) of the property",
            "required": false,
            "schema": {
              "type": "number",
              "format": "float",
              "example": 5.5
            }
          },
          {
            "name": "rentPerSqFt",
            "in": "query",
            "description": "The rent per square foot ($) of the property",
            "required": false,
            "schema": {
              "type": "number",
              "format": "float",
              "example": 2.25
            }
          },
          {
            "name": "pricePerSqFt",
            "in": "query",
            "description": "The price per square foot ($) of the property (for office, retail, industrial)",
            "required": false,
            "schema": {
              "type": "number",
              "format": "float",
              "example": 250
            }
          },
          {
            "name": "pricePerUnit",
            "in": "query",
            "description": "The price per unit ($) of the property (for multifamily)",
            "required": false,
            "schema": {
              "type": "number",
              "format": "float",
              "example": 200000
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful comparison of property metrics against market averages",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "city": {
                      "type": "string",
                      "example": "Chicago"
                    },
                    "assetType": {
                      "type": "string",
                      "example": "multifamily"
                    },
                    "marketAverages": {
                      "type": "object",
                      "properties": {
                        "averageCapRate": {
                          "type": "number",
                          "example": 5.2
                        },
                        "averageRentPerSqFt": {
                          "type": "number",
                          "example": 2.15
                        },
                        "vacancyRate": {
                          "type": "number",
                          "example": 5.7
                        },
                        "averagePricePerUnit": {
                          "type": "number",
                          "example": 225000
                        },
                        "yearOverYearValueChange": {
                          "type": "number",
                          "example": 3.5
                        }
                      }
                    },
                    "insights": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "example": [
                        "The cap rate of 5.5% is below the market average of 5.2%.",
                        "The rent of $2.25/sqft is higher than the market average of $2.15/sqft."
                      ]
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request - missing required parameters",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "City and assetType parameters are required"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export async function GET(request: Request) {
  // Add CORS headers
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }
  
  // Return the schema as JSON with CORS headers
  return NextResponse.json(schema, { headers });
}