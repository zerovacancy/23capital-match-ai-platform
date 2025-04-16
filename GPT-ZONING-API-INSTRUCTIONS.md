# Zoning API Integration Instructions for GPT

## Overview
The Zoning API provides information about zoning and parcel data for specific addresses in supported cities. Before querying for zoning data, it's important to validate the address to ensure accurate results.

## Supported Cities
- Chicago, IL
- Denver, CO 
- Charlotte, NC
- Raleigh, NC
- Nashville, TN

## API Endpoints

### 1. Address Verification
**Endpoint:** `GET /api/verify-address`

**Parameters:**
- `address`: Full address (required)
- `city`: City name (required, must be one of the supported cities)

**Response:**
- `valid`: Boolean indicating if the address is valid for the specified city
- `message`: Success message if valid
- `error`: Error message if invalid
- `geocoding`: Object containing geographical information (only for valid addresses)
  - `coordinates`: Latitude and longitude
  - `display_name`: Full address as recognized by the geocoding service
  - `resolved_city`: City name as recognized by the geocoding service

**Example Response (Success):**
```json
{
  "valid": true,
  "message": "Address is valid and geocodes to Denver",
  "geocoding": {
    "coordinates": {
      "lat": 39.7456,
      "lng": -104.9951
    },
    "display_name": "1144, 15th Street, Central Business District, Denver, Denver County, Colorado, 80202, United States",
    "resolved_city": "Denver"
  }
}
```

**Example Response (Error):**
```json
{
  "valid": false,
  "error": "Unable to geocode address '123 Fake Street' in Denver."
}
```

### 2. Zoning Information
**Endpoint:** `GET /api/zoning`

**Parameters:**
- `address`: Full address (required)
- `city`: City name (required)

**Response:**
- Success: Returns zoning information including zoning classification, parcel data, and coordinates
- Error: Returns appropriate error message

## Best Practices for Using the Zoning API

1. **Always validate addresses first**:
   - Before requesting zoning data, verify the address using the verification endpoint
   - Only proceed with the zoning request if address verification returns `valid: true`

2. **Handle errors gracefully**:
   - If address verification fails, inform the user and suggest corrections
   - Common issues include:
     - Misspelled street names
     - Incorrect city specified for an address
     - Address doesn't exist or can't be geocoded

3. **Display result confidence**:
   - When showing zoning data to users, include confidence indicators
   - Example: "Address verified with high confidence" or "Address may be outside city limits"

4. **Handling address ambiguity**:
   - If a user provides an ambiguous address (e.g., "Main St" without a number):
     1. Inform them that the address is too vague
     2. Ask for more details like street number, cross street, or postal code
     3. Suggest a more specific address format

5. **City-specific recommendations**:
   - For Chicago addresses: Include ZIP code when possible
   - For Denver addresses: Include neighborhood if known
   - For all cities: Use full state names or standard abbreviations (IL, CO, NC, TN)

## Error Prevention Protocol
When a user asks about zoning information, always follow this protocol:

1. **Verify the city is supported**: Check if the requested city is one of: Chicago, Denver, Charlotte, Raleigh, or Nashville
2. **Validate the address**: Call the verification endpoint before requesting zoning data
3. **Handle verification failures**:
   - If verification fails due to the address being in a different city than specified, suggest the correct city
   - If verification fails due to an invalid address, ask for a more specific or corrected address
4. **Only proceed with zoning lookup if verification succeeds**

## Example Interactions

### Good Example - Complete Address:
User: "What's the zoning for 233 S Wacker Dr, Chicago?"
Assistant: *First verifies the address*
Assistant: "The property at 233 S Wacker Dr (Willis Tower) in Chicago is zoned as DC-12 (Downtown Core District). This zoning allows for high-density commercial use, including office space, retail, and mixed-use development."

### Good Example - Invalid City:
User: "What's the zoning for 1600 Pennsylvania Ave in Denver?"
Assistant: *Verifies address and detects mismatch*
Assistant: "I couldn't find a valid match for '1600 Pennsylvania Ave' in Denver. This address appears to be in Washington DC, not Denver. Would you like me to check a different address in Denver?"

### Good Example - Ambiguous Address:
User: "What's the zoning for Main Street in Charlotte?"
Assistant: "I need a more specific address to check zoning information in Charlotte. Could you provide a street number or cross street? For example: '123 Main Street' or 'Main Street and 5th Avenue'."

By following these guidelines, you'll help users get accurate zoning information while minimizing errors and providing a better user experience.