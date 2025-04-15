import { NextRequest, NextResponse } from 'next/server';

// Mock data for zoning lookup
const mockZoningData = {
  "123 N State St, Chicago, IL": {
    coordinates: {
      lat: 41.8838,
      lng: -87.6278
    },
    zoning: {
      zoning_classification: "B3-5",
      description: "Community Shopping District"
    },
    parcel: {
      pin: "17091230120000",
      property_class: "5-99",
      township_name: "CHICAGO",
      square_footage: 5000
    }
  },
  "456 N Michigan Ave, Chicago, IL": {
    coordinates: {
      lat: 41.8904,
      lng: -87.6241
    },
    zoning: {
      zoning_classification: "DX-12",
      description: "Downtown Mixed-Use District"
    },
    parcel: {
      pin: "17103121020000",
      property_class: "5-91",
      township_name: "CHICAGO",
      square_footage: 12000
    }
  },
  "100 W Randolph St, Chicago, IL": {
    coordinates: {
      lat: 41.8843,
      lng: -87.6321
    },
    zoning: {
      zoning_classification: "DC-16",
      description: "Downtown Core District"
    },
    parcel: {
      pin: "17092230450000",
      property_class: "5-95",
      township_name: "CHICAGO",
      square_footage: 32000
    }
  },
  "401 N Wabash Ave, Chicago, IL": {
    coordinates: {
      lat: 41.8892,
      lng: -87.6268
    },
    zoning: {
      zoning_classification: "DX-16",
      description: "Downtown Mixed-Use District"
    },
    parcel: {
      pin: "17322144780000",
      property_class: "5-98",
      township_name: "CHICAGO",
      square_footage: 45000
    }
  },
  "233 S Wacker Dr, Chicago, IL": {
    coordinates: {
      lat: 41.8789,
      lng: -87.6359
    },
    zoning: {
      zoning_classification: "DC-16",
      description: "Downtown Core District"
    },
    parcel: {
      pin: "17162100100000",
      property_class: "5-97",
      township_name: "CHICAGO",
      square_footage: 38000
    }
  }
};

// Fallback mock data for addresses not in our map
const fallbackData = {
  coordinates: {
    lat: 41.8781,
    lng: -87.6298
  },
  zoning: {
    zoning_classification: "RS-3",
    description: "Residential Single-Unit District"
  },
  parcel: {
    pin: "17000000000000",
    property_class: "2-03",
    township_name: "CHICAGO",
    square_footage: 5000
  }
};

export async function GET(request: NextRequest) {
  // Extract address from query parameters
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  // Find the closest match in our mock data
  let matchedAddress = Object.keys(mockZoningData).find(
    addr => address.toLowerCase().includes(addr.toLowerCase())
  );

  // Get data for matched address or use fallback
  const data = matchedAddress 
    ? { ...mockZoningData[matchedAddress], address_queried: address }
    : { ...fallbackData, address_queried: address };

  return NextResponse.json(data);
}