import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalInformation = ({ student }) => {
  const infoItems = [
    { icon: 'Mail', label: 'Email', value: student?.email },
    { icon: 'Phone', label: 'Phone', value: student?.phone },
    { icon: 'Calendar', label: 'Date of Birth', value: student?.dateOfBirth },
    { icon: 'MapPin', label: 'Address', value: student?.address },
    { icon: 'Users', label: 'Parent/Guardian', value: student?.parentName },
    { icon: 'Phone', label: 'Emergency Contact', value: student?.emergencyContact },
    { icon: 'Heart', label: 'Blood Group', value: student?.bloodGroup },
    { icon: 'AlertCircle', label: 'Medical Alerts', value: student?.medicalAlerts }
  ];

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="User" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems?.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={item?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">{item?.label}</p>
              <p className="text-sm font-medium text-foreground break-words">{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;