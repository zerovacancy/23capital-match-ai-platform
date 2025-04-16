import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ZoningFilterRequest {
  city: string;
  filters: {
    zoning_districts?: string[];
    min_lot_size?: number;
    max_lot_size?: number;
    overlays?: string[];
    opportunity_zone?: boolean;
    proximity_to_transit?: number;
  };
  boundary?: {
    center?: {
      lat: number;
      lng: number;
    };
    radius?: number;
    neighborhood?: string;
  };
}

interface ParcelResult {
  address: string;
  parcel_id: string;
  zoning: string;
  overlays: string[];
  lot_size: number;
  opportunity_zone: boolean;
  distance_to_transit?: number;
}

// Mock data for Charlotte
const CHARLOTTE_PARCELS: ParcelResult[] = [
  {
    address: '401 N Tryon St, Charlotte, NC',
    parcel_id: '08117716',
    zoning: 'UMUD',
    overlays: ['TOD-CC'],
    lot_size: 22500,
    opportunity_zone: true,
    distance_to_transit: 0.2
  },
  {
    address: '500 S College St, Charlotte, NC',
    parcel_id: '12345678',
    zoning: 'UMUD',
    overlays: ['TOD-UC'],
    lot_size: 15000,
    opportunity_zone: true,
    distance_to_transit: 0.15
  },
  {
    address: '1100 S Tryon St, Charlotte, NC',
    parcel_id: '08117753',
    zoning: 'MUDD',
    overlays: ['TOD-CC', 'Historic District'],
    lot_size: 18000,
    opportunity_zone: false,
    distance_to_transit: 0.3
  },
  {
    address: '525 N Tryon St, Charlotte, NC',
    parcel_id: '08117734',
    zoning: 'UMUD',
    overlays: ['TOD-CC'],
    lot_size: 30000,
    opportunity_zone: true,
    distance_to_transit: 0.25
  },
  {
    address: '300 S Brevard St, Charlotte, NC',
    parcel_id: '08117790',
    zoning: 'TOD-NC',
    overlays: ['Historic District'],
    lot_size: 12000,
    opportunity_zone: false,
    distance_to_transit: 0.4
  }
];

// Mock data for Raleigh
const RALEIGH_PARCELS: ParcelResult[] = [
  {
    address: '150 Fayetteville St, Raleigh, NC',
    parcel_id: '1704923111',
    zoning: 'DX-12',
    overlays: ['SHOD-1'],
    lot_size: 20000,
    opportunity_zone: true,
    distance_to_transit: 0.3
  },
  {
    address: '327 Hillsborough St, Raleigh, NC',
    parcel_id: '1704933222',
    zoning: 'DX-7',
    overlays: ['SHOD-2'],
    lot_size: 15000,
    opportunity_zone: true,
    distance_to_transit: 0.5
  },
  {
    address: '501 Glenwood Ave, Raleigh, NC',
    parcel_id: '1704944333',
    zoning: 'CX-4',
    overlays: ['SRPOD'],
    lot_size: 25000,
    opportunity_zone: false,
    distance_to_transit: 0.7
  },
  {
    address: '711 Hillsborough St, Raleigh, NC',
    parcel_id: '1704955444',
    zoning: 'NX-3',
    overlays: ['NCOD'],
    lot_size: 8000,
    opportunity_zone: false,
    distance_to_transit: 0.4
  },
  {
    address: '119 E Hargett St, Raleigh, NC',
    parcel_id: '1704966555',
    zoning: 'DX-5',
    overlays: ['HOD-G'],
    lot_size: 10000,
    opportunity_zone: true,
    distance_to_transit: 0.2
  }
];

// Function to filter parcels based on criteria
function filterParcels(parcels: ParcelResult[], filters: ZoningFilterRequest['filters'], boundary?: ZoningFilterRequest['boundary']): ParcelResult[] {
  return parcels.filter(parcel => {
    // Filter by zoning districts if specified
    if (filters.zoning_districts && filters.zoning_districts.length > 0) {
      if (!filters.zoning_districts.includes(parcel.zoning)) {
        return false;
      }
    }
    
    // Filter by lot size
    if (filters.min_lot_size !== undefined && parcel.lot_size < filters.min_lot_size) {
      return false;
    }
    
    if (filters.max_lot_size !== undefined && parcel.lot_size > filters.max_lot_size) {
      return false;
    }
    
    // Filter by overlays
    if (filters.overlays && filters.overlays.length > 0) {
      const hasMatchingOverlay = filters.overlays.some(overlay => 
        parcel.overlays.includes(overlay)
      );
      
      if (!hasMatchingOverlay) {
        return false;
      }
    }
    
    // Filter by opportunity zone
    if (filters.opportunity_zone !== undefined && parcel.opportunity_zone !== filters.opportunity_zone) {
      return false;
    }
    
    // Filter by proximity to transit
    if (filters.proximity_to_transit !== undefined && 
        (parcel.distance_to_transit === undefined || 
         parcel.distance_to_transit > filters.proximity_to_transit)) {
      return false;
    }
    
    // Boundary filtering - simplified implementation
    if (boundary && boundary.neighborhood) {
      // Simplified neighborhood check (in real implementation, would check if parcel is in neighborhood)
      // For Charlotte - Uptown area parcels
      if (boundary.neighborhood.toLowerCase() === 'uptown' && 
          !parcel.address.toLowerCase().includes('tryon') && 
          !parcel.address.toLowerCase().includes('college')) {
        return false;
      }
      
      // For Raleigh - Downtown area parcels
      if (boundary.neighborhood.toLowerCase() === 'downtown' && 
          !parcel.address.toLowerCase().includes('fayetteville') && 
          !parcel.address.toLowerCase().includes('hargett')) {
        return false;
      }
    }
    
    return true;
  });
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
    // Get the request body
    const requestBody: ZoningFilterRequest = await request.json();
    
    // Validate required parameters
    if (!requestBody.city) {
      return NextResponse.json({ 
        error: 'City parameter is required' 
      }, { status: 400, headers });
    }
    
    if (!requestBody.filters) {
      return NextResponse.json({ 
        error: 'Filters parameter is required' 
      }, { status: 400, headers });
    }
    
    // Check if city is supported
    const supportedCities = ['charlotte', 'raleigh'];
    const targetCity = requestBody.city.toLowerCase();
    
    if (!supportedCities.includes(targetCity)) {
      return NextResponse.json({ 
        error: `City '${requestBody.city}' is not supported. Supported cities: Charlotte, Raleigh.` 
      }, { status: 400, headers });
    }
    
    // Get the appropriate parcels data based on city
    const parcelsData = targetCity === 'charlotte' ? CHARLOTTE_PARCELS : RALEIGH_PARCELS;
    
    // Apply filters to parcels
    const filteredParcels = filterParcels(parcelsData, requestBody.filters, requestBody.boundary);
    
    // Prepare the response
    const response = {
      city: requestBody.city,
      parcels_found: filteredParcels.length,
      parcels: filteredParcels,
      filter_applied: requestBody.filters
    };
    
    return NextResponse.json(response, { headers });
    
  } catch (error) {
    console.error('Error processing zoning filter request:', error);
    return NextResponse.json({ 
      error: 'Failed to process request' 
    }, { status: 500, headers });
  }
}

// Handle CORS preflight for all methods
export async function OPTIONS() {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  
  return new NextResponse(null, { status: 204, headers });
}