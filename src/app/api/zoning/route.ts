import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface GeocodingResult {
  lat: number;
  lng: number;
}

interface ZoningData {
  zoning_classification: string;
  description?: string;
}

interface ParcelData {
  pin: string;
  property_class: string;
  township_name?: string;
  square_footage?: number;
}

// Fallback coordinates for Chicago (city center)
const CHICAGO_FALLBACK_COORDINATES = {
  lat: 41.8781,
  lng: -87.6298
};

// Static data mapping for common addresses in Chicago
// This serves as a backup when geocoding fails
const KNOWN_ADDRESSES = {
  "123 N State St": { lat: 41.8838, lng: -87.6278 },
  "Willis Tower": { lat: 41.8789, lng: -87.6359 },
  "Trump Tower": { lat: 41.8892, lng: -87.6268 },
  "Merchandise Mart": { lat: 41.8885, lng: -87.6354 },
  "The Bean": { lat: 41.8827, lng: -87.6233 },
  "Navy Pier": { lat: 41.8917, lng: -87.6086 },
  "Art Institute of Chicago": { lat: 41.8796, lng: -87.6237 },
  "Wrigley Field": { lat: 41.9475, lng: -87.6564 },
  "Soldier Field": { lat: 41.8623, lng: -87.6167 },
  "United Center": { lat: 41.8806, lng: -87.6742 }
};

// City center coordinates for fallback
const CITY_FALLBACK_COORDINATES = {
  chicago: { lat: 41.8781, lng: -87.6298 },
  denver: { lat: 39.7392, lng: -104.9903 },
  charlotte: { lat: 35.2271, lng: -80.8431 },
  raleigh: { lat: 35.7796, lng: -78.6382 },
  nashville: { lat: 36.1627, lng: -86.7816 }
};

// Function to geocode an address - first checks known addresses, then uses Open Street Map
async function geocodeAddress(address: string, city?: string): Promise<GeocodingResult | null> {
  try {
    console.log(`Geocoding address: ${address} in city: ${city || 'unknown'}`);
    
    // Default to Chicago if no city specified
    const targetCity = (city || 'chicago').toLowerCase();
    
    // Check if address contains any of our known landmarks (for Chicago)
    if (targetCity === 'chicago') {
      for (const [landmark, coords] of Object.entries(KNOWN_ADDRESSES)) {
        if (address.toLowerCase().includes(landmark.toLowerCase())) {
          console.log(`Found known address match for: ${landmark}`);
          return coords;
        }
      }
    }
    
    // If not a known address, try OpenStreetMap's Nominatim service (no API key required)
    // Note: For production, respect the usage policy by adding proper caching and rate limiting
    // Include city name to improve geocoding accuracy
    const cityToInclude = targetCity.charAt(0).toUpperCase() + targetCity.slice(1);
    const encodedAddress = encodeURIComponent(`${address}, ${cityToInclude}`);
    console.log(`Encoded address for OSM: ${encodedAddress}`);
    
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`,
      {
        headers: {
          // User agent is required by Nominatim's ToS
          'User-Agent': 'capital-match-ai-platform'
        }
      }
    );

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      console.log(`OSM geocoding result: ${JSON.stringify(location)}`);
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon)
      };
    }
    
    // As a last resort, return the appropriate city's center coordinates
    const fallbackCoords = CITY_FALLBACK_COORDINATES[targetCity as keyof typeof CITY_FALLBACK_COORDINATES] || 
                          CITY_FALLBACK_COORDINATES.chicago; // Default to Chicago if city not found
    
    console.log(`No geocoding result found, using ${targetCity} fallback coordinates`);
    return fallbackCoords;
  } catch (error) {
    console.error('Error geocoding address:', error);
    
    // Get fallback coordinates for the specified city
    const fallbackCoords = CITY_FALLBACK_COORDINATES[targetCity as keyof typeof CITY_FALLBACK_COORDINATES] || 
                          CITY_FALLBACK_COORDINATES.chicago; // Default to Chicago if city not found
    
    console.log(`Error occurred during geocoding, using ${targetCity} fallback coordinates`);
    return fallbackCoords;
  }
}

// Mock zoning data to return when external API fails
const MOCK_ZONING_DATA = {
  downtown: {
    zoning_classification: 'DX-16',
    description: 'Downtown Mixed-Use District'
  },
  north: {
    zoning_classification: 'RT-4',
    description: 'Residential Two-Flat, Townhouse and Multi-Unit District'
  },
  south: {
    zoning_classification: 'RS-3',
    description: 'Residential Single-Unit District'
  },
  west: {
    zoning_classification: 'M1-2',
    description: 'Limited Manufacturing/Business Park District'
  },
  loop: {
    zoning_classification: 'DC-12',
    description: 'Downtown Core District'
  }
};

// City-specific zoning classifications and descriptions
const CITY_ZONING_DATA = {
  denver: {
    downtown: { zoning_classification: 'C-MX-8', description: 'Urban Center Mixed-Use 8' },
    commercial: { zoning_classification: 'C-MX-5', description: 'Urban Center Mixed-Use 5' },
    residential_high: { zoning_classification: 'G-MU-3', description: 'General Urban Medium Density 3' },
    residential_low: { zoning_classification: 'U-SU-C', description: 'Urban Single Unit C' },
    industrial: { zoning_classification: 'I-MX-3', description: 'Industrial Mixed-Use 3' }
  },
  charlotte: {
    downtown: { zoning_classification: 'UMUD', description: 'Uptown Mixed Use District' },
    commercial: { zoning_classification: 'MUDD', description: 'Mixed-Use Development District' },
    residential_high: { zoning_classification: 'R-8', description: 'Residential 8 units/acre' },
    residential_low: { zoning_classification: 'R-3', description: 'Residential 3 units/acre' },
    industrial: { zoning_classification: 'I-1', description: 'Light Industrial' }
  },
  raleigh: {
    downtown: { zoning_classification: 'DX-12', description: 'Downtown Mixed Use 12 Stories' },
    commercial: { zoning_classification: 'CX-4', description: 'Commercial Mixed Use 4 Stories' },
    residential_high: { zoning_classification: 'RX-4', description: 'Residential Mixed Use 4 Stories' },
    residential_low: { zoning_classification: 'R-4', description: 'Residential 4 units/acre' },
    industrial: { zoning_classification: 'IX-3', description: 'Industrial Mixed Use 3 Stories' }
  },
  nashville: {
    downtown: { zoning_classification: 'CF', description: 'Core Frame' },
    commercial: { zoning_classification: 'MUG', description: 'Mixed-Use General' },
    residential_high: { zoning_classification: 'RM20', description: 'Multi-Family 20 units/acre' },
    residential_low: { zoning_classification: 'RS5', description: 'Single-Family 5 units/acre' },
    industrial: { zoning_classification: 'IWD', description: 'Industrial Warehousing/Distribution' }
  }
};

// Function to fetch zoning data from appropriate city dataset
async function fetchZoningData(lat: number, lng: number, city?: string): Promise<ZoningData | null> {
  try {
    console.log(`Fetching zoning data for coordinates: ${lat}, ${lng} in city: ${city || 'unknown'}`);
    
    // Default to Chicago if no city specified
    const targetCity = (city || 'chicago').toLowerCase();
    
    // City-specific API calls
    if (targetCity === 'chicago') {
      // Try to get data from Chicago's dataset via Socrata Open Data API (SODA)
      const response = await axios.get(
        'https://data.cityofchicago.org/resource/nifi-zqag.json',
        {
          params: {
            $where: `within_circle(geometry, ${lat}, ${lng}, 100)`, // 100 meters radius
            $limit: 1
          }
        }
      );

      if (response.data && response.data.length > 0) {
        console.log(`Found Chicago zoning data: ${JSON.stringify(response.data[0])}`);
        return {
          zoning_classification: response.data[0].zoning_classification || 'Unknown',
          description: response.data[0].zone_class_description || undefined
        };
      }
    } else if (targetCity === 'denver') {
      // Would query Denver's zoning API in production
      console.log('Would query Denver Open Data Portal zoning API in production');
      
      // For prototype, use Denver mock zoning data
      return getMockZoningDataForCity(lat, lng, 'denver');
    } else if (targetCity === 'charlotte' || targetCity === 'raleigh' || targetCity === 'nashville') {
      // Would query respective city's zoning API in production
      console.log(`Would query ${targetCity.charAt(0).toUpperCase() + targetCity.slice(1)} Open Data Portal zoning API in production`);
      
      // For prototype, use city-specific mock zoning data
      return getMockZoningDataForCity(lat, lng, targetCity);
    }
    
    // If no data is returned or city not supported, use mock data based on location
    console.log('No zoning data found from API, using mock data');
    return getMockZoningDataForCity(lat, lng, targetCity);
  } catch (error) {
    console.error('Error fetching zoning data:', error);
    console.log('Error fetching zoning data, using mock data');
    return getMockZoningDataForCity(lat, lng, targetCity);
  }
}

// Helper function to get mock zoning data based on coordinates and city
function getMockZoningDataForCity(lat: number, lng: number, city?: string): ZoningData {
  // Default to Chicago if city not specified or not supported
  const targetCity = (city || 'chicago').toLowerCase();
  
  if (targetCity === 'chicago') {
    return getMockZoningData(lat, lng);
  }
  
  // For other cities, determine zone type based on coordinates
  // This is a simplification that approximates downtown usually being in center
  const cityCoords = CITY_FALLBACK_COORDINATES[targetCity as keyof typeof CITY_FALLBACK_COORDINATES];
  if (!cityCoords) {
    return getMockZoningData(lat, lng); // Default to Chicago zoning if city not found
  }
  
  // Calculate distance from city center
  const distance = Math.sqrt(
    Math.pow(lat - cityCoords.lat, 2) + 
    Math.pow(lng - cityCoords.lng, 2)
  );
  
  // Get zoning data for the target city
  const cityZoningData = CITY_ZONING_DATA[targetCity as keyof typeof CITY_ZONING_DATA];
  
  if (!cityZoningData) {
    return getMockZoningData(lat, lng); // Default to Chicago zoning if city data not found
  }
  
  // Determine zone type based on distance from center and angle
  if (distance < 0.01) {
    return cityZoningData.downtown;
  } else if (distance < 0.03) {
    return cityZoningData.commercial;
  } else if (distance < 0.05) {
    return cityZoningData.residential_high;
  } else if (distance < 0.08) {
    return cityZoningData.residential_low;
  } else {
    return cityZoningData.industrial;
  }
}

// Helper function to get mock zoning data based on coordinates
function getMockZoningData(lat: number, lng: number): ZoningData {
  // Calculate rough area of Chicago based on coordinates
  const isDowntown = lat > 41.87 && lat < 41.89 && lng > -87.64 && lng < -87.62;
  const isNorth = lat > 41.90;
  const isSouth = lat < 41.85;
  const isWest = lng < -87.65;
  
  if (isDowntown) return MOCK_ZONING_DATA.downtown;
  if (isNorth) return MOCK_ZONING_DATA.north;
  if (isSouth) return MOCK_ZONING_DATA.south;
  if (isWest) return MOCK_ZONING_DATA.west;
  
  return MOCK_ZONING_DATA.loop;
}

// Mock parcel data for when external API fails
function generateMockParcelData(lat: number, lng: number, city?: string): ParcelData {
  // Create somewhat realistic PIN based on coordinates
  const latPart = Math.floor(lat * 100) % 100;
  const lngPart = Math.floor(Math.abs(lng) * 100) % 100;
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  // Adjust PIN format based on city
  let pin = `17${latPart}${lngPart}${random}0000`; // Chicago default
  
  // Cities with different PIN formats
  if (city?.toLowerCase() === 'denver') {
    // Denver uses 10-digit PINs with different format
    pin = `0${latPart}${lngPart}${random}000`;
  } else if (city?.toLowerCase() === 'charlotte' || city?.toLowerCase() === 'raleigh') {
    // NC cities use different format
    pin = `${latPart}${lngPart}${random}`;
  }
  
  // Determine property class based on mock zoning
  const zoningData = getMockZoningData(lat, lng);
  let propertyClass = '2-00'; // Default residential
  
  if (zoningData.zoning_classification.startsWith('D')) {
    propertyClass = '5-95'; // Commercial downtown
  } else if (zoningData.zoning_classification.startsWith('B')) {
    propertyClass = '5-91'; // Commercial
  } else if (zoningData.zoning_classification.startsWith('M')) {
    propertyClass = '5-97'; // Industrial
  } else if (zoningData.zoning_classification.startsWith('R')) {
    if (zoningData.zoning_classification.includes('T')) {
      propertyClass = '2-11'; // Multi-unit residential
    } else {
      propertyClass = '2-03'; // Single family
    }
  }
  
  // Calculate mock square footage
  const sqFt = Math.floor((Math.random() * 5000) + 1000);
  
  // Base parcel data
  const parcelData: ParcelData = {
    pin,
    property_class: propertyClass,
    square_footage: sqFt
  };
  
  // Add township name only for cities that use this concept
  // Chicago and some Illinois municipalities use townships
  if (!city || city.toLowerCase() === 'chicago') {
    parcelData.township_name = 'CHICAGO';
  } else if (city.toLowerCase() === 'denver') {
    // Denver doesn't use townships, but has assessor districts
    // Omit township_name completely
  } else if (city.toLowerCase() === 'nashville') {
    parcelData.township_name = 'DAVIDSON COUNTY';
  } else if (city.toLowerCase() === 'charlotte' || city.toLowerCase() === 'raleigh') {
    // NC cities use counties instead of townships
    parcelData.township_name = city.toLowerCase() === 'charlotte' ? 'MECKLENBURG COUNTY' : 'WAKE COUNTY';
  }
  
  return parcelData;
}

// Function to fetch parcel data from various city datasets
async function fetchParcelData(lat: number, lng: number, city?: string): Promise<ParcelData | null> {
  try {
    console.log(`Fetching parcel data for coordinates: ${lat}, ${lng} in city: ${city || 'unknown'}`);
    
    // Default to Chicago if no city specified
    const targetCity = (city || 'chicago').toLowerCase();
    
    // City-specific data sources
    if (targetCity === 'chicago') {
      // Try to query Cook County's parcel dataset
      const response = await axios.get(
        'https://datacatalog.cookcountyil.gov/resource/nj4t-kc8j.json',
        {
          params: {
            $where: `within_circle(location, ${lat}, ${lng}, 100)`, // 100 meters radius
            $limit: 1
          }
        }
      );

      if (response.data && response.data.length > 0) {
        console.log(`Found Chicago parcel data: ${JSON.stringify(response.data[0])}`);
        return {
          pin: response.data[0].pin14 || 'Unknown',
          property_class: response.data[0].class || 'Unknown',
          township_name: response.data[0].township_name || 'CHICAGO',
          square_footage: response.data[0].sqft ? Number(response.data[0].sqft) : undefined
        };
      }
    } else if (targetCity === 'denver') {
      // Denver Open Data Portal has different endpoints and data structure
      // This is a placeholder for real Denver API integration
      console.log('Would query Denver Open Data Portal in production');
      
      // For prototype, return mock data with Denver-specific structure
      return generateMockParcelData(lat, lng, 'denver');
    } else if (targetCity === 'charlotte' || targetCity === 'raleigh') {
      // NC cities have their own open data portals
      console.log(`Would query ${targetCity.charAt(0).toUpperCase() + targetCity.slice(1)} Open Data Portal in production`);
      
      // For prototype, return mock data with NC-specific structure
      return generateMockParcelData(lat, lng, targetCity);
    } else if (targetCity === 'nashville') {
      // Nashville has its own data portal
      console.log('Would query Nashville Open Data Portal in production');
      
      // For prototype, return mock data with Nashville-specific structure
      return generateMockParcelData(lat, lng, 'nashville');
    }
    
    // If no data is returned or city not supported, use mock data
    console.log('No parcel data found from API or city not supported, using mock data');
    return generateMockParcelData(lat, lng, city);
  } catch (error) {
    console.error('Error fetching parcel data:', error);
    console.log('Error fetching parcel data, using mock data');
    return generateMockParcelData(lat, lng, city);
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
  
  // Extract address and city from query parameters
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const city = searchParams.get('city') || 'chicago'; // Default to Chicago if not specified

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400, headers }
    );
  }

  try {
    console.log(`Processing zoning request for address: ${address} in city: ${city}`);
    
    // Step 1: Geocode the address with city context
    const coordinates = await geocodeAddress(address, city);
    console.log(`Geocoding result: ${JSON.stringify(coordinates)}`);
    
    // Step 2 & 3: Fetch zoning and parcel data in parallel with city context
    const [zoningData, parcelData] = await Promise.all([
      fetchZoningData(coordinates.lat, coordinates.lng, city),
      fetchParcelData(coordinates.lat, coordinates.lng, city)
    ]);

    // Determine appropriate database name based on city for error messages
    let zoningDatabase = 'Chicago zoning database';
    let parcelDatabase = 'Cook County parcel database';
    
    if (city?.toLowerCase() === 'denver') {
      zoningDatabase = 'Denver zoning database';
      parcelDatabase = 'Denver GIS database';
    } else if (city?.toLowerCase() === 'charlotte') {
      zoningDatabase = 'Charlotte zoning database';
      parcelDatabase = 'Mecklenburg County parcel database';
    } else if (city?.toLowerCase() === 'raleigh') {
      zoningDatabase = 'Raleigh zoning database';
      parcelDatabase = 'Wake County parcel database';
    } else if (city?.toLowerCase() === 'nashville') {
      zoningDatabase = 'Nashville zoning database';
      parcelDatabase = 'Davidson County parcel database';
    }

    // Step 4: Prepare the response
    const response = {
      coordinates,
      zoning: zoningData || { zoning_classification: `Not found in ${zoningDatabase}` },
      parcel: parcelData || { pin: `Not found in ${parcelDatabase}` },
      address_queried: address,
      city: city
    };

    console.log(`Sending response: ${JSON.stringify(response)}`);
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500, headers }
    );
  }
}