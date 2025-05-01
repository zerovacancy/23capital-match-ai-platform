import { useState, useMemo, useCallback } from 'react';
import { MCPMatchingContext, MCPMatchResponse, ConnectionPath, SimulationParameters } from './MatchPathVisualizer.types';

/**
 * Model Context Protocol (MCP) enabled hook for match visualization
 * Uses AI model to generate matches between LPs and deals based on provided context
 */
export const useMCPMatchVisualizer = () => {
  const [matchContext, setMatchContext] = useState<MCPMatchingContext | null>(null);
  const [matchResponse, setMatchResponse] = useState<MCPMatchResponse | null>(null);
  const [simulationMode, setSimulationMode] = useState(false);
  const [simulationParams, setSimulationParams] = useState<SimulationParameters>({
    irr: 0,
    equityMultiple: 0,
    investmentSize: 0,
    investmentHorizon: 0,
    locationPreference: 10,
    productPreference: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize context from LP and Deal data
  const initializeContext = useCallback((lp: any, deal: any) => {
    if (!lp || !deal) return;
    
    const context: MCPMatchingContext = {
      lp: {
        name: lp.name,
        tier: lp.tier,
        investmentCriteria: {
          geographicPreferences: lp.geographicPreferences?.primary || [],
          productTypePreferences: lp.productPreferences?.primary || [],
          investmentParameters: {
            targetIRR: lp.investmentParameters?.targetIRR || 0,
            targetEM: lp.investmentParameters?.targetEM || 0,
            minInvestment: lp.investmentParameters?.minInvestment || 0,
            maxInvestment: lp.investmentParameters?.maxInvestment || 0,
            investmentHorizon: lp.investmentParameters?.investmentHorizon || 0,
          },
          riskTolerance: lp.riskTolerance || 'Moderate',
        },
        relationshipHistory: {
          pastInvestments: 0, // Placeholder for now
          communicationFrequency: lp.contactFrequency || 'Quarterly',
          relationshipStrength: lp.relationshipStrength || 5,
        },
      },
      deal: {
        name: deal.name,
        location: deal.location,
        type: deal.type,
        financialMetrics: {
          projectedIRR: deal.financialMetrics.projectedIRR,
          projectedEM: deal.financialMetrics.projectedEM,
          cashOnCash: deal.financialMetrics.cashOnCash,
        },
        capitalRequirements: {
          totalInvestment: deal.capitalRequirements.totalInvestment,
          minInvestment: deal.capitalRequirements.minInvestment,
        },
        timeline: {
          acquisitionDate: deal.timeline.acquisitionDate,
          projectedExit: deal.timeline.projectedExit,
        },
      },
    };
    
    setMatchContext(context);
    
    // Initialize simulation parameters
    setSimulationParams({
      irr: deal.financialMetrics.projectedIRR,
      equityMultiple: deal.financialMetrics.projectedEM,
      investmentSize: deal.capitalRequirements.minInvestment,
      investmentHorizon: deal.timeline.projectedExit ? 
        new Date(deal.timeline.projectedExit).getFullYear() - new Date(deal.timeline.acquisitionDate).getFullYear() : 0,
      locationPreference: 10,
      productPreference: 10,
    });
    
    // Generate initial match
    generateMatch(context);
  }, []);

  // Generate match using MCP with Claude AI
  const generateMatch = useCallback(async (context: MCPMatchingContext) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call Claude with proper MCP
      // For now, we'll simulate a response with a timeout
      
      setTimeout(() => {
        // Simulate AI generating a match response
        const simulatedResponse: MCPMatchResponse = {
          confidenceScore: calculateConfidenceScore(context),
          factors: generateFactors(context),
          recommendedApproach: generateApproach(context),
          keyTalkingPoints: generateTalkingPoints(context),
        };
        
        setMatchResponse(simulatedResponse);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating match:", error);
      setIsLoading(false);
    }
  }, []);

  // Simulate match generation for development
  const calculateConfidenceScore = (context: MCPMatchingContext): number => {
    const { lp, deal } = context;
    
    // Geographic match
    const geoMatch = lp.investmentCriteria.geographicPreferences.some(
      pref => deal.location.includes(pref)
    ) ? 25 : 10;
    
    // Product type match
    const productMatch = lp.investmentCriteria.productTypePreferences.some(
      pref => deal.type.includes(pref)
    ) ? 25 : 10;
    
    // Financial match
    const irrMatch = deal.financialMetrics.projectedIRR >= lp.investmentCriteria.investmentParameters.targetIRR ? 20 : 10;
    const emMatch = deal.financialMetrics.projectedEM >= lp.investmentCriteria.investmentParameters.targetEM ? 15 : 5;
    
    // Size match
    const sizeMatch = 
      deal.capitalRequirements.minInvestment >= lp.investmentCriteria.investmentParameters.minInvestment &&
      deal.capitalRequirements.totalInvestment <= lp.investmentCriteria.investmentParameters.maxInvestment ? 15 : 5;
    
    return Math.min(100, geoMatch + productMatch + irrMatch + emMatch + sizeMatch);
  };

  // Generate match factors
  const generateFactors = (context: MCPMatchingContext) => {
    const { lp, deal } = context;
    
    return [
      {
        factor: "Geographic Alignment",
        score: lp.investmentCriteria.geographicPreferences.some(
          pref => deal.location.includes(pref)
        ) ? 8 : 4,
        contribution: 25,
        explanation: `This deal is located in ${deal.location}, which ${
          lp.investmentCriteria.geographicPreferences.some(
            pref => deal.location.includes(pref)
          ) ? "matches" : "doesn't match"
        } ${lp.name}'s geographic preferences.`
      },
      {
        factor: "Product Type",
        score: lp.investmentCriteria.productTypePreferences.some(
          pref => deal.type.includes(pref)
        ) ? 9 : 3,
        contribution: 20,
        explanation: `This ${deal.type} development ${
          lp.investmentCriteria.productTypePreferences.some(
            pref => deal.type.includes(pref)
          ) ? "aligns with" : "may not align with"
        } ${lp.name}'s product type preferences.`
      },
      {
        factor: "Return Profile",
        score: deal.financialMetrics.projectedIRR >= lp.investmentCriteria.investmentParameters.targetIRR ? 8 : 5,
        contribution: 30,
        explanation: `The projected ${deal.financialMetrics.projectedIRR}% IRR ${
          deal.financialMetrics.projectedIRR >= lp.investmentCriteria.investmentParameters.targetIRR ? 
            "exceeds" : "falls short of"
        } ${lp.name}'s target IRR of ${lp.investmentCriteria.investmentParameters.targetIRR}%.`
      },
      {
        factor: "Investment Size",
        score: deal.capitalRequirements.minInvestment >= lp.investmentCriteria.investmentParameters.minInvestment ? 7 : 4,
        contribution: 15,
        explanation: `The minimum investment of $${deal.capitalRequirements.minInvestment / 1000000}M ${
          deal.capitalRequirements.minInvestment >= lp.investmentCriteria.investmentParameters.minInvestment ?
            "meets" : "is below"
        } ${lp.name}'s minimum threshold of $${lp.investmentCriteria.investmentParameters.minInvestment / 1000000}M.`
      },
      {
        factor: "Relationship Strength",
        score: lp.relationshipHistory.relationshipStrength > 7 ? 8 : 5,
        contribution: 10,
        explanation: `${lp.name} has a ${
          lp.relationshipHistory.relationshipStrength > 7 ? "strong" : "moderate"
        } relationship strength of ${lp.relationshipHistory.relationshipStrength}/10 with previous ${lp.relationshipHistory.pastInvestments} investments.`
      }
    ];
  };

  // Generate recommended approach
  const generateApproach = (context: MCPMatchingContext): string => {
    const { lp } = context;
    
    if (lp.relationshipHistory.relationshipStrength > 7) {
      return "Direct outreach with personal call from executive team highlighting deal's alignment with their investment criteria";
    } else if (lp.relationshipHistory.pastInvestments > 0) {
      return "Schedule meeting to present deal with detailed return projections and emphasize improvements from past investments";
    } else {
      return "Initial outreach with deal teaser and request for introductory meeting to explore investment potential";
    }
  };

  // Generate talking points
  const generateTalkingPoints = (context: MCPMatchingContext): string[] => {
    const { lp, deal } = context;
    
    return [
      `This ${deal.type} development in ${deal.location} aligns with your geographic and product type preferences`,
      `Projected IRR of ${deal.financialMetrics.projectedIRR}% exceeds your target return threshold`,
      `Minimum investment of $${deal.capitalRequirements.minInvestment / 1000000}M with flexibility on commitment size`,
      `${deal.timeline.projectedExit ? `Projected exit in ${new Date(deal.timeline.projectedExit).getFullYear()}` : "Flexible exit timeline"}`,
      `Strong market fundamentals including job and population growth`
    ];
  };

  // Calculate connection paths between LP criteria and deal attributes
  const connectionPaths = useMemo(() => {
    if (!matchResponse) return [];
    
    const paths: ConnectionPath[] = [];
    
    matchResponse.factors.forEach((factor, index) => {
      // Determine strength based on score
      let strength: "strong" | "moderate" | "weak" = "moderate";
      if (factor.score >= 7) strength = "strong";
      else if (factor.score <= 4) strength = "weak";
      
      paths.push({
        id: `connection-${index}`,
        source: `lp-${factor.factor.toLowerCase().replace(/\s+/g, '-')}`,
        target: `deal-${factor.factor.toLowerCase().replace(/\s+/g, '-')}`,
        strength,
        score: factor.score,
        factor: factor.factor,
        contribution: factor.contribution
      });
    });
    
    return paths;
  }, [matchResponse]);

  // Simulated confidence score when adjusting parameters
  const simulatedConfidenceScore = useMemo(() => {
    if (!matchResponse || !simulationMode || !matchContext) return matchResponse?.confidenceScore || 0;
    
    // Simple simulation algorithm for adjusting the confidence score
    let baseScore = matchResponse.confidenceScore;
    
    // Safely access nested properties with optional chaining
    const targetIRR = matchContext?.lp?.investmentCriteria?.investmentParameters?.targetIRR || 0;
    const targetEM = matchContext?.lp?.investmentCriteria?.investmentParameters?.targetEM || 0;
    const minInvestment = matchContext?.lp?.investmentCriteria?.investmentParameters?.minInvestment || 0;
    const maxInvestment = matchContext?.lp?.investmentCriteria?.investmentParameters?.maxInvestment || 0;
    
    const irrImpact = simulationParams.irr > targetIRR ? 5 : -5;
    const emImpact = simulationParams.equityMultiple > targetEM ? 3 : -3;
    const sizeImpact = simulationParams.investmentSize >= minInvestment && 
                     simulationParams.investmentSize <= maxInvestment ? 2 : -4;
    
    // Clamp the final score between 0-100
    return Math.max(0, Math.min(100, baseScore + irrImpact + emImpact + sizeImpact));
  }, [matchResponse, simulationMode, simulationParams, matchContext]);

  // Suggested optimizations based on the current simulation parameters
  const suggestedOptimizations = useMemo(() => {
    if (!matchContext) return [];
    
    const suggestions = [];
    
    // Safely access nested properties with optional chaining
    const targetIRR = matchContext?.lp?.investmentCriteria?.investmentParameters?.targetIRR || 0;
    const targetEM = matchContext?.lp?.investmentCriteria?.investmentParameters?.targetEM || 0;
    const minInvestment = matchContext?.lp?.investmentCriteria?.investmentParameters?.minInvestment || 0;
    
    if (simulationParams.irr < targetIRR) {
      suggestions.push(`Increase IRR from ${simulationParams.irr}% to at least ${targetIRR}%`);
    }
    
    if (simulationParams.equityMultiple < targetEM) {
      suggestions.push(`Increase equity multiple from ${simulationParams.equityMultiple}x to at least ${targetEM}x`);
    }
    
    if (simulationParams.investmentSize < minInvestment) {
      suggestions.push(`Increase minimum investment from $${(simulationParams.investmentSize / 1000000).toFixed(1)}M to $${(minInvestment / 1000000).toFixed(1)}M`);
    }
    
    return suggestions;
  }, [matchContext, simulationParams]);

  // Generate a match with updated simulation parameters
  const generateSimulatedMatch = useCallback(() => {
    if (!matchContext) return;
    
    // Create updated context with simulation parameters
    const updatedContext: MCPMatchingContext = {
      ...matchContext,
      deal: {
        ...matchContext.deal,
        financialMetrics: {
          ...matchContext.deal.financialMetrics,
          projectedIRR: simulationParams.irr,
          projectedEM: simulationParams.equityMultiple,
        },
        capitalRequirements: {
          ...matchContext.deal.capitalRequirements,
          minInvestment: simulationParams.investmentSize,
        },
      }
    };
    
    // Generate new match with updated context
    generateMatch(updatedContext);
  }, [matchContext, simulationParams, generateMatch]);

  // Toggle simulation mode
  const toggleSimulationMode = useCallback(() => {
    setSimulationMode(prevMode => !prevMode);
  }, []);
  
  // Update simulation parameters
  const updateSimulationParam = useCallback((param: keyof SimulationParameters, value: number) => {
    setSimulationParams(prev => ({
      ...prev,
      [param]: value
    }));
  }, []);

  return {
    initializeContext,
    matchContext,
    matchResponse,
    connectionPaths,
    simulationMode,
    simulationParams,
    simulatedConfidenceScore,
    suggestedOptimizations,
    isLoading,
    toggleSimulationMode,
    updateSimulationParam,
    generateSimulatedMatch
  };
};