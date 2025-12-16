import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, iconBg }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
          {change && (
            <div className="flex items-center gap-1">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                color={changeType === 'increase' ? 'var(--color-success)' : 'var(--color-error)'}
              />
              <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-success' : 'text-error'}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon name={icon} size={24} color="#FFFFFF" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;