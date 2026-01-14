import React from 'react';
import Icon from '../../components/AppIcon';

const Settings = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <Icon name="Settings" size={28} className="text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">No Settings Available</h3>
        <p className="text-muted-foreground">Settings will be available soon.</p>
      </div>
    </div>
  );
};

export default Settings;
