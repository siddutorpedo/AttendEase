import React from 'react';
import Icon from '../../../components/AppIcon';

const StatCard = ({ icon, title, value, change, changeType, subtitle }) => {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon name={icon} size={24} color="var(--color-primary)" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${changeColors?.[changeType]}`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;