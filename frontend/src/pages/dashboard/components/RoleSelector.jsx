import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ currentRole, onRoleChange, availableRoles }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Icon name="UserCircle" size={20} className="text-muted-foreground" />
        <select
          value={currentRole}
          onChange={(e) => onRoleChange(e?.target?.value)}
          className="flex-1 bg-transparent text-sm font-medium text-foreground border-none outline-none cursor-pointer"
        >
          {availableRoles?.map((role) => (
            <option key={role?.value} value={role?.value}>
              {role?.label}
            </option>
          ))}
        </select>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default RoleSelector;