import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SwaggerDocs = () => {
  useEffect(() => {
    // Load Swagger UI scripts and styles
    const loadSwaggerUI = async () => {
      // Create link element for CSS
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui.css';
      document.head.appendChild(linkElement);
      
      // Create script element for Swagger UI bundle
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui-bundle.js';
      scriptElement.async = true;
      
      // Initialize Swagger UI after the script loads
      scriptElement.onload = () => {
        // @ts-ignore - SwaggerUIBundle is loaded from CDN
        const ui = SwaggerUIBundle({
          url: '/schemas/combined-apis.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            // @ts-ignore - SwaggerUIBundle is loaded from CDN
            SwaggerUIBundle.presets.apis,
            // @ts-ignore - SwaggerUIBundle is loaded from CDN
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
        
        // Add functionality to API spec selector
        document.getElementById('api-spec')?.addEventListener('change', (e) => {
          // @ts-ignore - event target value
          const url = e.target.value;
          if (ui) {
            // @ts-ignore - ui has specActions
            ui.specActions.updateUrl(url);
            // @ts-ignore - ui has specActions
            ui.specActions.download();
          }
        });
      };
      
      document.body.appendChild(scriptElement);
    };
    
    loadSwaggerUI();
    
    return () => {
      // Clean up script and styles when component unmounts
      document.querySelectorAll('script[src*="swagger-ui-bundle.js"]').forEach(el => el.remove());
      document.querySelectorAll('link[href*="swagger-ui.css"]').forEach(el => el.remove());
    };
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="custom-header" style={{
          backgroundColor: '#1a365d',
          color: 'white',
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>
            Capital Match AI Platform API Documentation
          </h1>
        </div>
        
        <div className="api-selector" style={{
          padding: '10px 20px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd'
        }}>
          <label htmlFor="api-spec" style={{ fontWeight: 'bold', marginRight: '10px' }}>
            Select API Specification:
          </label>
          <select 
            id="api-spec" 
            style={{
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="/schemas/combined-apis.json" selected>All APIs (Combined)</option>
            <option value="/schemas/entitlement-api-schema.json">Entitlement API</option>
            <option value="/openapi/investor-match-schema.json">Investor Match API</option>
            <option value="/openapi/market-comparison-schema.json">Market Comparison API</option>
            <option value="/openapi/zoning-schema.json">Zoning API</option>
          </select>
        </div>
        
        <div id="swagger-ui" style={{ height: 'calc(100vh - 180px)', overflow: 'auto' }}></div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SwaggerDocs;