import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ icon, title, description, onClick, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card hover:bg-muted border-border',
    primary: 'bg-primary/10 hover:bg-primary/20 border-primary/30',
    success: 'bg-success/10 hover:bg-success/20 border-success/30',
    warning: 'bg-warning/10 hover:bg-warning/20 border-warning/30'
  };

  return (
    <button
      onClick={onClick}
      className={`${variantStyles?.[variant]} border rounded-lg p-6 transition-all duration-300 hover:shadow-elevated cursor-pointer text-left w-full`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${variant === 'default' ? 'bg-primary/10' : 'bg-white/20'}`}>
          <Icon name={icon} size={24} color={variant === 'default' ? 'var(--color-primary)' : 'currentColor'} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Icon name="ChevronRight" size={20} className="text-muted-foreground mt-1" />
      </div>
    </button>
  );
};

export default QuickActionCard;