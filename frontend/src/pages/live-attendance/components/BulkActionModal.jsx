import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BulkActionModal = ({ isOpen, onClose, selectedStudents, onApply }) => {
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');

  const actionOptions = [
    { value: 'present', label: 'Mark as Present' },
    { value: 'absent', label: 'Mark as Absent' },
  ];

  const handleApply = () => {
    if (action) {
      onApply(action, reason);
      setAction('');
      setReason('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Bulk Action</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-primary font-medium">
              {selectedStudents?.length} student(s) selected
            </p>
          </div>

          <Select
            label="Select Action"
            options={actionOptions}
            value={action}
            onChange={setAction}
            placeholder="Choose an action"
            required
          />

          {action === 'absent' && (
            <Input
              label="Reason (Optional)"
              type="text"
              placeholder="Enter reason for this action"
              value={reason}
              onChange={(e) => setReason(e?.target?.value)}
            />
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleApply}
              disabled={!action}
              fullWidth
            >
              Apply to {selectedStudents?.length} Student(s)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionModal;