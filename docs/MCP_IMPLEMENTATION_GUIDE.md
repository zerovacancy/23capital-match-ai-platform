# Model Context Protocol (MCP) Implementation Guide

This guide outlines how the Capital Match AI Platform uses Model Context Protocol (MCP) to integrate AI capabilities directly into the application.

## What is Model Context Protocol (MCP)?

Model Context Protocol is an approach that enables AI models like Claude to use structured context to handle domain-specific AI tasks without requiring separate API calls. MCP allows the application to:

1. Define structured contexts for different AI features
2. Provide these contexts to the AI system
3. Receive standardized responses that can be integrated into the application UI

## Implemented MCP Components

### 1. Matching Engine (LP-Deal Matching)

**Context Definition:** `MCPMatchingContext`

```typescript
interface MCPMatchingContext {
  lp: {
    name: string;
    tier: string;
    investmentCriteria: {
      geographicPreferences: string[];
      productTypePreferences: string[];
      investmentParameters: {
        targetIRR: number;
        targetEM: number;
        minInvestment: number;
        maxInvestment: number;
        investmentHorizon: number;
      };
      riskTolerance: string;
    };
    relationshipHistory: {
      pastInvestments: number;
      communicationFrequency: string;
      relationshipStrength: number;
    };
  };
  deal: {
    name: string;
    location: string;
    type: string;
    financialMetrics: {
      projectedIRR: number;
      projectedEM: number;
      cashOnCash: number;
    };
    capitalRequirements: {
      totalInvestment: number;
      minInvestment: number;
    };
    timeline: {
      acquisitionDate: string;
      projectedExit: string;
    };
  };
}
```

**Response Definition:** `MCPMatchResponse`

```typescript
interface MCPMatchResponse {
  confidenceScore: number;
  factors: Array<{
    factor: string;
    score: number;
    contribution: number;
    explanation: string;
  }>;
  recommendedApproach: string;
  keyTalkingPoints: string[];
}
```

**Files:**
- `/src/components/matching-engine/match-path-visualizer/MatchPathVisualizer.types.ts` - Type definitions
- `/src/components/matching-engine/match-path-visualizer/useMCPMatchVisualizer.ts` - Hook implementation
- `/src/components/matching-engine/match-path-visualizer/MCPVisualizer.tsx` - UI Component

### 2. Market Analysis (Deal-Market Comparison)

**Context Definition:**
- Uses the Deal object and MarketComparison data types from existing data structures

**Response Elements:**
- Market analysis text (narrative description)
- Deal strengths (array of strength descriptions)
- Deal challenges (array of challenge descriptions)

**Files:**
- `/src/components/deal-analyzer/market-comparison/useMCPMarketComparison.ts` - Hook implementation
- `/src/components/deal-analyzer/market-comparison/MCPMarketComparison.tsx` - UI Component

## How to Use MCP in the Application

### 1. Initialize MCP Context

```typescript
// In a component using the matching engine
import { useMCPMatchVisualizer } from '@/components/matching-engine/match-path-visualizer';

// Inside your component
const {
  initializeContext,
  matchResponse,
  // other values and functions
} = useMCPMatchVisualizer();

// When LP and Deal data is available
useEffect(() => {
  if (lp && deal) {
    initializeContext(lp, deal);
  }
}, [lp, deal]);
```

### 2. Render MCP-Enabled Components

```typescript
// For the match visualizer
<MCPVisualizer lp={lpData} deal={dealData} />

// For the market comparison
<MCPMarketComparison deal={dealData} />
```

## Adding New MCP Components

To add new MCP-enabled components to the platform:

1. Define the context structure the AI will need
2. Define the expected response structure
3. Create a hook that handles the context and response
4. Create a UI component that consumes the hook
5. Export the components and hooks

### Template Example

```typescript
// 1. Define context and response types
interface MCPNewFeatureContext {
  // Define context structure
}

interface MCPNewFeatureResponse {
  // Define response structure
}

// 2. Create the hook
const useMCPNewFeature = () => {
  const [context, setContext] = useState<MCPNewFeatureContext | null>(null);
  const [response, setResponse] = useState<MCPNewFeatureResponse | null>(null);
  
  // Initialize context and generate response
  const initializeContext = useCallback((data) => {
    // Set up context
    // Generate response (this would call Claude with MCP)
  }, []);
  
  return {
    context,
    response,
    initializeContext,
    // Other values and functions
  };
};

// 3. Create the UI component
const MCPNewFeatureComponent = ({ data }) => {
  const { initializeContext, response } = useMCPNewFeature();
  
  useEffect(() => {
    initializeContext(data);
  }, [data]);
  
  // Render UI using response
};
```

## Best Practices

1. **Keep contexts focused and minimal** - Only include data that's necessary for the AI to make its determination
2. **Pre-process data** - Format and normalize data before passing it to the context
3. **Type strictly** - Use TypeScript interfaces to ensure consistency
4. **Handle loading states** - Show appropriate loading indicators while the AI is processing
5. **Provide fallbacks** - Ensure components work even if the AI response is delayed or fails
6. **Structure responses for UI consumption** - Design response formats that map easily to UI components

## Future MCP Implementations

The following features are planned for MCP implementation:

1. **LP Profile Engine** - Generate LP profiles from Hubspot data
2. **Deal Analysis Engine** - Extract and standardize deal metrics from pro formas
3. **Capital Raise Tracker** - Monitor commitments and forecast fundraising progress
4. **Reporting Generator** - Create executive-ready reports and dashboards

Each implementation will follow the pattern established in this document, with clearly defined contexts and response structures.