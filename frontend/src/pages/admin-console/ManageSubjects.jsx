import React, { useState } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";

const ManageSubjects = () => {
  console.log("ManageSubjects rendered");

  const { subjects, setSubjects } = useData();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    branch: "BCA",
  });

  const branchOptions = ["BCA", "BCOM", "BA"];

  // ───────────── OPEN MODAL ─────────────
  const handleOpenAdd = () => {
    setFormData({ code: "", name: "", branch: "BCA" });
    setEditingId(null);
    setShowModal(true);
  };

  const handleOpenEdit = (subject) => {
    setFormData({
      code: subject.code,
      name: subject.name,
      branch: subject.branch,
    });
    setEditingId(subject.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: "", name: "", branch: "BCA" });
  };

  // ───────────── FORM HANDLING ─────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ───────────── SAVE SUBJECT ─────────────
  const handleSave = () => {
    if (!formData.code || !formData.name) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      // UPDATE
      setSubjects(
        subjects.map((s) =>
          s.id === editingId ? { ...formData, id: editingId } : s
        )
      );
    } else {
      // ADD
      setSubjects([
        ...subjects,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }

    handleCloseModal();
  };

  // ───────────── DELETE SUBJECT ─────────────
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Manage Subjects
      </h1>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">All Subjects</h3>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Icon name="Plus" size={18} />
            Add Subject
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Branch
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {subjects.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-6 text-center text-muted-foreground"
                  >
                    No subjects added yet
                  </td>
                </tr>
              )}

              {subjects.map((subject) => (
                <tr
                  key={subject.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {subject.branch}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleOpenEdit(subject)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Icon name="Edit" size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Icon name="Trash2" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 w-96">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {editingId ? "Edit Subject" : "Add New Subject"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Subject Code"
                className="w-full px-3 py-2 border border-border rounded-lg"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Subject Name"
                className="w-full px-3 py-2 border border-border rounded-lg"
              />

              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg"
              >
                {branchOptions.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;
