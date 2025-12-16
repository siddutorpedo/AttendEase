import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoalsAndInterventions = ({ goals, interventions, onAddGoal }) => {
  const getGoalProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Target" size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Goals & Interventions</h2>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" onClick={onAddGoal}>
          Add Goal
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Active Goals</h3>
          <div className="space-y-4">
            {goals?.map((goal, index) => {
              const progress = getGoalProgress(goal?.current, goal?.target);
              return (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-1">{goal?.title}</h4>
                      <p className="text-xs text-muted-foreground">{goal?.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal?.status === 'on-track' ? 'bg-success/10 text-success' :
                      goal?.status === 'at-risk'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {goal?.status === 'on-track' ? 'On Track' : goal?.status === 'at-risk' ? 'At Risk' : 'Behind'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress: {goal?.current} / {goal?.target} days</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          progress >= 75 ? 'bg-success' : progress >= 50 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Target Date: {goal?.targetDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Intervention History</h3>
          <div className="space-y-3">
            {interventions?.map((intervention, index) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon name="AlertCircle" size={20} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{intervention?.type}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{intervention?.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={12} />
                      {intervention?.counselor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {intervention?.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsAndInterventions;