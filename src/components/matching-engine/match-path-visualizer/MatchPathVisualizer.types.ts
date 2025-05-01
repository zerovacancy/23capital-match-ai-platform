import { Match } from "@/data/matches";
import { LP } from "@/data/lps";
import { Deal } from "@/data/deals";

export interface MatchPathVisualizerProps {
  match: Match;
  lp?: LP;
  deal?: Deal;
  className?: string;
  showDetailedLabels?: boolean;
  animated?: boolean;
  onFactorClick?: (factor: string) => void;
}

export interface ConnectionPath {
  id: string;
  source: string;
  target: string;
  strength: "strong" | "moderate" | "weak";
  score: number;
  factor: string;
  contribution: number;
}

export interface SimulationParameters {
  irr: number;
  equityMultiple: number;
  investmentSize: number;
  investmentHorizon: number;
  locationPreference: number;
  productPreference: number;
}

// MCP-related types for model context protocol implementation
export interface MCPMatchingContext {
  lp: {
    // LP profile data from the context
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
    // Deal data from the context
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

export interface MCPMatchResponse {
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
