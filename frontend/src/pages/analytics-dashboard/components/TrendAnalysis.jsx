import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendAnalysis = ({ trends }) => {
  const getTrendIcon = (type) => {
    switch (type) {
      case 'improving':
        return { name: 'TrendingUp', color: 'text-success' };
      case 'declining':
        return { name: 'TrendingDown', color: 'text-error' };
      case 'stable':
        return { name: 'Minus', color: 'text-muted-foreground' };
      default:
        return { name: 'Activity', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="LineChart" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Trend Analysis</h3>
      </div>
      <div className="space-y-4">
        {trends?.map((trend) => {
          const trendIcon = getTrendIcon(trend?.type);
          return (
            <div key={trend?.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                trend?.type === 'improving' ? 'bg-success/10' :
                trend?.type === 'declining' ? 'bg-error/10' : 'bg-muted'
              }`}>
                <Icon name={trendIcon?.name} size={20} className={trendIcon?.color} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{trend?.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{trend?.description}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-muted-foreground">Period: {trend?.period}</span>
                  <span className={`font-medium ${trendIcon?.color}`}>
                    {trend?.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendAnalysis;