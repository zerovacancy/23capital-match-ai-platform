import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface GeocodingResult {
  lat: number;
  lng: number;
  resolvedCity?: string;
  displayName?: string;
}

// City bounding boxes for validation
const cityBounds = {
  chicago: {
    minLat: 41.6,
    maxLat: 42.1,
    minLng: -88.0,
    maxLng: -87.4
  },
  denver: {
    minLat: 39.5,
    maxLat: 40.0,
    minLng: -105.2,
    maxLng: -104.7
  },
  charlotte: {
    minLat: 35.0,
    maxLat: 35.5,
    minLng: -81.0,
    maxLng: -80.6
  },
  raleigh: {
    minLat: 35.6,
    maxLat: 36.0,
    minLng: -78.9,
    maxLng: -78.4
  },
  nashville: {
    minLat: 35.9,
    maxLat: 36.4,
    minLng: -87.1,
    maxLng: -86.5
  }
};

// Function to geocode an address with OpenStreetMap
async function geocodeAddress(address: string, city: string): Promise<GeocodingResult | null> {
  try {
    console.log(`Verifying address: ${address} in city: ${city}`);
    
    const targetCity = city.toLowerCase();
    
    // Determine state code based on city
    let stateCode = '';
    switch (targetCity) {
      case 'chicago':
        stateCode = 'IL';
        break;
      case 'denver':
        stateCode = 'CO';
        break;
      case 'charlotte':
      case 'raleigh':
        stateCode = 'NC';
        break;
      case 'nashville':
        stateCode = 'TN';
        break;
      default:
        return null; // Unsupported city
    }
    
    // Create a structured address query
    const cityToInclude = targetCity.charAt(0).toUpperCase() + targetCity.slice(1);
    const encodedAddress = encodeURIComponent(`${address}, ${cityToInclude}, ${stateCode}, USA`);
    
    // Query OpenStreetMap's Nominatim service
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&countrycodes=us`,
      {
        headers: {
          'User-Agent': 'capital-match-ai-platform-address-verification'
        }
      }
    );

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      
      // Extract coordinates
      const lat = parseFloat(location.lat);
      const lng = parseFloat(location.lon);
      
      // Check if coordinates are within city bounds
      const bounds = cityBounds[targetCity as keyof typeof cityBounds];
      const isInBounds = bounds && 
        lat >= bounds.minLat && 
        lat <= bounds.maxLat && 
        lng >= bounds.minLng && 
        lng <= bounds.maxLng;
      
      // Extract the resolved city from the display name
      const displayNameParts = location.display_name.split(',').map((part: string) => part.trim());
      let resolvedCity = null;
      
      // Try to find the city in the display name
      if (displayNameParts.length >= 3) {
        // The city is usually the 2nd or 3rd part
        for (let i = 1; i < 4 && i < displayNameParts.length; i++) {
          const potentialCity = displayNameParts[i].toLowerCase();
          if (potentialCity.includes(targetCity) || 
              (targetCity === 'chicago' && potentialCity.includes('cook')) ||
              (targetCity === 'denver' && potentialCity.includes('denver')) ||
              (targetCity === 'charlotte' && potentialCity.includes('mecklenburg')) ||
              (targetCity === 'raleigh' && potentialCity.includes('wake')) ||
              (targetCity === 'nashville' && potentialCity.includes('davidson'))) {
            resolvedCity = displayNameParts[i];
            break;
          }
        }
      }
      
      return {
        lat,
        lng,
        resolvedCity: resolvedCity || 'Unknown',
        displayName: location.display_name
      };
    }
    
    return null; // No geocoding result found
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
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
  
  // Extract parameters
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const city = searchParams.get('city');
  
  // Validate required parameters
  if (!address) {
    return NextResponse.json({ 
      valid: false, 
      error: 'Address parameter is required' 
    }, { status: 400, headers });
  }
  
  if (!city) {
    return NextResponse.json({ 
      valid: false, 
      error: 'City parameter is required. Supported cities: chicago, denver, charlotte, raleigh, nashville.' 
    }, { status: 400, headers });
  }
  
  // Check if city is supported
  const supportedCities = ['chicago', 'denver', 'charlotte', 'raleigh', 'nashville'];
  if (!supportedCities.includes(city.toLowerCase())) {
    return NextResponse.json({ 
      valid: false, 
      error: `City '${city}' is not supported. Supported cities: chicago, denver, charlotte, raleigh, nashville.` 
    }, { status: 400, headers });
  }
  
  try {
    // Geocode the address
    const geocodeResult = await geocodeAddress(address, city);
    
    if (!geocodeResult) {
      return NextResponse.json({ 
        valid: false, 
        error: `Unable to geocode address '${address}' in ${city}.` 
      }, { status: 404, headers });
    }
    
    // Check if coordinates are within city boundaries
    const bounds = cityBounds[city.toLowerCase() as keyof typeof cityBounds];
    const isInBounds = bounds && 
      geocodeResult.lat >= bounds.minLat && 
      geocodeResult.lat <= bounds.maxLat && 
      geocodeResult.lng >= bounds.minLng && 
      geocodeResult.lng <= bounds.maxLng;
    
    if (!isInBounds) {
      return NextResponse.json({ 
        valid: false, 
        error: `Address coordinates (${geocodeResult.lat}, ${geocodeResult.lng}) are outside ${city} boundaries.`,
        geocoding: {
          coordinates: {
            lat: geocodeResult.lat,
            lng: geocodeResult.lng
          },
          display_name: geocodeResult.displayName
        }
      }, { status: 400, headers });
    }
    
    // Address is valid
    return NextResponse.json({ 
      valid: true, 
      message: `Address is valid and geocodes to ${city}`,
      geocoding: {
        coordinates: {
          lat: geocodeResult.lat,
          lng: geocodeResult.lng
        },
        display_name: geocodeResult.displayName,
        resolved_city: geocodeResult.resolvedCity
      }
    }, { headers });
    
  } catch (error) {
    console.error('Error verifying address:', error);
    return NextResponse.json({ 
      valid: false, 
      error: 'An error occurred while verifying the address' 
    }, { status: 500, headers });
  }
}