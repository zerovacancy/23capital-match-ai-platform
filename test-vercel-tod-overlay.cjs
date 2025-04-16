// Test script for TOD overlay API deployed on Vercel
const axios = require('axios');

// Import the function directly for local testing
const todOverlayHandler = require('./api/tod-overlay.cjs');

async function testLocalHandler() {
  console.log('=== Testing Local TOD Overlay API Handler ===');
  
  // Test cases
  const testCases = [
    {
      name: '2216 Hawkins Street, Charlotte',
      request: {
        query: {
          address: '2216 Hawkins Street, Charlotte, NC',
          city: 'Charlotte'
        },
        method: 'GET'
      },
      expectedDistrict: 'TOD-UC'
    },
    {
      name: 'South Boulevard, Charlotte',
      request: {
        query: {
          address: '2400 South Blvd, Charlotte, NC',
          city: 'Charlotte'
        },
        method: 'GET'
      },
      expectedDistrict: 'TOD-CC'
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\nTest: ${testCase.name}`);
    
    // Mock response object
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.data = data;
        return this;
      },
      setHeader: function() { return this; },
      end: function() { return this; }
    };
    
    // Call handler directly
    todOverlayHandler(testCase.request, res);
    
    // Check status code
    console.log(`Status: ${res.statusCode}`);
    
    // Check response data
    if (res.statusCode === 200) {
      console.log(`Response contains valid TOD data: ${res.data && res.data.tod_overlay ? '✅' : '❌'}`);
      
      if (res.data && res.data.tod_overlay) {
        const district = res.data.tod_overlay.district;
        console.log(`TOD District: ${district}`);
        
        if (district === testCase.expectedDistrict) {
          console.log(`✅ District matches expected: ${district}`);
        } else {
          console.error(`❌ District '${district}' does not match expected '${testCase.expectedDistrict}'`);
        }
        
        // Display full response data for review
        console.log('Response preview:', JSON.stringify({
          address: res.data.address,
          city: res.data.city,
          district: res.data.tod_overlay.district,
          description: res.data.tod_overlay.description,
          closest_station: res.data.tod_overlay.closest_station,
          opportunity_zone: res.data.opportunity_zone,
          additional_overlays: res.data.additional_overlays
        }, null, 2));
      }
    } else {
      console.error(`❌ Unexpected error status: ${res.statusCode}`);
      console.error('Error message:', res.data.error);
    }
  }
}

// Run the tests
testLocalHandler();