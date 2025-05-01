import { useState, useEffect } from 'react';
import { Deal } from '@/data/deals';
import { marketMetrics, MarketMetric, MarketComparison, getMarketComparisonForDeal } from '@/data/marketComparison';

/**
 * MCP-enabled hook for market comparison analysis
 * Uses AI to generate market insights and comparisons based on deal data
 */
export const useMCPMarketComparison = (deal: Deal | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [marketData, setMarketData] = useState<MarketComparison | null>(null);
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [dealStrengths, setDealStrengths] = useState<string[]>([]);
  const [dealChallenges, setDealChallenges] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<{[key: string]: MarketMetric}>({});

  useEffect(() => {
    if (!deal) return;
    
    setIsLoading(true);
    
    // This would typically be an async call to Claude with MCP
    // For now, we'll simulate it with a timeout and the existing data
    setTimeout(() => {
      // Get market data for the deal from our static data
      const marketComp = getMarketComparisonForDeal(deal.location);
      setMarketData(marketComp || null);
      
      // Set metrics
      setMetrics(marketMetrics);
      
      // Generate analysis text based on the deal and market
      if (marketComp) {
        generateMarketAnalysis(deal, marketComp);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [deal]);

  // Simulate MCP-generated market analysis
  const generateMarketAnalysis = (deal: Deal, marketComp: MarketComparison) => {
    // Generate market analysis text
    const analysis = `${deal.name} is located in ${deal.location}, which shows a relative market strength of ${marketComp.relativeStrength}/10. The market demonstrates ${marketComp.metrics.rentalGrowth}% rental growth and ${marketComp.metrics.occupancyRate}% occupancy rates, compared to industry benchmarks of ${marketMetrics.rentalGrowth.benchmarks.average}% and ${marketMetrics.occupancyRate.benchmarks.average}% respectively.`;
    setAnalysisText(analysis);
    
    // Generate strengths based on metrics
    const strengths = [];
    if (marketComp.metrics.rentalGrowth > marketMetrics.rentalGrowth.benchmarks.average) {
      strengths.push(`Above-average rental growth rate (${marketComp.metrics.rentalGrowth}% vs. ${marketMetrics.rentalGrowth.benchmarks.average}% benchmark)`);
    }
    if (marketComp.metrics.occupancyRate > marketMetrics.occupancyRate.benchmarks.average) {
      strengths.push(`Strong occupancy rate (${marketComp.metrics.occupancyRate}% vs. ${marketMetrics.occupancyRate.benchmarks.average}% benchmark)`);
    }
    if (marketComp.metrics.jobGrowth > marketMetrics.jobGrowth.benchmarks.average) {
      strengths.push(`Robust job growth (${marketComp.metrics.jobGrowth}% vs. ${marketMetrics.jobGrowth.benchmarks.average}% benchmark)`);
    }
    if (marketComp.metrics.populationGrowth > marketMetrics.populationGrowth.benchmarks.average) {
      strengths.push(`Strong population growth trajectory (${marketComp.metrics.populationGrowth}% vs. ${marketMetrics.populationGrowth.benchmarks.average}% benchmark)`);
    }
    setDealStrengths(strengths);
    
    // Generate challenges based on metrics
    const challenges = [];
    if (marketComp.metrics.rentalGrowth < marketMetrics.rentalGrowth.benchmarks.average) {
      challenges.push(`Below-average rental growth rate (${marketComp.metrics.rentalGrowth}% vs. ${marketMetrics.rentalGrowth.benchmarks.average}% benchmark)`);
    }
    if (marketComp.metrics.occupancyRate < marketMetrics.occupancyRate.benchmarks.average) {
      challenges.push(`Weaker occupancy rate (${marketComp.metrics.occupancyRate}% vs. ${marketMetrics.occupancyRate.benchmarks.average}% benchmark)`);
    }
    if (marketComp.metrics.supplyPipeline > marketMetrics.supplyPipeline.benchmarks.average) {
      challenges.push(`Higher supply pipeline (${marketComp.metrics.supplyPipeline}% vs. ${marketMetrics.supplyPipeline.benchmarks.average}% benchmark) indicating potential oversupply`);
    }
    setDealChallenges(challenges);
  };

  return {
    isLoading,
    marketData,
    metrics,
    analysisText,
    dealStrengths,
    dealChallenges
  };
};