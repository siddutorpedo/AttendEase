import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AtRiskStudents = ({ students }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskLabel = (level) => {
    switch (level) {
      case 'high':
        return 'High Risk';
      case 'medium':
        return 'Medium Risk';
      case 'low':
        return 'Low Risk';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">At-Risk Students</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="AlertTriangle" size={16} />
          <span>Predictive Analysis</span>
        </div>
      </div>
      <div className="space-y-3">
        {students?.map((student) => (
          <div 
            key={student?.id}
            className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-300"
          >
            <div className="relative">
              <Image
                src={student?.avatar}
                alt={student?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${
                student?.riskLevel === 'high' ? 'bg-error' : 
                student?.riskLevel === 'medium' ? 'bg-warning' : 'bg-success'
              }`}>
                <Icon name="AlertCircle" size={12} color="#FFFFFF" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">{student?.name}</h4>
              <p className="text-xs text-muted-foreground">{student?.class} • ID: {student?.studentId}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getRiskColor(student?.riskLevel)}`}>
                {getRiskLabel(student?.riskLevel)}
              </span>
              <span className="text-xs text-muted-foreground">{student?.attendanceRate}% attendance</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtRiskStudents;