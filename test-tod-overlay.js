// Test script for TOD overlay API
const axios = require('axios');

async function testTODOverlay() {
  const testCases = [
    {
      name: 'South Blvd in Charlotte',
      address: '2400 South Blvd, Charlotte, NC',
      city: 'Charlotte',
      expectedDistrict: 'TOD-CC'
    },
    {
      name: 'Uptown Charlotte',
      address: '400 S Tryon St, Charlotte, NC',
      city: 'Charlotte',
      expectedDistrict: 'TOD-UC'
    },
    {
      name: 'Downtown Raleigh',
      address: '150 Fayetteville St, Raleigh, NC',
      city: 'Raleigh',
      expectedDistrict: 'TOD-BRT'
    },
    {
      name: 'Missing city parameter',
      address: '2400 South Blvd, Charlotte, NC',
      expectError: true
    },
    {
      name: 'Unsupported city',
      address: '123 Main St',
      city: 'Denver',
      expectError: true
    }
  ];

  console.log('=== Testing TOD Overlay API ===');
  
  for (const testCase of testCases) {
    console.log(`\nTest: ${testCase.name}`);
    
    try {
      // Build URL with parameters
      let url = 'http://localhost:3000/api/tod-overlay?';
      const params = [];
      
      if (testCase.address) params.push(`address=${encodeURIComponent(testCase.address)}`);
      if (testCase.city) params.push(`city=${encodeURIComponent(testCase.city)}`);
      
      url += params.join('&');
      console.log(`Requesting: ${url}`);
      
      const response = await axios.get(url);
      console.log(`Status: ${response.status}`);
      
      if (testCase.expectError) {
        console.error(`❌ TEST FAILED: Expected error but got success response`);
        continue;
      }
      
      // Verify response format and content
      if (!response.data || typeof response.data !== 'object') {
        console.error(`❌ TEST FAILED: Response is not a valid JSON object`);
        continue;
      }
      
      console.log(`Response has expected structure: ${
        response.data.address && 
        response.data.city && 
        response.data.tod_overlay && 
        response.data.opportunity_zone !== undefined && 
        Array.isArray(response.data.additional_overlays) ? '✅' : '❌'
      }`);
      
      // Verify district matches expected
      if (testCase.expectedDistrict) {
        const actualDistrict = response.data.tod_overlay?.district;
        
        if (actualDistrict === testCase.expectedDistrict) {
          console.log(`✅ TOD district '${actualDistrict}' matches expected`);
        } else {
          console.error(`❌ TOD district '${actualDistrict}' does not match expected '${testCase.expectedDistrict}'`);
        }
      }
      
      // Display sample of the response data
      console.log('Response preview:', JSON.stringify({
        address: response.data.address,
        city: response.data.city,
        district: response.data.tod_overlay?.district,
        description: response.data.tod_overlay?.description,
        opportunity_zone: response.data.opportunity_zone,
        additional_overlays: response.data.additional_overlays
      }, null, 2));
      
    } catch (error) {
      if (testCase.expectError) {
        console.log(`Status: ${error.response?.status || 'Unknown'}`);
        console.log(`Error message: ${error.response?.data?.error || error.message}`);
        console.log('✅ TEST PASSED: Expected error response received');
      } else {
        console.error(`❌ TEST FAILED: Unexpected error`);
        console.log(`Status: ${error.response?.status || 'Unknown'}`);
        console.log(`Error message: ${error.response?.data?.error || error.message}`);
      }
    }
  }
}

testTODOverlay();