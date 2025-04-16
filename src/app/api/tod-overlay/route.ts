import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface GeocodingResult {
  lat: number;
  lng: number;
  resolvedCity?: string;
}

interface TODDistrict {
  district: string;
  description: string;
  max_height: number;
  max_density: number;
  parking_reduction: number;
  closest_station: string;
  distance_to_station: number;
}

// Mock TOD overlay data for Charlotte and Raleigh
const CHARLOTTE_TOD_OVERLAYS: Record<string, TODDistrict> = {
  // South End area
  "south_end": {
    district: "TOD-UC",
    description: "Transit Oriented Development - Urban Center",
    max_height: 120,
    max_density: 250,
    parking_reduction: 50,
    closest_station: "East/West Station",
    distance_to_station: 0.2
  },
  // Uptown area
  "uptown": {
    district: "TOD-UC",
    description: "Transit Oriented Development - Urban Center",
    max_height: 150,
    max_density: 300,
    parking_reduction: 75,
    closest_station: "Trade Street Station",
    distance_to_station: 0.1
  },
  // NoDa area
  "noda": {
    district: "TOD-CC",
    description: "Transit Oriented Development - Community Center",
    max_height: 90,
    max_density: 150,
    parking_reduction: 30,
    closest_station: "36th Street Station",
    distance_to_station: 0.3
  },
  // Plaza Midwood area
  "plaza_midwood": {
    district: "TOD-NC",
    description: "Transit Oriented Development - Neighborhood Center",
    max_height: 65,
    max_density: 100,
    parking_reduction: 25,
    closest_station: "Hawthorne Lane Station",
    distance_to_station: 0.5
  },
  // University area
  "university": {
    district: "TOD-CC",
    description: "Transit Oriented Development - Community Center",
    max_height: 85,
    max_density: 120,
    parking_reduction: 30,
    closest_station: "University City Blvd Station",
    distance_to_station: 0.4
  },
  // Default for South Blvd area
  "south_blvd": {
    district: "TOD-CC",
    description: "Transit Oriented Development - Community Center",
    max_height: 90,
    max_density: 130,
    parking_reduction: 35,
    closest_station: "Scaleybark Station",
    distance_to_station: 0.3
  }
};

const RALEIGH_TOD_OVERLAYS: Record<string, TODDistrict> = {
  // Downtown Raleigh
  "downtown": {
    district: "TOD-BRT",
    description: "Transit Oriented Development - Bus Rapid Transit",
    max_height: 80,
    max_density: 130,
    parking_reduction: 40,
    closest_station: "GoRaleigh Station",
    distance_to_station: 0.2
  },
  // North Hills area
  "north_hills": {
    district: "TOD-R",
    description: "Transit Oriented Development - Residential",
    max_height: 60,
    max_density: 100,
    parking_reduction: 30,
    closest_station: "North Hills Transit Center",
    distance_to_station: 0.4
  },
  // Glenwood South area
  "glenwood_south": {
    district: "TOD-C",
    description: "Transit Oriented Development - Commercial",
    max_height: 70,
    max_density: 110,
    parking_reduction: 35,
    closest_station: "Glenwood South Station",
    distance_to_station: 0.3
  },
  // Warehouse District
  "warehouse_district": {
    district: "TOD-M",
    description: "Transit Oriented Development - Mixed Use",
    max_height: 75,
    max_density: 120,
    parking_reduction: 40,
    closest_station: "Union Station",
    distance_to_station: 0.2
  }
};

// Additional overlays that might be present based on area
const ADDITIONAL_OVERLAYS: Record<string, string[]> = {
  "south_end": ["UDIO", "HDO"],
  "uptown": ["UMUD", "HDO"],
  "noda": ["UDIO", "HDO", "NSO"],
  "plaza_midwood": ["HDO", "NSO"],
  "university": ["UDO"],
  "south_blvd": ["UDIO", "HDO"],
  "downtown": ["SHOD-1", "HOD-G"],
  "north_hills": ["SHOD-2"],
  "glenwood_south": ["SHOD-1", "NCOD"],
  "warehouse_district": ["HOD-G", "SRPOD"]
};

// Opportunity zone indicators for areas
const OPPORTUNITY_ZONES: Record<string, boolean> = {
  "south_end": true,
  "uptown": false,
  "noda": true,
  "plaza_midwood": false,
  "university": true,
  "south_blvd": true,
  "downtown": true,
  "north_hills": false,
  "glenwood_south": false,
  "warehouse_district": true
};

// Function to look up TOD information based on address
function lookupTODInformation(address: string, city: string): {
  tod_overlay: TODDistrict;
  opportunity_zone: boolean;
  additional_overlays: string[];
} | null {
  const cityLower = city.toLowerCase();
  let area: string | null = null;
  
  // Determine area based on address keywords
  if (cityLower === 'charlotte') {
    // Handle Charlotte addresses
    const addressLower = address.toLowerCase();
    
    if (addressLower.includes('south blvd') || 
        addressLower.includes('scaleybark') || 
        addressLower.match(/2[0-9]00\s+south/)) {
      area = 'south_blvd';
    } else if (addressLower.includes('trade') || 
               addressLower.includes('tryon') || 
               addressLower.includes('college') || 
               addressLower.includes('uptown')) {
      area = 'uptown';
    } else if (addressLower.includes('36th') || 
               addressLower.includes('noda') || 
               addressLower.includes('north davidson')) {
      area = 'noda';
    } else if (addressLower.includes('plaza') || 
               addressLower.includes('central') || 
               addressLower.includes('midwood')) {
      area = 'plaza_midwood';
    } else if (addressLower.includes('university') || 
               addressLower.includes('harris') || 
               addressLower.includes('tryon')) {
      area = 'university';
    } else if (addressLower.includes('camden') || 
               addressLower.includes('south end') || 
               addressLower.includes('dilworth')) {
      area = 'south_end';
    } else {
      // Default to South End for other Charlotte addresses
      area = 'south_end';
    }
    
    if (area) {
      return {
        tod_overlay: CHARLOTTE_TOD_OVERLAYS[area],
        opportunity_zone: OPPORTUNITY_ZONES[area],
        additional_overlays: ADDITIONAL_OVERLAYS[area] || []
      };
    }
  } else if (cityLower === 'raleigh') {
    // Handle Raleigh addresses
    const addressLower = address.toLowerCase();
    
    if (addressLower.includes('fayetteville') || 
        addressLower.includes('downtown') || 
        addressLower.includes('morgan') || 
        addressLower.includes('hargett')) {
      area = 'downtown';
    } else if (addressLower.includes('north hills') || 
               addressLower.includes('six forks') || 
               addressLower.includes('lassiter')) {
      area = 'north_hills';
    } else if (addressLower.includes('glenwood') || 
               addressLower.includes('peace')) {
      area = 'glenwood_south';
    } else if (addressLower.includes('warehouse') || 
               addressLower.includes('west martin') || 
               addressLower.includes('west davie') || 
               addressLower.includes('depot')) {
      area = 'warehouse_district';
    } else {
      // Default to downtown for other Raleigh addresses
      area = 'downtown';
    }
    
    if (area) {
      return {
        tod_overlay: RALEIGH_TOD_OVERLAYS[area],
        opportunity_zone: OPPORTUNITY_ZONES[area],
        additional_overlays: ADDITIONAL_OVERLAYS[area] || []
      };
    }
  }
  
  return null;
}

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
  
  try {
    // Extract parameters
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    const city = searchParams.get('city');
    
    // Validate required parameters
    if (!address || !city) {
      return NextResponse.json({ 
        error: 'Address and city parameters are required'
      }, { status: 400, headers });
    }
    
    // Check if city is supported
    const supportedCities = ['charlotte', 'raleigh'];
    const cityLower = city.toLowerCase();
    
    if (!supportedCities.includes(cityLower)) {
      return NextResponse.json({ 
        error: `City '${city}' is not supported. Supported cities: Charlotte, Raleigh`
      }, { status: 400, headers });
    }
    
    // Look up TOD information
    const todInfo = lookupTODInformation(address, city);
    
    if (!todInfo) {
      return NextResponse.json({ 
        error: `Unable to find TOD overlay information for address: ${address} in ${city}`
      }, { status: 404, headers });
    }
    
    // Prepare the response
    const response = {
      address,
      city,
      tod_overlay: todInfo.tod_overlay,
      opportunity_zone: todInfo.opportunity_zone,
      additional_overlays: todInfo.additional_overlays
    };
    
    return NextResponse.json(response, { headers });
    
  } catch (error) {
    console.error('Error processing TOD overlay request:', error);
    return NextResponse.json({ 
      error: 'Failed to process TOD overlay request' 
    }, { status: 500, headers });
  }
}

// Handle CORS preflight for all methods
export async function OPTIONS() {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  
  return new NextResponse(null, { status: 204, headers });
}