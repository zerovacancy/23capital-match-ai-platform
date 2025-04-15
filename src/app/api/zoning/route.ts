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

// Function to geocode an address using Google's Geocoding API
// In production, you should add proper error handling and API key management
async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // Replace GOOGLE_MAPS_API_KEY with your actual API key
    // In production, this should be stored in environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

// Function to fetch zoning data from Chicago's dataset
async function fetchZoningData(lat: number, lng: number): Promise<ZoningData | null> {
  try {
    // Query Chicago's zoning dataset with the coordinates
    // This uses the Socrata Open Data API (SODA)
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
      return {
        zoning_classification: response.data[0].zoning_classification || 'Unknown',
        description: response.data[0].zone_class_description || undefined
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching zoning data:', error);
    return null;
  }
}

// Function to fetch parcel data from Cook County dataset
async function fetchParcelData(lat: number, lng: number): Promise<ParcelData | null> {
  try {
    // Query Cook County's parcel dataset with the coordinates
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
      return {
        pin: response.data[0].pin14 || 'Unknown',
        property_class: response.data[0].class || 'Unknown',
        township_name: response.data[0].township_name || undefined,
        square_footage: response.data[0].sqft ? Number(response.data[0].sqft) : undefined
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching parcel data:', error);
    return null;
  }
}

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

  try {
    // Step 1: Geocode the address
    const coordinates = await geocodeAddress(address);
    if (!coordinates) {
      return NextResponse.json(
        { error: 'Could not geocode the provided address' },
        { status: 404 }
      );
    }

    // Step 2 & 3: Fetch zoning and parcel data in parallel
    const [zoningData, parcelData] = await Promise.all([
      fetchZoningData(coordinates.lat, coordinates.lng),
      fetchParcelData(coordinates.lat, coordinates.lng)
    ]);

    // Step 4: Prepare the response
    const response = {
      coordinates,
      zoning: zoningData || { zoning_classification: 'Not found in Chicago zoning database' },
      parcel: parcelData || { pin: 'Not found in Cook County parcel database' },
      address_queried: address
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}