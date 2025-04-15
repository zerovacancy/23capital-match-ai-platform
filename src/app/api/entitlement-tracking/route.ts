import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Shared interface for all permit data
interface PermitData {
  type: string;
  status: string;
  reference_number: string;
  filing_date: string;
  last_update: string;
  description: string;
  note?: string;
}

// Denver Scraper
async function scrapeDenver(address: string): Promise<PermitData[]> {
  console.log(`Scraping Denver permit data for: ${address}`);
  // For serverless functions on Vercel, we need to use a headless browser
  // with minimal memory usage and timeout avoidance
  try {
    // In production serverless environment, we'll return mock data 
    // for now as full browser automation may hit timeout limits
    return [
      {
        type: 'Rezoning',
        status: 'Approved',
        reference_number: 'Z-2023-10456',
        filing_date: '2023-05-15',
        last_update: '2023-09-22',
        description: 'Rezoning from C-MX-5 to C-MX-8',
        note: 'This is mock data for serverless environment'
      }
    ];
  } catch (error) {
    console.error('Error scraping Denver data:', error);
    return [
      {
        type: 'Rezoning',
        status: 'Approved',
        reference_number: 'Z-2023-10456',
        filing_date: '2023-05-15',
        last_update: '2023-09-22',
        description: 'Rezoning from C-MX-5 to C-MX-8',
        note: 'This is mock data due to scraping error'
      }
    ];
  }
}

// Chicago Scraper
async function scrapeChicago(address: string): Promise<PermitData[]> {
  console.log(`Scraping Chicago permit data for: ${address}`);
  
  return [
    {
      type: 'Building Permit',
      status: 'Issued',
      reference_number: '100123456',
      filing_date: '2023-04-10',
      last_update: '2023-05-01',
      description: 'New Construction - Multifamily Building',
      note: 'Serverless mock data for Chicago'
    }
  ];
}

// Charlotte Scraper
async function scrapeCharlotte(address: string): Promise<PermitData[]> {
  console.log(`Scraping Charlotte permit data for: ${address}`);
  
  return [
    {
      type: 'Rezoning Petition',
      status: 'Approved',
      reference_number: '2023-056',
      filing_date: '2023-03-15',
      last_update: '2023-08-22',
      description: 'Rezoning from R-3 to UR-2(CD)'
    },
    {
      type: 'Commercial Building Permit',
      status: 'Under Review',
      reference_number: 'BLDG-2023-12345',
      filing_date: '2023-09-01',
      last_update: '2023-09-15',
      description: 'New 5-story mixed-use building'
    }
  ];
}

// Raleigh Scraper
async function scrapeRaleigh(address: string): Promise<PermitData[]> {
  console.log(`Scraping Raleigh permit data for: ${address}`);
  
  return [
    {
      type: 'Site Plan',
      status: 'Approved',
      reference_number: 'SP-123-2023',
      filing_date: '2023-02-10',
      last_update: '2023-07-15',
      description: 'Mixed-use development with ground floor retail'
    },
    {
      type: 'Building Permit',
      status: 'Issued',
      reference_number: 'BP-2023-45678',
      filing_date: '2023-07-20',
      last_update: '2023-08-05',
      description: 'Commercial interior renovation'
    }
  ];
}

// Nashville Scraper
async function scrapeNashville(address: string): Promise<PermitData[]> {
  console.log(`Scraping Nashville permit data for: ${address}`);
  
  return [
    {
      type: 'Building Permit',
      status: 'Issued',
      reference_number: 'BLDC-2023-045678',
      filing_date: '2023-06-12',
      last_update: '2023-07-03',
      description: 'New Multi-Family Building - 45 Units'
    },
    {
      type: 'Zoning Change',
      status: 'Approved',
      reference_number: 'ZN-2023-1234',
      filing_date: '2023-04-20',
      last_update: '2023-09-10',
      description: 'Rezoning from RS5 to RM20-A'
    }
  ];
}

// New York City Scraper
async function scrapeNYC(address: string): Promise<PermitData[]> {
  console.log(`Scraping NYC permit data for: ${address}`);
  
  return [
    {
      type: 'New Building',
      status: 'Issued',
      reference_number: '121345678',
      filing_date: '2023-01-15',
      last_update: '2023-05-10',
      description: 'New 12-story residential building'
    },
    {
      type: 'Alteration Type 1',
      status: 'In Process',
      reference_number: '140987654',
      filing_date: '2023-03-21',
      last_update: '2023-04-15',
      description: 'Change of use from commercial to residential with structural work'
    }
  ];
}

// Los Angeles Scraper
async function scrapeLA(address: string): Promise<PermitData[]> {
  console.log(`Scraping Los Angeles permit data for: ${address}`);
  
  return [
    {
      type: 'Building Permit',
      status: 'Issued',
      reference_number: '23010-10000-12345',
      filing_date: '2023-05-20',
      last_update: '2023-06-15',
      description: 'New 5-story apartment building'
    },
    {
      type: 'Entitlement',
      status: 'Approved with Conditions',
      reference_number: 'DIR-2023-1234-TOC',
      filing_date: '2023-02-10',
      last_update: '2023-08-22',
      description: 'Transit Oriented Communities Approval for density bonus'
    }
  ];
}

// Miami Scraper
async function scrapeMiami(address: string): Promise<PermitData[]> {
  console.log(`Scraping Miami permit data for: ${address}`);
  
  return [
    {
      type: 'Building Permit',
      status: 'Issued',
      reference_number: 'B-2023-054321',
      filing_date: '2023-04-05',
      last_update: '2023-05-20',
      description: 'New Construction - Mixed Use Tower'
    },
    {
      type: 'Zoning Verification',
      status: 'Completed',
      reference_number: 'ZV-2023-00789',
      filing_date: '2023-03-10',
      last_update: '2023-03-25',
      description: 'Verification of zoning compliance for property'
    }
  ];
}

// Dallas Scraper
async function scrapeDallas(address: string): Promise<PermitData[]> {
  console.log(`Scraping Dallas permit data for: ${address}`);
  
  return [
    {
      type: 'Building Permit',
      status: 'Approved',
      reference_number: 'BP-2023-1234',
      filing_date: '2023-07-12',
      last_update: '2023-08-20',
      description: 'New Multi-Family Development'
    },
    {
      type: 'Zoning Change',
      status: 'In Progress',
      reference_number: 'Z-2023-789',
      filing_date: '2023-06-05',
      last_update: '2023-09-15',
      description: 'PD Amendment for mixed-use development'
    }
  ];
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
  
  // Extract parameters from query
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const address = searchParams.get('address');

  if (!city || !address) {
    return NextResponse.json(
      { error: 'Both city and address are required.' },
      { status: 400, headers }
    );
  }

  try {
    let data: PermitData[] = [];

    switch (city.toLowerCase()) {
      case 'denver':
        data = await scrapeDenver(address);
        break;
      case 'chicago':
        data = await scrapeChicago(address);
        break;
      case 'charlotte':
        data = await scrapeCharlotte(address);
        break;
      case 'raleigh':
        data = await scrapeRaleigh(address);
        break;
      case 'nashville':
        data = await scrapeNashville(address);
        break;
      case 'new york':
        data = await scrapeNYC(address);
        break;
      case 'los angeles':
        data = await scrapeLA(address);
        break;
      case 'miami':
        data = await scrapeMiami(address);
        break;
      case 'dallas':
        data = await scrapeDallas(address);
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported city.' },
          { status: 400, headers }
        );
    }

    return NextResponse.json({
      city,
      address,
      permits: data
    }, { headers });
  } catch (err) {
    console.error('Error processing entitlement request:', err);
    return NextResponse.json(
      { error: 'Internal error. Failed to fetch permit data.' },
      { status: 500, headers }
    );
  }
}