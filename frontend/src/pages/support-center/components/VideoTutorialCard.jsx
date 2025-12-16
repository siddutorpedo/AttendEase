import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideoTutorialCard = ({ thumbnail, thumbnailAlt, title, duration, views, category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Icon name="Play" size={28} className="text-primary-foreground ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-primary font-medium mb-2">{category}</div>
        <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            <span>{views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTutorialCard;