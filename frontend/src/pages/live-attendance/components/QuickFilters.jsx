import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickFilters = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    { id: 'all', label: 'All Students', icon: 'Users', count: counts?.all },
    {
      id: 'present',
      label: 'Present',
      icon: 'CheckCircle2',
      count: counts?.present,
    },
    { id: 'absent', label: 'Absent', icon: 'XCircle', count: counts?.absent },
    { id: 'late', label: 'Late', icon: 'Clock', count: counts?.late },
    {
      id: 'excused',
      label: 'Excused',
      icon: 'FileCheck',
      count: counts?.excused,
    },
    {
      id: 'unmarked',
      label: 'Unmarked',
      icon: 'Circle',
      count: counts?.unmarked,
    },
    {
      id: 'concerns',
      label: 'Concerns',
      icon: 'AlertTriangle',
      count: counts?.concerns,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters?.map((filter) => (
        <Button
          key={filter?.id}
          variant={activeFilter === filter?.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter?.id)}
          className="transition-all duration-300"
        >
          <Icon name={filter?.icon} size={16} className="mr-2" />
          {filter?.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeFilter === filter?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {filter?.count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default QuickFilters;