# Capital Match AI Platform API Documentation

This document provides comprehensive documentation for all API endpoints available in the Capital Match AI Platform, with examples of how to use each one.

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
   - [Zoning API](#zoning-api)
   - [Investor Match API](#investor-match-api)
   - [Market Comparison API](#market-comparison-api)
   - [Entitlement Tracking API](#entitlement-tracking-api)
5. [Using with Custom GPTs](#using-with-custom-gpts)
6. [OpenAPI Schemas](#openapi-schemas)

## Overview

The Capital Match AI Platform provides a collection of APIs designed to support real estate development and investment activities. These APIs can be used to:

- Look up zoning and parcel information for properties
- Find investors that match specific deal criteria
- Compare property metrics against market averages
- Track permits and entitlements for development projects

All APIs return data in JSON format and support CORS for cross-origin requests.

## Base URL

All API endpoints are available at the following base URL:

```
https://capital-match-ai-platform.vercel.app/api
```

## Authentication

Currently, the APIs are publicly accessible without authentication. However, we recommend using appropriate rate limiting in your applications.

## API Endpoints

### Zoning API

The Zoning API provides information about zoning classifications and parcel data for properties.

#### Retrieve Zoning Information

```
GET /zoning?address={address}&city={city}
```

**Parameters:**
- `address` (required): The property address to look up
- `city` (optional): The city where the property is located

**Example Request:**
```
GET /api/zoning?address=Willis%20Tower,%20Chicago
```

**Example Response:**
```json
{
  "coordinates": {
    "lat": 41.8789,
    "lng": -87.6359
  },
  "zoning": {
    "zoning_classification": "DC-16",
    "description": "Downtown Core District",
    "overlay_districts": ["TOD-1"]
  },
  "parcel": {
    "pin": "17093000010000",
    "property_class": "5-99",
    "township_name": "CHICAGO",
    "square_footage": 43000
  },
  "address_queried": "Willis Tower, Chicago",
  "city": "Chicago"
}
```

#### Filter Parcels by Zoning Criteria

```
POST /zoning-filter
```

**Request Body:**
```json
{
  "city": "Charlotte",
  "filters": {
    "zoning_districts": ["MUDD", "TOD-NC"],
    "min_lot_size": 10000,
    "max_lot_size": 50000,
    "overlays": ["TOD-1", "Historic District"],
    "opportunity_zone": true,
    "proximity_to_transit": 0.5
  },
  "boundary": {
    "center": {
      "lat": 35.2271,
      "lng": -80.8431
    },
    "radius": 1.5
  }
}
```

**Example Response:**
```json
{
  "city": "Charlotte",
  "parcels_found": 23,
  "parcels": [
    {
      "address": "401 N Tryon St, Charlotte, NC",
      "parcel_id": "08117716",
      "zoning": "UMUD",
      "overlays": ["TOD-CC"],
      "lot_size": 22500,
      "opportunity_zone": true,
      "distance_to_transit": 0.2
    },
    {
      "address": "125 E 5th St, Charlotte, NC",
      "parcel_id": "08117722",
      "zoning": "MUDD",
      "overlays": ["TOD-1"],
      "lot_size": 18000,
      "opportunity_zone": true,
      "distance_to_transit": 0.3
    }
  ],
  "filter_applied": {
    "zoning_districts": ["MUDD", "TOD-NC"],
    "min_lot_size": 10000,
    "max_lot_size": 50000,
    "overlays": ["TOD-1", "Historic District"],
    "opportunity_zone": true,
    "proximity_to_transit": 0.5
  }
}
```

#### Get Transit-Oriented Development Overlay Information

```
GET /tod-overlay?address={address}&city={city}
```

**Parameters:**
- `address` (required): The property address to look up
- `city` (required): The city where the property is located (Charlotte, Raleigh)

**Example Request:**
```
GET /api/tod-overlay?address=500%20S%20College%20St,%20Charlotte,%20NC&city=Charlotte
```

**Example Response:**
```json
{
  "address": "500 S College St, Charlotte, NC",
  "city": "Charlotte",
  "tod_overlay": {
    "district": "TOD-UC",
    "description": "Transit Oriented Development - Urban Center",
    "max_height": 120,
    "max_density": 250,
    "parking_reduction": 50,
    "closest_station": "Stonewall Station",
    "distance_to_station": 0.3
  },
  "opportunity_zone": true,
  "additional_overlays": ["UDIO", "HDO"]
}
```

#### Scan for Recently Upzoned Parcels

```
GET /upzoned-scanner?timeframe={timeframe}&district={district}&minimum_increase={minimum_increase}
```

**Parameters:**
- `timeframe` (optional): Period to look back (30days, 90days, 180days, 1year)
- `district` (optional): Limit scan to specific council district
- `minimum_increase` (optional): Minimum increase in development potential (%)

**Example Request:**
```
GET /api/upzoned-scanner?timeframe=90days&district=District%2019&minimum_increase=50
```

**Example Response:**
```json
{
  "timeframe": "90days",
  "total_upzoned_parcels": 47,
  "upzoned_parcels": [
    {
      "address": "1234 5th Ave N, Nashville, TN",
      "parcel_id": "10505001300",
      "previous_zoning": "RS5",
      "new_zoning": "RM20-A",
      "rezone_date": "2023-07-12",
      "council_case_number": "BL2023-1584",
      "density_increase": 300,
      "height_increase": 50,
      "council_district": "District 19"
    }
  ],
  "market_trends": {
    "most_upzoned_districts": ["District 19", "District 5", "District 21"],
    "most_common_upzoning": "RS5 to RM20-A",
    "average_density_increase": 175
  }
}
```

### Investor Match API

The Investor Match API helps find investors that match specific real estate deal criteria.

#### Match Investors to a Deal

```
POST /investor-match
```

**Request Body:**
```json
{
  "assetType": "multifamily",
  "market": "Chicago",
  "investmentAmount": 5000000,
  "expectedReturn": 12,
  "riskProfile": "moderate",
  "projectName": "Lakeview Apartments",
  "description": "256-unit apartment complex in Lakeview neighborhood",
  "timeline": "5 years"
}
```

**Example Response:**
```json
{
  "deal": {
    "assetType": "multifamily",
    "market": "Chicago",
    "investmentAmount": 5000000,
    "expectedReturn": 12,
    "riskProfile": "moderate"
  },
  "matches": [
    {
      "investorId": "INV001",
      "investorName": "Blackstone Real Estate",
      "matchScore": 85,
      "matchDetails": {
        "assetTypeMatch": true,
        "marketMatch": true,
        "investmentSizeMatch": true,
        "returnExpectationMatch": false,
        "riskProfileMatch": true
      }
    },
    {
      "investorId": "INV023",
      "investorName": "Harrison Street Real Estate",
      "matchScore": 78,
      "matchDetails": {
        "assetTypeMatch": true,
        "marketMatch": true,
        "investmentSizeMatch": false,
        "returnExpectationMatch": true,
        "riskProfileMatch": true
      }
    }
  ],
  "totalMatches": 2
}
```

### Market Comparison API

The Market Comparison API allows comparison of real estate metrics against local market averages.

#### Compare Real Estate Metrics

```
GET /market-comparison?city={city}&assetType={assetType}&capRate={capRate}&rentPerSqFt={rentPerSqFt}&pricePerSqFt={pricePerSqFt}&pricePerUnit={pricePerUnit}
```

**Parameters:**
- `city` (required): The city to compare against
- `assetType` (required): Type of real estate asset (multifamily, office, retail, industrial)
- `capRate` (optional): Capitalization rate (%)
- `rentPerSqFt` (optional): Rent per square foot ($)
- `pricePerSqFt` (optional): Price per square foot ($) for office, retail, industrial
- `pricePerUnit` (optional): Price per unit ($) for multifamily

**Example Request:**
```
GET /api/market-comparison?city=Chicago&assetType=multifamily&capRate=5.5&rentPerSqFt=2.25&pricePerUnit=200000
```

**Example Response:**
```json
{
  "city": "Chicago",
  "assetType": "multifamily",
  "marketAverages": {
    "averageCapRate": 5.2,
    "averageRentPerSqFt": 2.15,
    "vacancyRate": 5.7,
    "averagePricePerUnit": 225000,
    "yearOverYearValueChange": 3.5
  },
  "insights": [
    "The cap rate of 5.5% is above the market average of 5.2%.",
    "The rent of $2.25/sqft is higher than the market average of $2.15/sqft.",
    "Your price per unit ($200,000) is below the market average ($225,000), suggesting a potentially good value acquisition."
  ]
}
```

### Entitlement Tracking API

The Entitlement Tracking API tracks permit and entitlement status for properties in various cities.

#### Track Entitlements

```
GET /entitlement-tracking?city={city}&address={address}
```

**Parameters:**
- `city` (required): The city to look up entitlement information
- `address` (required): The property address to search

**Example Request:**
```
GET /api/entitlement-tracking?city=Denver&address=1700%20Lincoln%20St,%20Denver,%20CO
```

**Example Response:**
```json
{
  "city": "Denver",
  "address": "1700 Lincoln St, Denver, CO",
  "permits": [
    {
      "type": "Rezoning",
      "status": "Approved",
      "reference_number": "Z-2023-10456",
      "filing_date": "2023-05-15",
      "last_update": "2023-09-22",
      "description": "Rezoning from C-MX-5 to C-MX-8"
    },
    {
      "type": "Site Plan",
      "status": "Under Review",
      "reference_number": "SP-2023-00789",
      "filing_date": "2023-08-10",
      "last_update": "2023-10-05",
      "description": "Mixed-use development site plan"
    }
  ]
}
```

#### Get Supported Cities

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

#### Get Entitlement Types by City

```
GET /entitlement-types?city={city}
```

**Parameters:**
- `city` (required): The city to get entitlement types for

**Example Request:**
```
GET /api/entitlement-types?city=chicago
```

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

## Using with Custom GPTs

To integrate these APIs with Custom GPTs, you can use the OpenAPI schemas provided below. These schemas can be added to your GPT configuration in the "Actions" section.

### Step-by-Step Integration:

1. Access the GPT Editor in ChatGPT
2. Go to the "Actions" section
3. Add the OpenAPI schema URL for the combined API or individual API components
4. Add instructions for your GPT on when and how to use these APIs
5. Test your GPT with relevant queries

### Example GPT Instructions:

```
When a user provides a property address in Chicago, use the zoning_lookup action to retrieve and present the parcel and zoning information.

When a user wants to find investors for a real estate deal, extract these details from their query:
- Asset type (multifamily, office, etc.)
- Market location
- Investment amount
- Expected return
- Risk profile

Then use the match_investors action to find potential investors and present the results in a clear format.

When a user mentions comparing a property to market metrics, use the market_comparison action to provide market context and insights.

When a user asks about permits or entitlements for a property, use the entitlement_tracking action to provide current status information.
```

## OpenAPI Schemas

The following OpenAPI schema URLs are available for integration:

- **Combined API Schema (All APIs):**
  ```
  https://capital-match-ai-platform.vercel.app/schemas/combined-apis.json
  ```

- **Individual API Schemas:**
  - Zoning API:
    ```
    https://capital-match-ai-platform.vercel.app/openapi/zoning-schema.json
    ```
  - Investor Match API:
    ```
    https://capital-match-ai-platform.vercel.app/openapi/investor-match-schema.json
    ```
  - Market Comparison API:
    ```
    https://capital-match-ai-platform.vercel.app/openapi/market-comparison-schema.json
    ```
  - Entitlement API:
    ```
    https://capital-match-ai-platform.vercel.app/schemas/entitlement-api-schema.json
    ```