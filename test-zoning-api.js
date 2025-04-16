// Test script for zoning API to verify Chicago data is not returned for Denver addresses
// and that city parameter is correctly required
const axios = require('axios');

async function testZoningAPI() {
  // Test cases including a missing city parameter and a Denver address
  const testAddresses = [
    { address: '440 E 13th Ave, Denver, CO 80203', city: 'Denver' },
    { address: '1600 Broadway, Denver, CO 80202', city: 'Denver' },
    { address: '1700 Lincoln St, Denver, CO', city: 'Denver' },
    { address: 'Willis Tower', city: 'Chicago' },
    { address: '440 E 13th Ave, Denver, CO 80203' } // Missing city parameter should error
  ];

  console.log('=== Testing Zoning API for Chicago Data Leakage ===');
  
  for (const testCase of testAddresses) {
    const { address, city } = testCase;
    console.log(`\nTesting address: ${address}${city ? ` in ${city}` : ' (no city specified)'}`);
    
    try {
      // Construct URL based on whether city is provided
      let url = `http://localhost:3000/api/zoning?address=${encodeURIComponent(address)}`;
      if (city) {
        url += `&city=${encodeURIComponent(city)}`;
      }
      console.log(`Requesting: ${url}`);
      
      const response = await axios.get(url);
      console.log(`Status: ${response.status}`);
      console.log('Response:', JSON.stringify(response.data, null, 2));
      
      // For the case with no city, we expect an error but got a response
      if (!city) {
        console.error('❌ TEST FAILED: Request without city parameter should return an error');
        continue;
      }
      
      // Verify that Denver addresses don't have Chicago data
      if (city === 'Denver') {
        // Check for Chicago zoning codes
        const chicagoZoningCodes = ['DX-16', 'B3-5', 'RT-4', 'RS-3', 'M1-2', 'DC-12'];
        const hasChicagoZoning = chicagoZoningCodes.includes(response.data.zoning?.zoning_classification);
        
        // Check for Chicago township
        const hasChicagoTownship = response.data.parcel?.township_name?.includes('CHICAGO');
        
        // Check coordinates are in Denver bounds
        const lat = response.data.coordinates.lat;
        const lng = response.data.coordinates.lng;
        const inDenverBounds = 
          lat >= 39.5 && lat <= 40.0 && 
          lng >= -105.2 && lng <= -104.7;
        
        console.log('VALIDATION RESULTS:');
        console.log(`- Has Chicago zoning: ${hasChicagoZoning ? '❌ YES' : '✅ NO'}`);
        console.log(`- Has Chicago township: ${hasChicagoTownship ? '❌ YES' : '✅ NO'}`);
        console.log(`- Coordinates in Denver bounds: ${inDenverBounds ? '✅ YES' : '❌ NO'}`);
        
        if (hasChicagoZoning || hasChicagoTownship || !inDenverBounds) {
          console.error('❌ TEST FAILED: Found Chicago data in Denver response');
        } else {
          console.log('✅ TEST PASSED: No Chicago data in Denver response');
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Error response:', JSON.stringify(error.response.data, null, 2));
        
        // Test case for missing city parameter should return 400 Bad Request
        if (!city && error.response.status === 400) {
          console.log('✅ TEST PASSED: Request without city parameter correctly returns 400 error');
        }
        // For Denver addresses, a 404 without Chicago data is better than returning Chicago data
        else if (city === 'Denver' && error.response.status === 404) {
          console.log('✅ TEST PASSED: Returns 404 instead of Chicago data');
        }
      } else {
        console.error('Error making request:', error.message);
      }
    }
  }
}

testZoningAPI();