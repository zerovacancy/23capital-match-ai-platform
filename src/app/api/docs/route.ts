import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Capital Match AI Platform API Documentation</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui.css" />
      <style>
        body {
          margin: 0;
          padding: 0;
        }
        .swagger-ui .topbar {
          background-color: #1a365d;
        }
        .swagger-ui .info .title small.version-stamp {
          background-color: #3182ce;
        }
        .swagger-ui .opblock.opblock-get .opblock-summary-method {
          background-color: #3182ce;
        }
        .swagger-ui .info .title {
          color: #1a365d;
        }
        .custom-header {
          background-color: #1a365d;
          color: white;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .custom-header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: normal;
        }
        .api-selector {
          padding: 10px 20px;
          background-color: #f5f5f5;
          border-bottom: 1px solid #ddd;
        }
        .api-selector label {
          font-weight: bold;
          margin-right: 10px;
        }
        .api-selector select {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .back-link {
          color: white;
          text-decoration: none;
        }
        .back-link:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="custom-header">
        <h1>Capital Match AI Platform API Documentation</h1>
        <a href="/" class="back-link">← Back to Platform</a>
      </div>
      <div class="api-selector">
        <label for="api-spec">Select API Specification:</label>
        <select id="api-spec" onchange="changeSpec(this.value)">
          <option value="/schemas/combined-apis.json" selected>All APIs (Combined)</option>
          <option value="/schemas/entitlement-api-schema.json">Entitlement API</option>
          <option value="/openapi/investor-match-schema.json">Investor Match API</option>
          <option value="/openapi/market-comparison-schema.json">Market Comparison API</option>
          <option value="/openapi/zoning-schema.json">Zoning API</option>
        </select>
      </div>
      <div id="swagger-ui"></div>
      
      <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui-bundle.js"></script>
      <script>
        let ui;
        
        function changeSpec(url) {
          if (ui) {
            ui.specActions.updateUrl(url);
            ui.specActions.download();
          }
        }
        
        window.onload = () => {
          ui = SwaggerUIBundle({
            url: '/schemas/combined-apis.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            layout: "BaseLayout",
            docExpansion: "list",
            defaultModelsExpandDepth: 1,
            defaultModelExpandDepth: 1,
            displayRequestDuration: true,
            filter: true,
            syntaxHighlight: {
              activate: true,
              theme: "agate"
            }
          });
          
          // Add timestamp to prevent caching
          const originalDownload = ui.specActions.download;
          ui.specActions.download = function(url) {
            const timestamp = Date.now();
            const urlWithTimestamp = url.indexOf('?') > -1 
              ? \`\${url}&_=\${timestamp}\` 
              : \`\${url}?_=\${timestamp}\`;
            return originalDownload(urlWithTimestamp);
          };
        };
      </script>
    </body>
    </html>
  `;
  
  return new NextResponse(html, {
    headers: { 
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}