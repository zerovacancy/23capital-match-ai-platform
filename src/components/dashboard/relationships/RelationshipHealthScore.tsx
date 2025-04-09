import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { HelpCircle, AlertTriangle, Clock, BarChart2, Heart, Activity } from 'lucide-react';
import { calculateHealthScore } from '@/data/communicationLogs';
import { lps } from '@/data/lps';

interface HealthScoreCardProps {
  score: number;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, label, icon, description }) => {
  // Get score color based on value
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-green-500";
    if (value >= 40) return "text-amber-500";
    if (value >= 20) return "text-orange-500";
    return "text-red-500";
  };
  
  // Get progress color based on value
  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-600";
    if (value >= 60) return "bg-green-500";
    if (value >= 40) return "bg-amber-500";
    if (value >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <div className="p-4 border rounded-md bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 rounded-full">
            {icon}
          </div>
          <h4 className="font-medium text-gray-800">{label}</h4>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <HelpCircle className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
        <span className="text-sm text-gray-500">out of 100</span>
      </div>
      
      <Progress 
        value={score} 
        max={100} 
        className="h-2 bg-gray-100" 
        indicatorClassName={getProgressColor(score)} 
      />
    </div>
  );
};

interface RelationshipHealthScoreProps {
  lpId?: string;
  title?: string;
}

const RelationshipHealthScore: React.FC<RelationshipHealthScoreProps> = ({ 
  lpId,
  title = "Relationship Health Scores"
}) => {
  const healthScore = useMemo(() => {
    // If no LP ID provided, calculate average across all LPs
    if (!lpId) {
      const scores = lps.map(lp => calculateHealthScore(lp.id));
      const overall = Math.round(scores.reduce((sum, score) => sum + score.overall, 0) / scores.length);
      const recency = Math.round(scores.reduce((sum, score) => sum + score.recency, 0) / scores.length);
      const frequency = Math.round(scores.reduce((sum, score) => sum + score.frequency, 0) / scores.length);
      const sentiment = Math.round(scores.reduce((sum, score) => sum + score.sentiment, 0) / scores.length);
      const engagement = Math.round(scores.reduce((sum, score) => sum + score.engagement, 0) / scores.length);
      
      return { overall, recency, frequency, sentiment, engagement };
    }
    
    // Calculate for specific LP
    return calculateHealthScore(lpId);
  }, [lpId]);
  
  const healthStatusLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    if (score >= 20) return "Needs Attention";
    return "Critical";
  };
  
  const healthStatusColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-green-500";
    if (score >= 40) return "text-amber-500";
    if (score >= 20) return "text-orange-500";
    return "text-red-500";
  };
  
  const atRiskCount = useMemo(() => {
    return lps.filter(lp => {
      const score = calculateHealthScore(lp.id);
      return score.overall < 40;
    }).length;
  }, []);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          
          {!lpId && atRiskCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-full">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs font-medium text-red-600">{atRiskCount} relationship{atRiskCount > 1 ? 's' : ''} at risk</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{healthScore.overall}</h3>
              <p className="text-sm text-gray-500">Overall Health Score</p>
            </div>
            <div className={`text-right ${healthStatusColor(healthScore.overall)}`}>
              <span className="text-lg font-semibold">{healthStatusLabel(healthScore.overall)}</span>
              <p className="text-sm">Relationship Status</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress 
              value={healthScore.overall} 
              max={100} 
              className="h-2.5 bg-gray-100" 
              indicatorClassName={`${healthStatusColor(healthScore.overall).replace('text-', 'bg-')}`}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <HealthScoreCard 
            score={healthScore.recency}
            label="Recency"
            icon={<Clock className="h-4 w-4 text-blue-600" />}
            description="Measures how recently you've had contact with this investor. Higher scores mean more recent contact."
          />
          
          <HealthScoreCard 
            score={healthScore.frequency}
            label="Frequency"
            icon={<BarChart2 className="h-4 w-4 text-purple-600" />}
            description="Measures how often you communicate with this investor. Higher scores mean more regular communication."
          />
          
          <HealthScoreCard 
            score={healthScore.sentiment}
            label="Sentiment"
            icon={<Heart className="h-4 w-4 text-red-600" />}
            description="Measures the overall positivity of your communications. Higher scores indicate more positive interactions."
          />
          
          <HealthScoreCard 
            score={healthScore.engagement}
            label="Engagement"
            icon={<Activity className="h-4 w-4 text-green-600" />}
            description="Measures how engaged the investor is based on follow-ups and incoming communications. Higher scores mean more active engagement."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipHealthScore;