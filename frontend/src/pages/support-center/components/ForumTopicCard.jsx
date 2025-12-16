import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ForumTopicCard = ({ title, author, authorAvatar, authorAvatarAlt, replies, views, lastActivity, category, solved, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-5 hover:shadow-soft transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={authorAvatar}
            alt={authorAvatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            {solved && (
              <div className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded flex-shrink-0">
                <Icon name="CheckCircle2" size={14} />
                <span>Solved</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="font-medium">{author}</span>
            <span>•</span>
            <span className="text-primary">{category}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="MessageSquare" size={14} />
              <span>{replies} replies</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              <span>{views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{lastActivity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumTopicCard;