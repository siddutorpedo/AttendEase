import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AttendanceControls = ({
  onMarkAll,
  onUndo,
  onSync,
  canUndo,
  isSyncing,
  isOffline,
  selectedCount,
  totalCount,
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            iconName="CheckCircle2"
            iconPosition="left"
            onClick={() => onMarkAll('present')}
          >
            Mark All Present
          </Button>
          <Button
            variant="outline"
            iconName="XCircle"
            iconPosition="left"
            onClick={() => onMarkAll('absent')}
          >
            Mark All Absent
          </Button>
          <Button
            variant="ghost"
            iconName="Undo2"
            iconPosition="left"
            disabled={!canUndo}
            onClick={onUndo}
          >
            Undo
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {isOffline && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning rounded-lg border border-warning/20">
              <Icon name="WifiOff" size={16} />
              <span className="text-sm font-medium">Offline Mode</span>
            </div>
          )}

          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            loading={isSyncing}
            onClick={onSync}
            disabled={!isOffline}
          >
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>

          <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
            <span className="text-sm font-semibold">
              {selectedCount} / {totalCount} Marked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceControls;