import React from 'react';
import Icon from '../../../components/AppIcon';

const ArticleCard = ({ title, excerpt, category, readTime, helpful, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-5 hover:shadow-soft transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="text-xs text-primary font-medium">{category}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>{readTime} min read</span>
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="ThumbsUp" size={14} />
          <span>{helpful} found helpful</span>
        </div>
        <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
};

export default ArticleCard;