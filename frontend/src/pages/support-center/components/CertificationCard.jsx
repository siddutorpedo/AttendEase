import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CertificationCard = ({ badge, badgeAlt, title, description, level, duration, enrolled, progress, onEnroll, onContinue }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-300">
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-card shadow-soft flex items-center justify-center">
          <Image
            src={badge}
            alt={badgeAlt}
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full bg-primary text-primary-foreground">
          {level}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Users" size={14} />
            <span>{enrolled} enrolled</span>
          </div>
        </div>

        {progress !== undefined ? (
          <>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <Button
              variant="default"
              fullWidth
              iconName="PlayCircle"
              iconPosition="left"
              onClick={onContinue}
            >
              Continue Learning
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            fullWidth
            iconName="Award"
            iconPosition="left"
            onClick={onEnroll}
          >
            Enroll Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;