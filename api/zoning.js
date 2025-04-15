// Known addresses and their coordinates
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

// Chicago's center coordinates (fallback)
const CHICAGO_FALLBACK_COORDINATES = {
  lat: 41.8781,
  lng: -87.6298
};

// Mock zoning data for different areas of Chicago
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

// Get coordinates for an address
function geocodeAddress(address) {
  // Check if address contains any of our known landmarks
  for (const [landmark, coords] of Object.entries(KNOWN_ADDRESSES)) {
    if (address.toLowerCase().includes(landmark.toLowerCase())) {
      return coords;
    }
  }
  
  // If not found, return Chicago's center coordinates
  return CHICAGO_FALLBACK_COORDINATES;
}

// Get mock zoning data based on coordinates
function getMockZoningData(lat, lng) {
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

// Generate mock parcel data
function generateMockParcelData(lat, lng) {
  // Create somewhat realistic PIN based on coordinates
  const latPart = Math.floor(lat * 100) % 100;
  const lngPart = Math.floor(Math.abs(lng) * 100) % 100;
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  const pin = `17${latPart}${lngPart}${random}0000`;
  
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
  
  return {
    pin,
    property_class: propertyClass,
    township_name: 'CHICAGO',
    square_footage: sqFt
  };
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  // Get the address from query parameter
  const address = req.query.address;
  
  if (!address) {
    return res.status(400).json({ error: 'Address parameter is required' });
  }
  
  try {
    // Step 1: Geocode the address
    const coordinates = geocodeAddress(address);
    
    // Step 2: Generate zoning and parcel data
    const zoningData = getMockZoningData(coordinates.lat, coordinates.lng);
    const parcelData = generateMockParcelData(coordinates.lat, coordinates.lng);
    
    // Step 3: Create response
    const response = {
      coordinates,
      zoning: zoningData,
      parcel: parcelData,
      address_queried: address
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}