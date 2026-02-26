import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectAttendanceDetails = ({ subjects, selectedSubject, onSelectSubject }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Subject-wise Attendance Details</h3>
      
      {/* Subject Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedSubject === subject.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      {/* Subject Details */}
      {subjects.map((subject) => {
        if (selectedSubject !== subject.id) return null;

        const total = subject.totalClasses || 0;
        const attended = subject.classesAttended || 0;
        const absences = subject.absences || 0;
        const percentage =
          total === 0 ? 0 : Math.round((attended / total) * 100);

        return (
          <div key={subject.id} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Classes</p>
                    <p className="text-2xl font-bold text-foreground">{total}</p>
                  </div>
                  <Icon name="BookOpen" size={32} className="text-primary opacity-50" />
                </div>
              </div>
              
              <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-success mb-1">Classes Attended</p>
                    <p className="text-2xl font-bold text-success">{attended}</p>
                  </div>
                  <Icon name="CheckCircle2" size={32} className="text-success opacity-50" />
                </div>
              </div>
              
              <div className="bg-error/10 rounded-lg p-4 border border-error/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-error mb-1">Absences</p>
                    <p className="text-2xl font-bold text-error">{absences}</p>
                  </div>
                  <Icon name="XCircle" size={32} className="text-error opacity-50" />
                </div>
              </div>
            </div>
            
            {/* Attendance Percentage */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Attendance Rate</p>
                <p className="text-lg font-bold text-primary">
                  {percentage}%
                </p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectAttendanceDetails;
