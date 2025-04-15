import { NextRequest, NextResponse } from 'next/server';

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
  
  const html = `
    <html>
      <head>
        <title>City Entitlement API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          h2 { color: #555; margin-top: 30px; }
          pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
          .endpoint { margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <h1>City Entitlement API</h1>
        <p>This API provides entitlement and permit data for multiple US cities.</p>
        
        <h2>Endpoints</h2>
        
        <div class="endpoint">
          <h3>GET /api/entitlement-tracking</h3>
          <p>Retrieve entitlement and permit data for a specific address in a city.</p>
          <p><strong>Query Parameters:</strong></p>
          <ul>
            <li><code>city</code> - The city to search (required)</li>
            <li><code>address</code> - The property address to search (required)</li>
          </ul>
          <p><strong>Example:</strong></p>
          <pre>GET /api/entitlement-tracking?city=denver&address=1700 Lincoln St, Denver, CO</pre>
        </div>
        
        <div class="endpoint">
          <h3>GET /api/supported-cities</h3>
          <p>Get a list of all supported cities.</p>
          <p><strong>Example:</strong></p>
          <pre>GET /api/supported-cities</pre>
        </div>
        
        <div class="endpoint">
          <h3>GET /api/entitlement-types</h3>
          <p>Get a list of entitlement types for a specific city.</p>
          <p><strong>Query Parameters:</strong></p>
          <ul>
            <li><code>city</code> - The city to get entitlement types for (required)</li>
          </ul>
          <p><strong>Example:</strong></p>
          <pre>GET /api/entitlement-types?city=chicago</pre>
        </div>
      </body>
    </html>
  `;
  
  return new NextResponse(html, {
    headers: {
      ...Object.fromEntries(headers.entries()),
      'Content-Type': 'text/html',
    },
  });
}