import { NextRequest, NextResponse } from 'next/server';

// Map of city to its available entitlement types
const ENTITLEMENT_TYPES: Record<string, string[]> = {
  denver: ['Rezoning', 'Site Plan', 'Building Permit', 'Landmark Designation', 'Conditional Use'],
  chicago: ['Building Permit', 'Zoning Change', 'Planned Development', 'Landmark Designation'],
  charlotte: ['Rezoning Petition', 'Commercial Building Permit', 'Subdivision', 'Urban District Review'],
  raleigh: ['Site Plan', 'Building Permit', 'Rezoning', 'Administrative Site Review'],
  nashville: ['Building Permit', 'Zoning Change', 'Subdivision', 'Historic Overlay'],
  'new york': ['New Building', 'Alteration Type 1', 'Alteration Type 2', 'Special Permit', 'Variance'],
  'los angeles': ['Building Permit', 'Entitlement', 'Coastal Development Permit', 'Specific Plan Approval'],
  miami: ['Building Permit', 'Zoning Verification', 'Warrant', 'Special Exception', 'Variance'],
  dallas: ['Building Permit', 'Zoning Change', 'Specific Use Permit', 'Board of Adjustment']
};

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
  
  // Extract city parameter
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city')?.toLowerCase();
  
  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required.' },
      { status: 400, headers }
    );
  }
  
  const types = ENTITLEMENT_TYPES[city];
  
  if (!types) {
    return NextResponse.json(
      { error: 'Unsupported city.' },
      { status: 400, headers }
    );
  }
  
  return NextResponse.json({
    city,
    entitlementTypes: types
  }, { headers });
}