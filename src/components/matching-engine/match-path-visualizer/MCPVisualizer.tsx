import React, { useRef, useEffect, useState } from 'react';
import { useMCPMatchVisualizer } from './useMCPMatchVisualizer';
import { MatchPathVisualizerProps } from './MatchPathVisualizer.types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
// No need to import missing Spinner component

import { cn } from '@/lib/utils';

// Temporary fix for missing Spinner component
const TempSpinner = ({ className }: { className?: string }) => (
  <div className={`animate-spin ${className}`}>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
import { LP } from '@/data/lps';
import { Deal } from '@/data/deals';

// SVG dimensions and layout configuration
const SVG_WIDTH = 800;
const SVG_HEIGHT = 500;
const LP_COLUMN_X = 100;
const DEAL_COLUMN_X = 700;
const START_Y = 120;
const NODE_GAP = 60;

interface MCPVisualizerProps {
  lp: LP;
  deal: Deal;
  className?: string;
  showDetailedLabels?: boolean;
  animated?: boolean;
  onFactorClick?: (factor: string) => void;
}

export const MCPVisualizer: React.FC<MCPVisualizerProps> = ({
  lp,
  deal,
  className,
  showDetailedLabels = true,
  animated = true,
  onFactorClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredFactor, setHoveredFactor] = useState<string | null>(null);
  
  const {
    initializeContext,
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
  } = useMCPMatchVisualizer();

  // Initialize context when LP or Deal changes
  useEffect(() => {
    if (lp && deal) {
      initializeContext(lp, deal);
    }
  }, [lp, deal, initializeContext]);

  // Mapping for strength to color
  const strengthColorMap = {
    strong: '#2E7D32', // Strong/Success color for strong matches
    moderate: '#F57C00', // Warning color for moderate matches
    weak: '#C62828', // Error color for weak matches
  };

  // Generate the SVG path for a connection
  const generatePath = (sourceY: number, targetY: number) => {
    const sourceX = LP_COLUMN_X;
    const targetX = DEAL_COLUMN_X;
    const controlPointOffset = (targetX - sourceX) / 2;
    
    return `M ${sourceX} ${sourceY} 
            C ${sourceX + controlPointOffset} ${sourceY}, 
              ${targetX - controlPointOffset} ${targetY}, 
              ${targetX} ${targetY}`;
  };

  // Calculate the factor positions
  const getFactorPositions = () => {
    if (!matchResponse || !matchResponse.factors) return { lpFactorPositions: [], dealFactorPositions: [] };
    
    const factors = matchResponse.factors;
    
    const lpFactorPositions = factors.map((factor, index) => ({
      factor: factor.factor,
      y: START_Y + index * NODE_GAP
    }));

    const dealFactorPositions = factors.map((factor, index) => ({
      factor: factor.factor,
      y: START_Y + index * NODE_GAP
    }));
    
    return { lpFactorPositions, dealFactorPositions };
  };

  const { lpFactorPositions, dealFactorPositions } = getFactorPositions();

  // Effect for animations when paths change
  useEffect(() => {
    if (!animated || !svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll('.connection-path');
    paths.forEach((path, index) => {
      // Reset the animation
      path.classList.remove('animate-path');
      
      // Use setTimeout to force a reflow
      setTimeout(() => {
        path.classList.add('animate-path');
        (path as SVGPathElement).style.animationDelay = `${index * 100}ms`;
      }, 0);
    });
  }, [connectionPaths, animated]);

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Match Path Visualization (MCP)</h3>
          <div className="flex items-center gap-2">
            <Switch 
              checked={simulationMode} 
              onCheckedChange={toggleSimulationMode} 
              id="simulation-mode"
            />
            <Label htmlFor="simulation-mode">What-if Simulation</Label>
          </div>
        </div>
        
        <div className="flex gap-4">
          {/* Main visualization SVG */}
          <div className="flex-1 relative">
            <div className="bg-[#ECEDE3] rounded-md p-4">
              <div className="flex justify-between mb-6">
                <div className="text-sm font-medium text-[#1C1C1C]">
                  <span className="block text-base font-semibold">{lp?.name || 'LP Criteria'}</span>
                  {lp && <Badge variant="outline" className="mt-1">{lp.tier}</Badge>}
                </div>
                <div className="text-sm font-medium text-[#1C1C1C] text-right">
                  <span className="block text-base font-semibold">{deal?.name || 'Deal Attributes'}</span>
                  {deal && <Badge variant="outline" className="mt-1">{deal.type}</Badge>}
                </div>
              </div>
              
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <TempSpinner className="w-12 h-12" />
                  <span className="ml-3 text-lg">Generating match via MCP...</span>
                </div>
              ) : (
                <svg
                  ref={svgRef}
                  width="100%"
                  height={SVG_HEIGHT}
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  className="overflow-visible"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Connection Paths */}
                  {connectionPaths.map((path, index) => {
                    if (!lpFactorPositions[index] || !dealFactorPositions[index]) return null;
                    
                    const sourceY = lpFactorPositions[index].y;
                    const targetY = dealFactorPositions[index].y;
                    
                    return (
                      <g key={path.id}>
                        <path
                          d={generatePath(sourceY, targetY)}
                          stroke={strengthColorMap[path.strength]}
                          strokeWidth={path.contribution / 10}
                          fill="none"
                          className={cn(
                            "connection-path transition-all duration-500",
                            hoveredFactor === path.factor ? "opacity-100" : "opacity-60",
                            animated && "animate-path"
                          )}
                          style={{
                            strokeDasharray: "1000",
                            strokeDashoffset: "1000"
                          }}
                          onMouseEnter={() => setHoveredFactor(path.factor)}
                          onMouseLeave={() => setHoveredFactor(null)}
                          onClick={() => onFactorClick?.(path.factor)}
                        />
                        
                        {/* Score indicators */}
                        <circle
                          cx={(LP_COLUMN_X + DEAL_COLUMN_X) / 2}
                          cy={(sourceY + targetY) / 2}
                          r={15}
                          fill={strengthColorMap[path.strength]}
                          className="opacity-80"
                        />
                        <text
                          x={(LP_COLUMN_X + DEAL_COLUMN_X) / 2}
                          y={(sourceY + targetY) / 2 + 5}
                          textAnchor="middle"
                          fill="white"
                          fontSize={12}
                          fontWeight="bold"
                        >
                          {path.score}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* LP Factor Nodes */}
                  {lpFactorPositions.map((node, index) => (
                    <g key={`lp-node-${index}`}>
                      <circle
                        cx={LP_COLUMN_X}
                        cy={node.y}
                        r={8}
                        fill="#275E91"
                        className="opacity-80"
                      />
                      <text
                        x={LP_COLUMN_X - 15}
                        y={node.y + 5}
                        textAnchor="end"
                        fill="#1C1C1C"
                        fontSize={12}
                        fontWeight={hoveredFactor === node.factor ? "bold" : "normal"}
                        className="transition-all duration-300"
                      >
                        {node.factor}
                      </text>
                    </g>
                  ))}
                  
                  {/* Deal Factor Nodes */}
                  {dealFactorPositions.map((node, index) => (
                    <g key={`deal-node-${index}`}>
                      <circle
                        cx={DEAL_COLUMN_X}
                        cy={node.y}
                        r={8}
                        fill="#275E91"
                        className="opacity-80"
                      />
                      <text
                        x={DEAL_COLUMN_X + 15}
                        y={node.y + 5}
                        textAnchor="start"
                        fill="#1C1C1C"
                        fontSize={12}
                        fontWeight={hoveredFactor === node.factor ? "bold" : "normal"}
                        className="transition-all duration-300"
                      >
                        {node.factor}
                      </text>
                    </g>
                  ))}
                </svg>
              )}
            </div>
            
            {/* Confidence Score */}
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-[#1C1C1C] mb-1">Match Confidence</h4>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-2 w-full max-w-[200px] rounded-full overflow-hidden bg-gray-200"
                    style={{ minWidth: '150px' }}
                  >
                    <div 
                      className="h-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${simulatedConfidenceScore}%`,
                        backgroundImage: simulatedConfidenceScore > 80 
                          ? 'linear-gradient(to right, #7A8D79, #2E7D32)' 
                          : simulatedConfidenceScore > 60 
                            ? 'linear-gradient(to right, #7A8D79, #F57C00)' 
                            : 'linear-gradient(to right, #F57C00, #C62828)'
                      }}
                    />
                  </div>
                  <span className="font-semibold">{simulatedConfidenceScore}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 mr-3">
                  <div className="w-3 h-3 rounded-full bg-green-600 shadow-sm" />
                  <span className="text-xs font-medium">Strong</span>
                </div>
                <div className="flex items-center gap-1 mr-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                  <span className="text-xs font-medium">Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-600 shadow-sm" />
                  <span className="text-xs font-medium">Weak</span>
                </div>
              </div>
            </div>

            {/* Talking Points */}
            {matchResponse && matchResponse.keyTalkingPoints && matchResponse.keyTalkingPoints.length > 0 && (
              <div className="mt-6 bg-white p-4 rounded-md border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">Key Talking Points</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {matchResponse.keyTalkingPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Simulation Panel - only shown when simulationMode is true */}
          {simulationMode && deal && lp && (
            <div className="w-72 bg-blue-50 rounded-md p-4 transition-all duration-300 shadow-md">
              <h4 className="font-semibold text-blue-700 mb-4">Adjust Deal Parameters</h4>
              
              {/* IRR Slider */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <Label htmlFor="irr-slider" className="text-sm font-medium text-gray-800">IRR (%)</Label>
                  <span className="text-sm font-bold text-blue-700">{simulationParams.irr.toFixed(1)}%</span>
                </div>
                <Slider
                  id="irr-slider"
                  min={10}
                  max={30}
                  step={0.5}
                  value={[simulationParams.irr]}
                  onValueChange={([value]) => updateSimulationParam('irr', value)}
                  className="mb-1"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Target: {lp.investmentParameters.targetIRR}%</span>
                  <span>Original: {deal.financialMetrics.projectedIRR}%</span>
                </div>
              </div>
              
              {/* Equity Multiple Slider */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <Label htmlFor="em-slider" className="text-sm">Equity Multiple</Label>
                  <span className="text-sm font-medium">{simulationParams.equityMultiple.toFixed(1)}x</span>
                </div>
                <Slider
                  id="em-slider"
                  min={1.0}
                  max={3.0}
                  step={0.1}
                  value={[simulationParams.equityMultiple]}
                  onValueChange={([value]) => updateSimulationParam('equityMultiple', value)}
                  className="mb-1"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Target: {lp.investmentParameters.targetEM}x</span>
                  <span>Original: {deal.financialMetrics.projectedEM}x</span>
                </div>
              </div>
              
              {/* Min Investment Slider */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <Label htmlFor="investment-slider" className="text-sm">Min Investment</Label>
                  <span className="text-sm font-medium">${(simulationParams.investmentSize / 1000000).toFixed(1)}M</span>
                </div>
                <Slider
                  id="investment-slider"
                  min={500000}
                  max={5000000}
                  step={100000}
                  value={[simulationParams.investmentSize]}
                  onValueChange={([value]) => updateSimulationParam('investmentSize', value)}
                  className="mb-1"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Min: ${(lp.investmentParameters.minInvestment / 1000000).toFixed(1)}M</span>
                  <span>Original: ${(deal.capitalRequirements.minInvestment / 1000000).toFixed(1)}M</span>
                </div>
              </div>
              
              {/* Run Simulation Button */}
              <button
                className="w-full bg-blue-700 text-white font-medium py-2 px-4 rounded-md mt-2 hover:bg-blue-600 transition-colors"
                onClick={generateSimulatedMatch}
              >
                Run Simulation
              </button>
              
              {/* Optimization Suggestions */}
              {suggestedOptimizations.length > 0 && (
                <Alert className="mt-4 bg-white border border-green-300/30">
                  <h5 className="font-semibold text-sm mb-1 text-lg-blue">Suggested Optimizations</h5>
                  <AlertDescription className="text-xs">
                    <ul className="space-y-1.5 mt-1">
                      {suggestedOptimizations.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-lg-green mt-1 mr-2 flex-shrink-0"></div>
                          <span className="text-lg-text">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Recommended Approach */}
              {matchResponse && matchResponse.recommendedApproach && (
                <Alert className="mt-4 bg-white border border-lg-blue/30">
                  <h5 className="font-semibold text-sm mb-1 text-lg-blue">Recommended Approach</h5>
                  <AlertDescription className="text-xs text-lg-text">
                    {matchResponse.recommendedApproach}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};