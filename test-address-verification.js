// Test script for address verification API
const axios = require('axios');

async function testAddressVerification() {
  const testCases = [
    { address: '440 E 13th Ave, Denver, CO 80203', city: 'Denver', expected: true },
    { address: '1600 Broadway, Denver, CO 80202', city: 'Denver', expected: true },
    { address: 'Willis Tower', city: 'Chicago', expected: true },
    { address: '1600 Pennsylvania Ave', city: 'Denver', expected: false }, // Should fail - White House in DC
    { address: 'Main Street', city: 'Charlotte', expected: false }, // Too vague
    { address: '440 E 13th Ave, Denver, CO 80203', expected: false }, // Missing city parameter
    { address: undefined, city: 'Denver', expected: false } // Missing address
  ];

  console.log('=== Testing Address Verification API ===');
  
  for (const testCase of testCases) {
    const { address, city, expected } = testCase;
    
    console.log(`\nTesting: ${address || 'undefined'}${city ? ` in ${city}` : ' (no city)'}`);
    console.log(`Expected: ${expected ? 'Valid' : 'Invalid'}`);
    
    try {
      // Build URL with parameters that are provided
      let url = 'http://localhost:3000/api/verify-address?';
      const params = [];
      
      if (address) params.push(`address=${encodeURIComponent(address)}`);
      if (city) params.push(`city=${encodeURIComponent(city)}`);
      
      url += params.join('&');
      console.log(`Requesting: ${url}`);
      
      const response = await axios.get(url);
      console.log(`Status: ${response.status}`);
      console.log('Response:', JSON.stringify(response.data, null, 2));
      
      // Check if the result matches expectations
      const isValid = response.data.valid === true;
      
      if (isValid === expected) {
        console.log(`✅ TEST PASSED: Address validation result (${isValid}) matches expected (${expected})`);
      } else {
        console.error(`❌ TEST FAILED: Address validation result (${isValid}) does not match expected (${expected})`);
      }
      
      // For addresses expected to be valid, verify we have geocoding data
      if (expected && isValid) {
        if (response.data.geocoding && 
            response.data.geocoding.coordinates && 
            response.data.geocoding.coordinates.lat && 
            response.data.geocoding.coordinates.lng) {
          console.log('✅ TEST PASSED: Geocoding data present for valid address');
          
          // For Denver addresses, verify the coordinates are in Denver
          if (city === 'Denver') {
            const { lat, lng } = response.data.geocoding.coordinates;
            const inDenverBounds = 
              lat >= 39.5 && lat <= 40.0 && 
              lng >= -105.2 && lng <= -104.7;
            
            if (inDenverBounds) {
              console.log('✅ TEST PASSED: Coordinates are within Denver bounds');
            } else {
              console.error(`❌ TEST FAILED: Coordinates (${lat}, ${lng}) are outside Denver bounds`);
            }
          }
        } else {
          console.error('❌ TEST FAILED: Missing geocoding data for valid address');
        }
      }
      
    } catch (error) {
      // Check if expected failure (400/404 for addresses that should be invalid)
      if (!expected && error.response && (error.response.status === 400 || error.response.status === 404)) {
        console.log(`Status: ${error.response.status}`);
        console.log('Error response:', JSON.stringify(error.response.data, null, 2));
        console.log('✅ TEST PASSED: Invalid address correctly rejected with error');
      } else {
        console.error('❌ TEST FAILED: Unexpected error');
        if (error.response) {
          console.log(`Status: ${error.response.status}`);
          console.log('Error response:', JSON.stringify(error.response.data, null, 2));
        } else {
          console.error(error.message);
        }
      }
    }
  }
}

testAddressVerification();