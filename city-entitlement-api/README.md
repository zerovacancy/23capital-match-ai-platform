# City Entitlement API

A Node.js API that scrapes entitlement and permit data for multiple US cities and exposes it for use in custom applications like GPTs.

## Features

- Retrieves entitlement and permit data for properties in 9 major US cities
- Scrapes directly from city planning and permit websites
- Provides fallback mock data when scraping fails
- Includes endpoints for city support, entitlement types, and health checks
- CORS enabled for cross-origin requests

## Supported Cities

- Chicago, IL
- Denver, CO
- Charlotte, NC
- Raleigh, NC
- Nashville, TN
- New York, NY
- Los Angeles, CA
- Miami, FL
- Dallas, TX

## Installation

```bash
# Clone the repository
git clone [repository-url]
cd city-entitlement-api

# Install dependencies
npm install

# Start the server
npm start
```

## API Endpoints

### Get Entitlement Data

```
GET /entitlement-tracking?city={city}&address={address}
```

**Parameters:**
- `city` (required): The city to search in (e.g., "denver", "chicago")
- `address` (required): The property address to search for (e.g., "1700 Lincoln St, Denver, CO")

**Example Response:**
```json
{
  "city": "denver",
  "address": "1700 Lincoln St, Denver, CO",
  "permits": [
    {
      "type": "Rezoning",
      "status": "Approved",
      "reference_number": "Z-2023-10456",
      "filing_date": "2023-05-15",
      "last_update": "2023-09-22",
      "description": "Rezoning from C-MX-5 to C-MX-8"
    }
  ]
}
```

### Get Supported Cities

```
GET /supported-cities
```

**Example Response:**
```json
{
  "supportedCities": [
    "denver",
    "chicago",
    "charlotte",
    "raleigh",
    "nashville",
    "new york",
    "los angeles",
    "miami",
    "dallas"
  ]
}
```

### Get Entitlement Types by City

```
GET /entitlement-types?city={city}
```

**Parameters:**
- `city` (required): The city to get entitlement types for

**Example Response:**
```json
{
  "city": "chicago",
  "entitlementTypes": [
    "Building Permit",
    "Zoning Change",
    "Planned Development",
    "Landmark Designation"
  ]
}
```

### Health Check

```
GET /health
```

**Example Response:**
```json
{
  "status": "up",
  "version": "1.0.0"
}
```

## Development

```bash
# Run with auto-restart on file changes
npm run dev
```

## OpenAPI Integration

To integrate this API with a custom GPT, you can use the following OpenAPI schema:

```yaml
openapi: 3.1.0
info:
  title: City Entitlement API
  description: API for retrieving entitlement and permit data from multiple US cities
  version: 1.0.0
servers:
  - url: http://localhost:3000
    description: Development server
paths:
  /entitlement-tracking:
    get:
      summary: Track entitlement and permit status for a given property
      operationId: trackEntitlements
      parameters:
        - name: address
          in: query
          description: The property address to look up entitlements for
          required: true
          schema:
            type: string
            example: "1700 Lincoln St, Denver, CO"
        - name: city
          in: query
          description: The city to look up entitlement information
          required: true
          schema:
            type: string
            example: "Denver"
      responses:
        '200':
          description: Successful response with entitlement tracking data
  /supported-cities:
    get:
      summary: Get list of supported cities
      operationId: getSupportedCities
      responses:
        '200':
          description: Successfully returned list of supported cities
  /entitlement-types:
    get:
      summary: Get entitlement types for a specific city
      operationId: getEntitlementTypes
      parameters:
        - name: city
          in: query
          description: The city to get entitlement types for
          required: true
          schema:
            type: string
            example: "Chicago"
      responses:
        '200':
          description: Successfully returned entitlement types
```

## Notes on Deployment

For production use:
1. Add proper error handling and logging
2. Implement rate limiting to avoid being blocked by city websites
3. Add authentication for API access
4. Deploy behind a reverse proxy like Nginx
5. Consider using a service like Puppeteer Cluster for better performance
6. Add caching to reduce scraping frequency

## License

ISC