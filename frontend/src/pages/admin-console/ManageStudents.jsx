import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import { useData } from '../../contexts/DataContext';

const ManageStudents = () => {
  const { students, setStudents } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    email: '',
    branch: 'BCA'
  });

  const branchOptions = ['BCA', 'BCOM', 'BA'];

  const handleOpenAdd = () => {
    setFormData({ name: '', roll: '', email: '', branch: 'BCA' });
    setEditingId(null);
    setShowModal(true);
  };

  const handleOpenEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', roll: '', email: '', branch: 'BCA' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.roll || !formData.email) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Manage Students</h1>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">All Students</h3>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Icon name="Plus" size={18} />
            Add Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Photo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Roll No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Branch</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => {
                // Generate avatar for admin view
                const initials = student.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase();
                const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8'];
                const colorIndex = students.findIndex(s => s.id === student.id) % colors.length;
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=${colors[colorIndex]}&color=fff&size=64&bold=true`;
                
                return (
                  <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <img 
                        src={avatarUrl}
                        alt={student.name}
                        className="w-10 h-10 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{student.roll}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{student.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{student.branch}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleOpenEdit(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Icon name="Edit" size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Icon name="Trash2" size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 w-96 max-w-full">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {editingId ? 'Edit Student' : 'Add New Student'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Roll No</label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Roll number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {branchOptions.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
