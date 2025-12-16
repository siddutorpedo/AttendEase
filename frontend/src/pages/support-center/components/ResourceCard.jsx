import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ icon, title, description, fileType, fileSize, downloads, onDownload }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-soft transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={24} className="text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="FileType" size={14} />
              <span>{fileType}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="HardDrive" size={14} />
              <span>{fileSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Download" size={14} />
              <span>{downloads} downloads</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onDownload}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;