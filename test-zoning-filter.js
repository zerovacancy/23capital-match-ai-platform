// Test script for zoning-filter API endpoint
const axios = require('axios');

async function testZoningFilter() {
  const testCases = [
    {
      name: 'Charlotte UMUD parcels',
      data: {
        city: 'Charlotte',
        filters: {
          zoning_districts: ['UMUD'],
          opportunity_zone: true
        }
      },
      expectedParcelsCount: 3
    },
    {
      name: 'Raleigh parcels near transit',
      data: {
        city: 'Raleigh',
        filters: {
          proximity_to_transit: 0.5,
          min_lot_size: 10000
        }
      },
      expectedParcelsCount: 3
    },
    {
      name: 'Charlotte parcels with neighborhood boundary',
      data: {
        city: 'Charlotte',
        filters: {
          overlays: ['TOD-CC']
        },
        boundary: {
          neighborhood: 'Uptown'
        }
      },
      expectedParcelsCount: 2
    },
    {
      name: 'Invalid city',
      data: {
        city: 'Denver',
        filters: {}
      },
      expectError: true
    },
    {
      name: 'Missing city',
      data: {
        filters: {
          zoning_districts: ['UMUD']
        }
      },
      expectError: true
    }
  ];

  console.log('=== Testing Zoning Filter API ===');
  
  for (const testCase of testCases) {
    console.log(`\nTest: ${testCase.name}`);
    
    try {
      const response = await axios.post('http://localhost:3000/api/zoning-filter', testCase.data);
      console.log(`Status: ${response.status}`);
      
      if (testCase.expectError) {
        console.error(`❌ TEST FAILED: Expected error but got success response`);
        continue;
      }
      
      console.log(`Parcels found: ${response.data.parcels_found}`);
      
      // Verify the number of parcels matches expected count
      if (response.data.parcels_found === testCase.expectedParcelsCount) {
        console.log(`✅ TEST PASSED: Found ${response.data.parcels_found} parcels as expected`);
      } else {
        console.error(`❌ TEST FAILED: Expected ${testCase.expectedParcelsCount} parcels but found ${response.data.parcels_found}`);
      }
      
      // Display first parcel as example
      if (response.data.parcels && response.data.parcels.length > 0) {
        console.log('First matching parcel:', JSON.stringify(response.data.parcels[0], null, 2));
      }
      
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

testZoningFilter();