import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DateRangeSelector = ({ onRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState('week');

  const ranges = [
    { id: 'today', label: 'Today', icon: 'Calendar' },
    { id: 'week', label: 'This Week', icon: 'CalendarDays' },
    { id: 'month', label: 'This Month', icon: 'CalendarRange' },
    { id: 'quarter', label: 'This Quarter', icon: 'CalendarClock' },
    { id: 'year', label: 'This Year', icon: 'CalendarCheck' },
    { id: 'custom', label: 'Custom Range', icon: 'CalendarSearch' }
  ];

  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    if (onRangeChange) {
      onRangeChange(rangeId);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="CalendarRange" size={20} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Date Range</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {ranges?.map((range) => (
          <button
            key={range?.id}
            onClick={() => handleRangeSelect(range?.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
              selectedRange === range?.id
                ? 'bg-primary text-primary-foreground border-primary shadow-brand'
                : 'bg-background text-foreground border-border hover:bg-muted hover:border-primary/50'
            }`}
          >
            <Icon name={range?.icon} size={20} />
            <span className="text-xs font-medium text-center">{range?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateRangeSelector;