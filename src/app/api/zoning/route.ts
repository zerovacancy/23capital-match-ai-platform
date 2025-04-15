import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface GeocodingResult {
  lat: number;
  lng: number;
  resolvedCity?: string;
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
    
    // Format the address query with more specific parameters for better accuracy
    const cityToInclude = targetCity.charAt(0).toUpperCase() + targetCity.slice(1);
    let stateCode = '';
    
    // Add appropriate state code based on city
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
        stateCode = 'IL'; // Default to Illinois if unknown city
    }
    
    // Create a more structured address query with city and state
    const encodedAddress = encodeURIComponent(`${address}, ${cityToInclude}, ${stateCode}, USA`);
    console.log(`Encoded address for OSM: ${encodedAddress}`);
    
    // Use structured addressing for better results with countrycodes parameter
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&countrycodes=us`,
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
      
      // Extract the resolved city from the display name
      const displayNameParts = location.display_name.split(',').map((part: string) => part.trim());
      let resolvedCity = null;
      
      // Try to find the city in the display name
      // Nominatim typically returns a comma-separated string like: "Address, City, County, State, Country"
      if (displayNameParts.length >= 3) {
        // The city is usually the 2nd or 3rd part
        const potentialCities = [displayNameParts[1], displayNameParts[2]];
        
        // Try to match with expected city
        for (const potentialCity of potentialCities) {
          // Clean up the city name for better matching
          const cleanPotentialCity = potentialCity.toLowerCase().replace(/\s+/g, '');
          
          // Check for city name in potentialCity
          if (cleanPotentialCity.includes(targetCity.replace(/\s+/g, ''))) {
            resolvedCity = potentialCity;
            break;
          }
          
          // Check for common variations
          if (targetCity === 'chicago' && cleanPotentialCity === 'cook') {
            resolvedCity = 'Chicago';
            break;
          } else if (targetCity === 'denver' && cleanPotentialCity === 'denvercounty') {
            resolvedCity = 'Denver';
            break;
          } else if ((targetCity === 'charlotte' || targetCity === 'raleigh') && 
                    (cleanPotentialCity.includes('mecklenburg') || cleanPotentialCity.includes('wake'))) {
            resolvedCity = targetCity === 'charlotte' ? 'Charlotte' : 'Raleigh';
            break;
          } else if (targetCity === 'nashville' && cleanPotentialCity.includes('davidson')) {
            resolvedCity = 'Nashville';
            break;
          }
        }
      }
      
      console.log(`Resolved city from geocoding: ${resolvedCity || 'unknown'}`);
      
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
        resolvedCity
      };
    }
    
    // Try with a more structured query format as a fallback
    const structuredResponse = await axios.get(
      'https://nominatim.openstreetmap.org/search', 
      {
        params: {
          street: address,
          city: cityToInclude,
          state: stateCode,
          country: 'USA',
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'capital-match-ai-platform'
        }
      }
    );
    
    if (structuredResponse.data && structuredResponse.data.length > 0) {
      const location = structuredResponse.data[0];
      console.log(`OSM structured geocoding result: ${JSON.stringify(location)}`);
      
      // Extract the resolved city from the display name
      const displayNameParts = location.display_name.split(',').map((part: string) => part.trim());
      let resolvedCity = null;
      
      // Try to find the city in the display name
      if (displayNameParts.length >= 3) {
        // The city is usually the 2nd or 3rd part
        const potentialCities = [displayNameParts[1], displayNameParts[2]];
        
        // Try to match with expected city
        for (const potentialCity of potentialCities) {
          // Clean up the city name for better matching
          const cleanPotentialCity = potentialCity.toLowerCase().replace(/\s+/g, '');
          
          // Check for city name in potentialCity
          if (cleanPotentialCity.includes(targetCity.replace(/\s+/g, ''))) {
            resolvedCity = potentialCity;
            break;
          }
          
          // Check for common variations
          if (targetCity === 'chicago' && cleanPotentialCity === 'cook') {
            resolvedCity = 'Chicago';
            break;
          } else if (targetCity === 'denver' && cleanPotentialCity === 'denvercounty') {
            resolvedCity = 'Denver';
            break;
          } else if ((targetCity === 'charlotte' || targetCity === 'raleigh') && 
                    (cleanPotentialCity.includes('mecklenburg') || cleanPotentialCity.includes('wake'))) {
            resolvedCity = targetCity === 'charlotte' ? 'Charlotte' : 'Raleigh';
            break;
          } else if (targetCity === 'nashville' && cleanPotentialCity.includes('davidson')) {
            resolvedCity = 'Nashville';
            break;
          }
        }
      }
      
      console.log(`Resolved city from structured geocoding: ${resolvedCity || 'unknown'}`);
      
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
        resolvedCity
      };
    }
    
    // Don't fall back to city center coordinates - instead return null to indicate geocoding failure
    console.log(`No geocoding result found, returning null instead of fallback coordinates`);
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    
    // Don't fall back to city center coordinates when geocoding fails
    console.log(`Error occurred during geocoding, returning null instead of fallback coordinates`);
    return null;
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
    
    // City-specific API calls using Socrata Open Data API (SODA)
    if (targetCity === 'chicago') {
      console.log(`Fetching Chicago zoning data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Chicago's Socrata Open Data API (SODA)
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
          console.log(`Found Chicago zoning data from primary API: ${JSON.stringify(response.data[0])}`);
          return {
            zoning_classification: response.data[0].zoning_classification || 'Unknown',
            description: response.data[0].zone_class_description || undefined
          };
        } else {
          console.log('No results from primary Chicago zoning API, trying backup endpoint');
          
          // BACKUP: Chicago ArcGIS zoning layer
          try {
            const arcgisResponse = await axios.get(
              'https://mapserver.chicago.gov/arcgis/rest/services/ExternalApps/ZoningMapService/MapServer/0/query',
              {
                params: {
                  where: '1=1',
                  outFields: 'ZONE_CLASS,ZONE_TYPE,ZONE_DESCR',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  returnGeometry: false,
                  f: 'json'
                }
              }
            );
            
            if (arcgisResponse.data && 
                arcgisResponse.data.features && 
                arcgisResponse.data.features.length > 0) {
              const feature = arcgisResponse.data.features[0].attributes;
              console.log(`Found Chicago zoning from ArcGIS: ${JSON.stringify(feature)}`);
              return {
                zoning_classification: feature.ZONE_CLASS || 'Unknown',
                description: feature.ZONE_DESCR || feature.ZONE_TYPE || undefined
              };
            }
          } catch (backupError) {
            console.error('Error with Chicago ArcGIS API:', backupError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Chicago zoning API: ${e.message}`);
      }
      
      console.log('All Chicago zoning API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'denver') {
      console.log(`Fetching Denver zoning data for: ${lat}, ${lng}`);
      try {
        // DIRECT CONNECTION TO DENVER'S ARCGIS ZONING API
        // This is the OFFICIAL Denver zoning API using their ArcGIS REST services
        const response = await axios.get(
          'https://services3.arcgis.com/KjLm5iMQOAYyOJs4/arcgis/rest/services/PLAN_ZONING_DISTRICTS/FeatureServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'ZONE_DISTRICT,OVERLAY_DIST,NAME,DESCRIPTION',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Denver zoning from Denver ArcGIS: ${JSON.stringify(feature)}`);
          return {
            zoning_classification: feature.ZONE_DISTRICT || 'Unknown',
            description: feature.DESCRIPTION || feature.NAME || undefined,
            overlay_district: feature.OVERLAY_DIST || undefined
          };
        } else {
          console.log('No results from primary Denver ArcGIS, trying backup endpoint');
          
          // Backup: Try Denver Open Data Portal
          try {
            const socResponse = await axios.get(
              'https://opendata.arcgis.com/datasets/955e7a0f8bbc4f2b9610f5e3c4632db2_0.geojson',
              {
                params: {
                  where: '1=1',
                  outFields: '*',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  f: 'json'
                }
              }
            );
            
            if (socResponse.data && 
                socResponse.data.features && 
                socResponse.data.features.length > 0) {
              const feature = socResponse.data.features[0].properties;
              console.log(`Found Denver zoning from Open Data: ${JSON.stringify(feature)}`);
              return {
                zoning_classification: feature.ZONE_DISTRICT || feature.zoning_district || 'Unknown',
                description: feature.DESCRIPTION || feature.description || undefined
              };
            }
          } catch (backupError) {
            console.error('Error with Denver OpenData API:', backupError.message);
          }
          
          // Last resort fallback - Denver's legacy Socrata API
          try {
            const legacyResponse = await axios.get(
              'https://data.denvergov.org/resource/9zfh-sxx4.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`,
                  $limit: 1
                }
              }
            );
            
            if (legacyResponse.data && legacyResponse.data.length > 0) {
              console.log(`Found Denver zoning from legacy API: ${JSON.stringify(legacyResponse.data[0])}`);
              return {
                zoning_classification: legacyResponse.data[0].zone_district || 'Unknown',
                description: legacyResponse.data[0].description || undefined
              };
            }
          } catch (legacyError) {
            console.error('Error with Denver legacy API:', legacyError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Denver zoning APIs: ${e.message}`);
      }
      
      console.log('All Denver zoning API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'charlotte') {
      console.log(`Fetching Charlotte zoning data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Charlotte's ArcGIS REST API for zoning
        const response = await axios.get(
          'https://maps.mecklenburgcountync.gov/api/services/lni/CityZoning/MapServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'ZONING,ZONING_DESCRIPTION',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Charlotte zoning from ArcGIS: ${JSON.stringify(feature)}`);
          return {
            zoning_classification: feature.ZONING || 'Unknown',
            description: feature.ZONING_DESCRIPTION || undefined
          };
        } else {
          console.log('No results from Charlotte ArcGIS, trying Socrata API');
          
          // BACKUP: Charlotte's Socrata Open Data API
          try {
            const socResponse = await axios.get(
              'https://data.charlottenc.gov/resource/dqf5-yhfm.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`, // 100 meters radius
                  $limit: 1
                }
              }
            );

            if (socResponse.data && socResponse.data.length > 0) {
              console.log(`Found Charlotte zoning from Socrata: ${JSON.stringify(socResponse.data[0])}`);
              return {
                zoning_classification: socResponse.data[0].zoning_type || 'Unknown',
                description: socResponse.data[0].zoning_description || undefined
              };
            }
          } catch (socError) {
            console.error('Error with Charlotte Socrata API:', socError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Charlotte zoning API: ${e.message}`);
      }
      
      console.log('All Charlotte zoning API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'raleigh') {
      console.log(`Fetching Raleigh zoning data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Raleigh's ArcGIS REST API for zoning
        const response = await axios.get(
          'https://maps.raleighnc.gov/arcgis/rest/services/Planning/Zoning/MapServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'ZONE_TYPE,SHORT_NAME,ZONE_STATUS',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint', 
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Raleigh zoning from ArcGIS: ${JSON.stringify(feature)}`);
          return {
            zoning_classification: feature.SHORT_NAME || feature.ZONE_TYPE || 'Unknown',
            description: feature.ZONE_TYPE || undefined,
            status: feature.ZONE_STATUS || undefined
          };
        } else {
          console.log('No results from Raleigh ArcGIS, trying Socrata API');
          
          // BACKUP: Raleigh's Socrata Open Data API
          try {
            const socResponse = await axios.get(
              'https://data.raleighnc.gov/resource/v8b7-rwkf.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`, // 100 meters radius
                  $limit: 1
                }
              }
            );

            if (socResponse.data && socResponse.data.length > 0) {
              console.log(`Found Raleigh zoning from Socrata: ${JSON.stringify(socResponse.data[0])}`);
              return {
                zoning_classification: socResponse.data[0].zone_code || 'Unknown',
                description: socResponse.data[0].zone_description || undefined
              };
            }
          } catch (socError) {
            console.error('Error with Raleigh Socrata API:', socError.message);
          }
          
          // BACKUP 2: Wake County GIS for Raleigh
          try {
            const wakeResponse = await axios.get(
              'https://maps.wakegov.com/arcgis/rest/services/Property/Cadastral/MapServer/6/query',
              {
                params: {
                  where: '1=1',
                  outFields: 'ZONING,ZONE_CODE,JURISDICTION',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  returnGeometry: false,
                  f: 'json'
                }
              }
            );
            
            if (wakeResponse.data && 
                wakeResponse.data.features && 
                wakeResponse.data.features.length > 0) {
              const feature = wakeResponse.data.features[0].attributes;
              console.log(`Found Raleigh zoning from Wake County: ${JSON.stringify(feature)}`);
              return {
                zoning_classification: feature.ZONE_CODE || feature.ZONING || 'Unknown',
                description: feature.ZONING || undefined,
                jurisdiction: feature.JURISDICTION || 'Raleigh'
              };
            }
          } catch (wakeError) {
            console.error('Error with Wake County API:', wakeError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Raleigh zoning API: ${e.message}`);
      }
      
      console.log('All Raleigh zoning API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'nashville') {
      console.log(`Fetching Nashville zoning data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Nashville's ArcGIS REST API for zoning
        const response = await axios.get(
          'https://maps.nashville.gov/arcgis/rest/services/Planning/Zoning/MapServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'ZONE_CODE,ZONE_DESC,ZONE_TYPE',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Nashville zoning from ArcGIS: ${JSON.stringify(feature)}`);
          return {
            zoning_classification: feature.ZONE_CODE || 'Unknown',
            description: feature.ZONE_DESC || feature.ZONE_TYPE || undefined
          };
        } else {
          console.log('No results from Nashville ArcGIS, trying Metro Open Data Portal');
          
          // BACKUP: Nashville's Socrata Open Data API
          try {
            const socResponse = await axios.get(
              'https://data.nashville.gov/resource/xakp-ess3.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`, // 100 meters radius
                  $limit: 1
                }
              }
            );

            if (socResponse.data && socResponse.data.length > 0) {
              console.log(`Found Nashville zoning from Socrata: ${JSON.stringify(socResponse.data[0])}`);
              return {
                zoning_classification: socResponse.data[0].zone_code || 'Unknown',
                description: socResponse.data[0].zone_desc || undefined
              };
            }
          } catch (socError) {
            console.error('Error with Nashville Socrata API:', socError.message);
          }
          
          // BACKUP 2: Davidson County Property Assessor
          try {
            const assessorResponse = await axios.get(
              'https://maps.nashville.gov/arcgis/rest/services/Assessor/Property_Assessor/MapServer/0/query',
              {
                params: {
                  where: '1=1',
                  outFields: 'ZONE,PROPERTY_DESCRIPTION,LANDUSE_CATEGORY',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  returnGeometry: false,
                  f: 'json'
                }
              }
            );
            
            if (assessorResponse.data && 
                assessorResponse.data.features && 
                assessorResponse.data.features.length > 0) {
              const feature = assessorResponse.data.features[0].attributes;
              console.log(`Found Nashville zoning from Assessor: ${JSON.stringify(feature)}`);
              return {
                zoning_classification: feature.ZONE || 'Unknown',
                description: feature.PROPERTY_DESCRIPTION || feature.LANDUSE_CATEGORY || undefined
              };
            }
          } catch (assessorError) {
            console.error('Error with Nashville Assessor API:', assessorError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Nashville zoning API: ${e.message}`);
      }
      
      console.log('All Nashville zoning API endpoints failed, returning null');
      return null;
    }
    
    // If no data is returned or city not supported, return null instead of using mock data
    console.log('No zoning data found from API, returning null');
    return null;
  } catch (error) {
    console.error('Error fetching zoning data:', error);
    console.log('Error fetching zoning data, returning null');
    return null;
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
  
  // Determine property class based on appropriate city's mock zoning
  let propertyClass = '2-00'; // Default residential
  
  if (city?.toLowerCase() === 'denver') {
    // Denver-specific property classes
    const denverZoning = getMockZoningDataForCity(lat, lng, 'denver');
    if (denverZoning.zoning_classification.startsWith('C-MX')) {
      propertyClass = 'COM-MX'; // Commercial mixed-use
    } else if (denverZoning.zoning_classification.startsWith('I-')) {
      propertyClass = 'IND'; // Industrial
    } else if (denverZoning.zoning_classification.startsWith('G-MU')) {
      propertyClass = 'RES-MU'; // Residential mixed-use
    } else if (denverZoning.zoning_classification.startsWith('U-SU')) {
      propertyClass = 'RES-SU'; // Residential single-unit
    }
  } else if (city?.toLowerCase() === 'charlotte' || city?.toLowerCase() === 'raleigh' || 
             city?.toLowerCase() === 'nashville') {
    // Use city-specific zoning patterns for other cities
    const cityZoning = getMockZoningDataForCity(lat, lng, city);
    if (cityZoning.zoning_classification.includes('MU') || 
        cityZoning.zoning_classification.includes('MX')) {
      propertyClass = 'MXD'; // Mixed-use
    } else if (cityZoning.zoning_classification.includes('IND') || 
              cityZoning.zoning_classification.includes('I-')) {
      propertyClass = 'IND'; // Industrial
    } else if (cityZoning.zoning_classification.includes('RES') || 
              cityZoning.zoning_classification.startsWith('R')) {
      propertyClass = 'RES'; // Residential
    } else {
      propertyClass = 'COM'; // Commercial (default for urban zoning)
    }
  } else {
    // Chicago-style property classes (default)
    const chicagoZoning = getMockZoningData(lat, lng);
    if (chicagoZoning.zoning_classification.startsWith('D')) {
      propertyClass = '5-95'; // Commercial downtown
    } else if (chicagoZoning.zoning_classification.startsWith('B')) {
      propertyClass = '5-91'; // Commercial
    } else if (chicagoZoning.zoning_classification.startsWith('M')) {
      propertyClass = '5-97'; // Industrial
    } else if (chicagoZoning.zoning_classification.startsWith('R')) {
      if (chicagoZoning.zoning_classification.includes('T')) {
        propertyClass = '2-11'; // Multi-unit residential
      } else {
        propertyClass = '2-03'; // Single family
      }
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
    parcelData.township_name = 'DENVER COUNTY'; // Add proper county name instead of omitting
  } else if (city.toLowerCase() === 'nashville') {
    parcelData.township_name = 'DAVIDSON COUNTY';
  } else if (city.toLowerCase() === 'charlotte' || city.toLowerCase() === 'raleigh') {
    // NC cities use counties instead of townships
    parcelData.township_name = city.toLowerCase() === 'charlotte' ? 'MECKLENBURG COUNTY' : 'WAKE COUNTY';
  }
  
  return parcelData;
}

// Function to validate coordinates for a given city
function validateCoordinatesForCity(lat: number, lng: number, city: string): boolean {
  // Basic bounding boxes for cities to catch obvious mismatches
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
  
  const bounds = cityBounds[city.toLowerCase() as keyof typeof cityBounds];
  
  if (!bounds) {
    console.warn(`No bounding box defined for city: ${city}`);
    return false;
  }
  
  const isInBounds = 
    lat >= bounds.minLat && 
    lat <= bounds.maxLat && 
    lng >= bounds.minLng && 
    lng <= bounds.maxLng;
  
  console.log(`Coordinate validation for ${city}: ${isInBounds} (${lat}, ${lng})`);
  
  return isInBounds;
}

// Function to fetch parcel data from various city datasets
async function fetchParcelData(lat: number, lng: number, city?: string): Promise<ParcelData | null> {
  try {
    console.log(`Fetching parcel data for coordinates: ${lat}, ${lng} in city: ${city || 'unknown'}`);
    
    // Default to Chicago if no city specified
    const targetCity = (city || 'chicago').toLowerCase();
    
    // City-specific data sources using Socrata Open Data API (SODA)
    if (targetCity === 'chicago') {
      console.log(`Fetching Chicago parcel data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Cook County's parcel dataset via Socrata
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
          console.log(`Found Chicago parcel data from Cook County: ${JSON.stringify(response.data[0])}`);
          return {
            pin: response.data[0].pin14 || 'Unknown',
            property_class: response.data[0].class || 'Unknown',
            township_name: response.data[0].township_name || 'CHICAGO',
            square_footage: response.data[0].sqft ? Number(response.data[0].sqft) : undefined
          };
        } else {
          console.log('No results from Cook County API, trying Chicago Assessor');
          
          // BACKUP: Chicago Assessor's API
          try {
            const assessorResponse = await axios.get(
              'https://server1.cookcountyassessor.com/ArcGIS/rest/services/S4/MapServer/0/query',
              {
                params: {
                  where: '1=1',
                  outFields: 'PIN,PROPERTY_CLASS,TOWNSHIP,SQFT',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  returnGeometry: false,
                  f: 'json'
                }
              }
            );
            
            if (assessorResponse.data && 
                assessorResponse.data.features && 
                assessorResponse.data.features.length > 0) {
              const feature = assessorResponse.data.features[0].attributes;
              console.log(`Found Chicago parcel from Assessor: ${JSON.stringify(feature)}`);
              return {
                pin: feature.PIN || 'Unknown',
                property_class: feature.PROPERTY_CLASS || 'Unknown',
                township_name: feature.TOWNSHIP || 'CHICAGO',
                square_footage: feature.SQFT ? Number(feature.SQFT) : undefined
              };
            }
          } catch (assessorError) {
            console.error('Error with Chicago Assessor API:', assessorError.message);
          }
          
          // BACKUP 2: Chicago Data Portal Parcels
          try {
            const cdpResponse = await axios.get(
              'https://data.cityofchicago.org/resource/aksk-kvfp.json',
              {
                params: {
                  $where: `within_circle(centroid, ${lat}, ${lng}, 100)`,
                  $limit: 1
                }
              }
            );
            
            if (cdpResponse.data && cdpResponse.data.length > 0) {
              console.log(`Found Chicago parcel from City Data Portal: ${JSON.stringify(cdpResponse.data[0])}`);
              return {
                pin: cdpResponse.data[0].pin || 'Unknown',
                property_class: cdpResponse.data[0].zoning || 'Unknown',
                township_name: 'CHICAGO',
                square_footage: cdpResponse.data[0].shape_area ? Number(cdpResponse.data[0].shape_area) : undefined
              };
            }
          } catch (cdpError) {
            console.error('Error with Chicago Data Portal API:', cdpError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Chicago parcel API: ${e.message}`);
      }
      
      console.log('All Chicago parcel API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'denver') {
      console.log(`Fetching Denver parcel data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Denver's OFFICIAL ArcGIS Parcel API endpoint
        const response = await axios.get(
          'https://services3.arcgis.com/KjLm5iMQOAYyOJs4/arcgis/rest/services/PARCELS/FeatureServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'SCHEDNUM,PARCELSQFT,PROPERTYADDRESS,STRUCTURESQFT,TAX_DISTRICT,PARCEL_TYPE,LANDUSE',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Denver parcel from Denver ArcGIS: ${JSON.stringify(feature)}`);
          return {
            pin: feature.SCHEDNUM || 'Unknown',
            property_class: feature.LANDUSE || feature.PARCEL_TYPE || 'Unknown',
            township_name: 'DENVER COUNTY',
            square_footage: feature.PARCELSQFT ? Number(feature.PARCELSQFT) : undefined,
            address: feature.PROPERTYADDRESS || undefined
          };
        } else {
          console.log('No results from Denver ArcGIS parcels, trying Property Assessment API');
          
          // BACKUP 1: Denver's Property Assessment API
          try {
            const assessorResponse = await axios.get(
              'https://services3.arcgis.com/KjLm5iMQOAYyOJs4/arcgis/rest/services/REAL_PROPERTY/FeatureServer/0/query',
              {
                params: {
                  where: '1=1',
                  outFields: 'SCHEDULE_NUMBER,TAX_DISTRICT,SHAPE_AREA,NEIGHBORHOOD_NAME,PROPERTY_CLASS',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  returnGeometry: false,
                  f: 'json'
                }
              }
            );
            
            if (assessorResponse.data && 
                assessorResponse.data.features && 
                assessorResponse.data.features.length > 0) {
              const feature = assessorResponse.data.features[0].attributes;
              console.log(`Found Denver parcel from Assessor API: ${JSON.stringify(feature)}`);
              return {
                pin: feature.SCHEDULE_NUMBER || 'Unknown',
                property_class: feature.PROPERTY_CLASS || 'Unknown',
                township_name: feature.TAX_DISTRICT || 'DENVER COUNTY',
                square_footage: feature.SHAPE_AREA ? Number(feature.SHAPE_AREA) : undefined,
                neighborhood: feature.NEIGHBORHOOD_NAME || undefined
              };
            }
          } catch (assessorError) {
            console.error('Error with Denver Assessor API:', assessorError.message);
          }
          
          // BACKUP 2: Legacy Socrata API
          try {
            const legacyResponse = await axios.get(
              'https://data.denvergov.org/resource/3yhk-fdih.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`,
                  $limit: 1
                }
              }
            );
            
            if (legacyResponse.data && legacyResponse.data.length > 0) {
              console.log(`Found Denver parcel from legacy API: ${JSON.stringify(legacyResponse.data[0])}`);
              return {
                pin: legacyResponse.data[0].schednum || 'Unknown',
                property_class: legacyResponse.data[0].landuse || 'Unknown',
                township_name: 'DENVER COUNTY',
                square_footage: legacyResponse.data[0].land_area ? Number(legacyResponse.data[0].land_area) : undefined
              };
            }
          } catch (legacyError) {
            console.error('Error with Denver legacy parcel API:', legacyError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Denver primary parcel API: ${e.message}`);
      }
      
      console.log('All Denver parcel API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'charlotte') {
      console.log(`Fetching Charlotte parcel data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Mecklenburg County GIS REST API
        const response = await axios.get(
          'https://maps.mecklenburgcountync.gov/api/services/lni/TaxParcel/MapServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'TAXPARCEL_ID,LAND_CLASS,ACREAGE,LANDUSE',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Charlotte parcel from Mecklenburg GIS: ${JSON.stringify(feature)}`);
          return {
            pin: feature.TAXPARCEL_ID || 'Unknown',
            property_class: feature.LAND_CLASS || feature.LANDUSE || 'Unknown',
            township_name: 'MECKLENBURG COUNTY',
            square_footage: feature.ACREAGE ? Number(feature.ACREAGE) * 43560 : undefined // Convert acres to sq ft
          };
        } else {
          console.log('No results from Mecklenburg County API, trying Charlotte Open Data');
          
          // BACKUP: Charlotte's Open Data Portal
          try {
            const openDataResponse = await axios.get(
              'https://data.charlottenc.gov/resource/3ua2-8ms2.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`, // 100 meters radius
                  $limit: 1
                }
              }
            );

            if (openDataResponse.data && openDataResponse.data.length > 0) {
              console.log(`Found Charlotte parcel from Open Data: ${JSON.stringify(openDataResponse.data[0])}`);
              return {
                pin: openDataResponse.data[0].parcel_id || 'Unknown',
                property_class: openDataResponse.data[0].land_use || 'Unknown',
                township_name: 'MECKLENBURG COUNTY',
                square_footage: openDataResponse.data[0].land_area ? Number(openDataResponse.data[0].land_area) : undefined
              };
            }
          } catch (openDataError) {
            console.error('Error with Charlotte Open Data API:', openDataError.message);
          }
          
          // BACKUP 2: Mecklenburg County Tax API
          try {
            const taxResponse = await axios.get(
              'https://api.mecklenburgcountync.gov/rest/tax/property/location',
              {
                params: {
                  latitude: lat,
                  longitude: lng
                },
                headers: {
                  'Accept': 'application/json'
                }
              }
            );
            
            if (taxResponse.data && taxResponse.data.property) {
              console.log(`Found Charlotte parcel from Tax API: ${JSON.stringify(taxResponse.data.property)}`);
              return {
                pin: taxResponse.data.property.parcelID || 'Unknown',
                property_class: taxResponse.data.property.useDescription || 'Unknown',
                township_name: 'MECKLENBURG COUNTY',
                square_footage: taxResponse.data.property.landArea || undefined
              };
            }
          } catch (taxError) {
            console.error('Error with Mecklenburg Tax API:', taxError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Charlotte parcel API: ${e.message}`);
      }
      
      console.log('All Charlotte parcel API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'raleigh') {
      console.log(`Fetching Raleigh parcel data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Wake County GIS REST API
        const response = await axios.get(
          'https://maps.wakegov.com/arcgis/rest/services/Property/Cadastral/MapServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'OBJECTID,PIN_NUM,OWNER,ADDR1,ACREAGE,LAND_VAL,LANDUSE_DESC',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Raleigh parcel from Wake GIS: ${JSON.stringify(feature)}`);
          return {
            pin: feature.PIN_NUM || 'Unknown',
            property_class: feature.LANDUSE_DESC || 'Unknown',
            township_name: 'WAKE COUNTY',
            square_footage: feature.ACREAGE ? Number(feature.ACREAGE) * 43560 : undefined, // Convert acres to sq ft
            address: feature.ADDR1 || undefined
          };
        } else {
          console.log('No results from Wake County API, trying Raleigh Open Data');
          
          // BACKUP: Raleigh's Open Data Portal
          try {
            const openDataResponse = await axios.get(
              'https://data.raleighnc.gov/resource/cy7a-m4ux.json',
              {
                params: {
                  $where: `within_circle(geolocation, ${lat}, ${lng}, 100)`, // 100 meters radius
                  $limit: 1
                }
              }
            );

            if (openDataResponse.data && openDataResponse.data.length > 0) {
              console.log(`Found Raleigh parcel from Open Data: ${JSON.stringify(openDataResponse.data[0])}`);
              return {
                pin: openDataResponse.data[0].pin_num || 'Unknown',
                property_class: openDataResponse.data[0].property_use || 'Unknown',
                township_name: 'WAKE COUNTY',
                square_footage: openDataResponse.data[0].acreage ? Number(openDataResponse.data[0].acreage) * 43560 : undefined
              };
            }
          } catch (openDataError) {
            console.error('Error with Raleigh Open Data API:', openDataError.message);
          }
          
          // BACKUP 2: Wake County Real Estate API
          try {
            const realEstateResponse = await axios.get(
              'https://services.wakegov.com/realestate/Account.asp',
              {
                params: {
                  id: 'GISSearch',
                  stype: 'addr',
                  stval: `${lat},${lng}`,
                  loctype: 'latlong',
                  spg: 1,
                  ref: 0
                }
              }
            );
            
            // Wake County Real Estate returns HTML, parse for PIN and other data
            if (realEstateResponse.data && typeof realEstateResponse.data === 'string') {
              const pinMatch = realEstateResponse.data.match(/PIN:\s*(\d+)/);
              const areaMatch = realEstateResponse.data.match(/Acres:\s*([\d\.]+)/);
              
              if (pinMatch && pinMatch[1]) {
                console.log(`Found Raleigh parcel from Wake Real Estate Search (PIN: ${pinMatch[1]})`);
                return {
                  pin: pinMatch[1],
                  property_class: 'Unknown',
                  township_name: 'WAKE COUNTY',
                  square_footage: areaMatch && areaMatch[1] ? Number(areaMatch[1]) * 43560 : undefined
                };
              }
            }
          } catch (realEstateError) {
            console.error('Error with Wake County Real Estate API:', realEstateError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Raleigh parcel API: ${e.message}`);
      }
      
      console.log('All Raleigh parcel API endpoints failed, returning null');
      return null;
    } else if (targetCity === 'nashville') {
      console.log(`Fetching Nashville parcel data for: ${lat}, ${lng}`);
      try {
        // PRIMARY: Nashville's Property Assessor REST API
        const response = await axios.get(
          'https://maps.nashville.gov/arcgis/rest/services/Assessor/Property_Assessor/MapServer/0/query',
          {
            params: {
              where: '1=1',
              outFields: 'PARCELID,LAND_SQFT,LANDUSE,PROPERTYADDRESS,OLAND,LANDUSE_CATEGORY',
              geometry: `${lng},${lat}`,
              geometryType: 'esriGeometryPoint',
              inSR: 4326,
              spatialRel: 'esriSpatialRelIntersects',
              returnGeometry: false,
              f: 'json'
            }
          }
        );

        if (response.data && 
            response.data.features && 
            response.data.features.length > 0) {
          const feature = response.data.features[0].attributes;
          console.log(`Found Nashville parcel from Property Assessor: ${JSON.stringify(feature)}`);
          return {
            pin: feature.PARCELID || 'Unknown',
            property_class: feature.LANDUSE || feature.LANDUSE_CATEGORY || 'Unknown',
            township_name: 'DAVIDSON COUNTY',
            square_footage: feature.LAND_SQFT ? Number(feature.LAND_SQFT) : undefined,
            address: feature.PROPERTYADDRESS || undefined
          };
        } else {
          console.log('No results from Nashville Assessor API, trying Open Data Portal');
          
          // BACKUP: Nashville's Open Data Portal
          try {
            const openDataResponse = await axios.get(
              'https://data.nashville.gov/resource/j7nq-7ct5.json',
              {
                params: {
                  $where: `within_circle(shape, ${lat}, ${lng}, 100)`, // 100 meters radius
                  $limit: 1
                }
              }
            );

            if (openDataResponse.data && openDataResponse.data.length > 0) {
              console.log(`Found Nashville parcel from Open Data: ${JSON.stringify(openDataResponse.data[0])}`);
              return {
                pin: openDataResponse.data[0].parcel_id || 'Unknown',
                property_class: openDataResponse.data[0].land_use || 'Unknown',
                township_name: 'DAVIDSON COUNTY',
                square_footage: openDataResponse.data[0].acres ? Number(openDataResponse.data[0].acres) * 43560 : undefined
              };
            }
          } catch (openDataError) {
            console.error('Error with Nashville Open Data API:', openDataError.message);
          }
          
          // BACKUP 2: Nashville Metro GIS Parcels
          try {
            const gisResponse = await axios.get(
              'https://maps.nashville.gov/arcgis/rest/services/Metro/PROPERTY/MapServer/0/query',
              {
                params: {
                  where: '1=1',
                  outFields: 'PARCEL_ID,ACREAGE,GRANTEE',
                  geometry: `${lng},${lat}`,
                  geometryType: 'esriGeometryPoint',
                  inSR: 4326,
                  spatialRel: 'esriSpatialRelIntersects',
                  returnGeometry: false,
                  f: 'json'
                }
              }
            );
            
            if (gisResponse.data && 
                gisResponse.data.features && 
                gisResponse.data.features.length > 0) {
              const feature = gisResponse.data.features[0].attributes;
              console.log(`Found Nashville parcel from Metro GIS: ${JSON.stringify(feature)}`);
              return {
                pin: feature.PARCEL_ID || 'Unknown',
                property_class: 'Unknown', // Metro GIS doesn't provide property class
                township_name: 'DAVIDSON COUNTY',
                square_footage: feature.ACREAGE ? Number(feature.ACREAGE) * 43560 : undefined,
                owner: feature.GRANTEE || undefined
              };
            }
          } catch (gisError) {
            console.error('Error with Nashville Metro GIS API:', gisError.message);
          }
        }
      } catch (e) {
        console.error(`Error fetching from Nashville parcel API: ${e.message}`);
      }
      
      console.log('All Nashville parcel API endpoints failed, returning null');
      return null;
    }
    
    // If we're dealing with an unsupported city
    console.log(`City "${targetCity}" is not directly supported with real data APIs`);
    
    // For unsupported cities, return null - don't fall back to mock data
    console.log('Unsupported city, returning null instead of using mock data');
    return null;
  } catch (error) {
    console.error('Error fetching parcel data:', error);
    console.log('Error fetching parcel data, returning null');
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
    const geocodeResult = await geocodeAddress(address, city);
    if (!geocodeResult) {
      return NextResponse.json({ 
        error: 'Unable to geocode address' 
      }, { status: 400, headers });
    }
    
    console.log(`Geocoding result: ${JSON.stringify(geocodeResult)}`);
    
    // Add more detailed logging
    console.log(`Geocoding successful - Display name: ${geocodeResult.resolvedCity || 'Unknown'}`);
    console.log(`Coordinates: ${geocodeResult.lat}, ${geocodeResult.lng}`);
    
    // Destructure coordinates and resolved city
    const { lat, lng, resolvedCity } = geocodeResult;
    // No need for isFallback anymore since we don't use fallback coordinates
    
    // Verify coordinates against bounding box as an additional check
    const isValidCoordinate = validateCoordinatesForCity(lat, lng, city);
    console.log(`Coordinate validation result: ${isValidCoordinate} for city ${city}`);
    
    // Hard boundary check - log detailed information for Denver specific addresses
    if (city.toLowerCase() === 'denver') {
      const denverBounds = {
        minLat: 39.5,
        maxLat: 40.0,
        minLng: -105.2,
        maxLng: -104.7
      };
      console.log(`Denver bounds check: lat ${lat} (should be between ${denverBounds.minLat}-${denverBounds.maxLat})`);
      console.log(`Denver bounds check: lng ${lng} (should be between ${denverBounds.minLng}-${denverBounds.maxLng})`);
    }
    
    // Step 2: Add city mismatch validation
    if (resolvedCity) {
      // Validate the city match with the resolved location
      const targetCity = city.toLowerCase();
      const normalizedResolvedCity = resolvedCity.toLowerCase();
      
      let cityMatch = false;
      
      // Check if the resolved city matches the requested city
      if (normalizedResolvedCity.includes(targetCity) || targetCity.includes(normalizedResolvedCity)) {
        cityMatch = true;
      } else {
        // Handle specific cases like counties
        switch (targetCity) {
          case 'chicago':
            cityMatch = normalizedResolvedCity.includes('cook') || normalizedResolvedCity.includes('illinois');
            break;
          case 'denver':
            cityMatch = normalizedResolvedCity.includes('denver') || normalizedResolvedCity.includes('colorado');
            break;
          case 'charlotte':
            cityMatch = normalizedResolvedCity.includes('mecklenburg') || normalizedResolvedCity.includes('charlotte');
            break;
          case 'raleigh':
            cityMatch = normalizedResolvedCity.includes('wake') || normalizedResolvedCity.includes('raleigh');
            break;
          case 'nashville':
            cityMatch = normalizedResolvedCity.includes('davidson') || normalizedResolvedCity.includes('nashville');
            break;
          default:
            cityMatch = false;
        }
      }
      
      if (!cityMatch) {
        return NextResponse.json({
          error: `Geocode mismatch: Address appears to be in ${resolvedCity}, not ${city}. Please confirm the city or try a more specific address.`
        }, { status: 400, headers });
      }
    }
    
    // Additional coordinate validation to ensure we're in the right city
    const coordsValid = validateCoordinatesForCity(lat, lng, city);
    if (!coordsValid) {
      return NextResponse.json({
        error: `Coordinate validation failed: The coordinates (${lat}, ${lng}) do not appear to be in ${city}. Please check the address and city.`
      }, { status: 400, headers });
    }
    
    // Step 3: Fetch zoning and parcel data in parallel with city context
    const [zoningData, parcelData] = await Promise.all([
      fetchZoningData(lat, lng, city),
      fetchParcelData(lat, lng, city)
    ]);
    
    // If either zoning or parcel data are null, return a 404 error
    // This is a stricter validation that prevents any mock data fallbacks
    if (zoningData === null || parcelData === null) {
      return NextResponse.json({
        error: `No valid parcel or zoning data could be retrieved for this address in ${city}. Please check the address or try another.`,
        coordinates: { lat, lng },
        city
      }, { status: 404, headers });
    }
    
    // Add extra validation for Denver addresses to ensure we're not returning Chicago data
    if (city.toLowerCase() === 'denver') {
      // These zoning codes should NEVER appear for Denver - they are Chicago-specific
      const chicagoOnlyZoningCodes = ['DX-16', 'B3-5', 'RT-4', 'RS-3', 'M1-2', 'DC-12'];
      
      if (zoningData && chicagoOnlyZoningCodes.includes(zoningData.zoning_classification)) {
        console.error(`ERROR: Chicago zoning code "${zoningData.zoning_classification}" detected for Denver address!`);
        return NextResponse.json({
          error: `Invalid data detected: The zoning classification "${zoningData.zoning_classification}" is not valid for Denver. This appears to be a data mismatch.`,
          city: 'Denver',
          coordinates: { lat, lng }
        }, { status: 400, headers });
      }
      
      // Also check if parcel data has Chicago in the township name
      if (parcelData && parcelData.township_name && parcelData.township_name.includes('CHICAGO')) {
        console.error(`ERROR: Chicago township detected for Denver address!`);
        return NextResponse.json({
          error: `Invalid data detected: The township "${parcelData.township_name}" is not valid for Denver. This appears to be a data mismatch.`,
          city: 'Denver',
          coordinates: { lat, lng }
        }, { status: 400, headers });
      }
    }

    // Determine appropriate database name based on city for error messages
    let zoningDatabase = 'Chicago zoning database';
    let parcelDatabase = 'Cook County parcel database';
    let dataSource = 'data.cityofchicago.org';
    
    if (city?.toLowerCase() === 'denver') {
      zoningDatabase = 'Denver zoning database';
      parcelDatabase = 'Denver GIS database';
      dataSource = 'data.denvergov.org';
    } else if (city?.toLowerCase() === 'charlotte') {
      zoningDatabase = 'Charlotte zoning database';
      parcelDatabase = 'Mecklenburg County parcel database';
      dataSource = 'data.charlottenc.gov';
    } else if (city?.toLowerCase() === 'raleigh') {
      zoningDatabase = 'Raleigh zoning database';
      parcelDatabase = 'Wake County parcel database';
      dataSource = 'data.raleighnc.gov';
    } else if (city?.toLowerCase() === 'nashville') {
      zoningDatabase = 'Nashville zoning database';
      parcelDatabase = 'Davidson County parcel database';
      dataSource = 'data.nashville.gov';
    }

    // Fetch additional overlay districts data for the address if available
    let overlayDistricts = [];
    
    try {
      // This would be expanded to use real data from city-specific APIs
      // For now, only add sample data for certain cities
      if (city?.toLowerCase() === 'chicago' && zoningData) {
        // Chicago uses special character areas and overlays
        if (coordinates.lat > 41.88 && coordinates.lat < 41.9 && coordinates.lng > -87.64 && coordinates.lng < -87.62) {
          overlayDistricts = ['Downtown Character Overlay', 'TOD-1'];
        } else if (coordinates.lat > 41.9 && coordinates.lng > -87.67) {
          overlayDistricts = ['Neighborhood Preservation Overlay'];
        }
      } else if (city?.toLowerCase() === 'denver' && zoningData) {
        // Denver has more detailed overlay districts
        if (coordinates.lat > 39.74 && coordinates.lat < 39.75 && coordinates.lng > -104.99 && coordinates.lng < -104.98) {
          overlayDistricts = ['Downtown Design Overlay', 'UO-1 (Transit Overlay)'];
        }
      } else if (city?.toLowerCase() === 'charlotte' && zoningData) {
        // Charlotte has TOD overlays
        if (coordinates.lat > 35.22 && coordinates.lat < 35.23 && coordinates.lng > -80.84 && coordinates.lng < -80.83) {
          overlayDistricts = ['TOD-UC (Transit Urban Center)', 'Opportunity Zone'];
        }
      }
    } catch (overlayError) {
      console.error('Error fetching overlay districts:', overlayError);
      // Non-critical, just continue without overlays
    }

    // Step 4: Prepare the enhanced response with additional data
    const response = {
      coordinates: {
        lat,
        lng
      },
      zoning: zoningData ? {
        ...zoningData,
        overlay_districts: overlayDistricts
      } : { 
        zoning_classification: `Not found in ${zoningDatabase}` 
      },
      parcel: parcelData || { pin: `Not found in ${parcelDatabase}` },
      address_queried: address,
      city: city,
      data_source: {
        name: dataSource,
        real_data: (zoningData !== null || parcelData !== null), // Flag indicating if any real data was used
        timestamp: new Date().toISOString()
      },
      geo_verification: {
        resolved_location: resolvedCity || 'Unknown',
        verified_city_match: true
      }
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