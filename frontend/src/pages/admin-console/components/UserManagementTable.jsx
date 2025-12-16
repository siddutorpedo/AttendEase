import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const UserManagementTable = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const users = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@attendease.edu",
    role: "Administrator",
    status: "Active",
    lastLogin: "2025-12-11 04:45 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15b51d2e4-1763293833337.png",
    avatarAlt: "Professional headshot of woman with blonde hair in navy blazer smiling warmly at camera"
  },
  {
    id: 2,
    name: "Prof. James Anderson",
    email: "james.anderson@attendease.edu",
    role: "Teacher",
    status: "Active",
    lastLogin: "2025-12-11 03:30 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_104d263f2-1765181753393.png",
    avatarAlt: "Professional headshot of middle-aged man with gray hair wearing glasses and dark suit"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@attendease.edu",
    role: "Teacher",
    status: "Active",
    lastLogin: "2025-12-10 11:20 PM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1631c1677-1763295642190.png",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in burgundy blouse"
  },
  {
    id: 4,
    name: "Michael Chen",
    email: "michael.chen@attendease.edu",
    role: "Support Staff",
    status: "Inactive",
    lastLogin: "2025-12-08 02:15 PM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a411ce08-1763300761967.png",
    avatarAlt: "Professional headshot of Asian man with short black hair in light blue shirt"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@attendease.edu",
    role: "Administrator",
    status: "Active",
    lastLogin: "2025-12-11 05:00 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17187f2d5-1763301571161.png",
    avatarAlt: "Professional headshot of woman with red hair in green blazer with confident expression"
  }];


  const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'administrator', label: 'Administrator' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'support', label: 'Support Staff' }];


  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }];


  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Administrator':
        return 'bg-primary/10 text-primary';
      case 'Teacher':
        return 'bg-secondary/10 text-secondary';
      case 'Support Staff':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">User Management</h3>
            <p className="text-sm text-muted-foreground">Manage system users and their permissions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={roleOptions}
              value={selectedRole}
              onChange={setSelectedRole}
              placeholder="Filter by role"
              className="w-full sm:w-48" />

            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Filter by status"
              className="w-full sm:w-48" />

            <Button variant="default" iconName="UserPlus" iconPosition="left">
              Add User
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users?.map((user) =>
            <tr key={user?.id} className="hover:bg-muted/30 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                      src={user?.avatar}
                      alt={user?.avatarAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{user?.lastLogin}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200" aria-label="Edit user">
                      <Icon name="Edit" size={16} color="var(--color-muted-foreground)" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200" aria-label="Delete user">
                      <Icon name="Trash2" size={16} color="var(--color-error)" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 5 of 127 users</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight" iconPosition="right">
            Next
          </Button>
        </div>
      </div>
    </div>);

};

export default UserManagementTable;