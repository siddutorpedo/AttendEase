import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExcuseDocumentation = ({ submissions, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    reason: '',
    description: '',
    document: null
  });

  const reasonOptions = [
    { value: 'medical', label: 'Medical Appointment' },
    { value: 'illness', label: 'Illness' },
    { value: 'family', label: 'Family Emergency' },
    { value: 'religious', label: 'Religious Observance' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    setFormData({ date: '', reason: '', description: '', document: null });
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning/10 text-warning',
      approved: 'bg-success/10 text-success',
      rejected: 'bg-error/10 text-error'
    };
    return badges?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="FileText" size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Excuse Documentation</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          iconName={showForm ? "X" : "Plus"} 
          iconPosition="left"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Submit Excuse'}
        </Button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-muted/50 rounded-lg space-y-4">
          <Input
            type="date"
            label="Absence Date"
            required
            value={formData?.date}
            onChange={(e) => setFormData({ ...formData, date: e?.target?.value })}
          />
          
          <Select
            label="Reason for Absence"
            required
            options={reasonOptions}
            value={formData?.reason}
            onChange={(value) => setFormData({ ...formData, reason: value })}
            placeholder="Select a reason"
          />

          <Input
            type="text"
            label="Description"
            required
            placeholder="Provide additional details"
            value={formData?.description}
            onChange={(e) => setFormData({ ...formData, description: e?.target?.value })}
          />

          <Input
            type="file"
            label="Supporting Document (Optional)"
            description="Upload medical certificate, note, or other documentation"
            onChange={(e) => setFormData({ ...formData, document: e?.target?.files?.[0] })}
          />

          <Button type="submit" variant="default" fullWidth>
            Submit Excuse
          </Button>
        </form>
      )}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground mb-4">Submission History</h3>
        {submissions?.map((submission, index) => (
          <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{submission?.reason}</h4>
                  <p className="text-xs text-muted-foreground">Submitted on {submission?.submittedDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(submission?.status)}`}>
                  {submission?.status?.charAt(0)?.toUpperCase() + submission?.status?.slice(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{submission?.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  Absence Date: {submission?.absenceDate}
                </span>
                {submission?.reviewedBy && (
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={12} />
                    Reviewed by: {submission?.reviewedBy}
                  </span>
                )}
              </div>
              {submission?.document && (
                <div className="mt-2 flex items-center gap-2 text-xs text-primary">
                  <Icon name="Paperclip" size={12} />
                  <span>{submission?.document}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcuseDocumentation;