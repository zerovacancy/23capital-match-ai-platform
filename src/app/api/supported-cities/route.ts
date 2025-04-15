import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Add CORS headers
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }
  
  // Return supported cities
  return NextResponse.json({
    supportedCities: [
      'denver',
      'chicago',
      'charlotte',
      'raleigh',
      'nashville',
      'new york',
      'los angeles',
      'miami',
      'dallas'
    ]
  }, { headers });
}