import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ClassSelector = ({ classes, selectedClass, onClassChange, sessionInfo }) => {
  const classOptions = classes?.map((cls) => ({
    value: cls?.id,
    label: `${cls?.name} - ${cls?.subject}`,
    description: `${cls?.studentCount} students • ${cls?.schedule}`,
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Select
            label="Select Class"
            options={classOptions}
            value={selectedClass}
            onChange={onClassChange}
            searchable
            placeholder="Choose a class to mark attendance"
          />
        </div>

        <div className="flex flex-col justify-end">
          <div className="bg-muted rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Icon name="Calendar" size={14} />
                Date
              </span>
              <span className="font-semibold text-foreground">
                {sessionInfo?.date}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Icon name="Clock" size={14} />
                Session
              </span>
              <span className="font-semibold text-foreground">
                {sessionInfo?.session}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSelector;