import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryCard = ({ icon, title, description, articleCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="FileText" size={14} />
            <span>{articleCount} articles</span>
          </div>
        </div>
        <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
};

export default CategoryCard;