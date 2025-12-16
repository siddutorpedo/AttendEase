import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
          <Icon name={icon} size={24} className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
      </div>
    </div>
  );
};

export default QuickActionCard;