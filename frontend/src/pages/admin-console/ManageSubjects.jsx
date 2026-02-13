import React, { useEffect, useState } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";

const API = "http://localhost:5000/api/subjects";

const ManageSubjects = () => {
  const { subjects, setSubjects } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    branch: "",
    year: "",
  });

  const yearOptions = [1, 2, 3, 4, 5];

  // ✅ LOAD FROM DB
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) =>
        setSubjects((data || []).map((s) => ({ ...s, id: s._id || s.id })))
      );
  }, [setSubjects]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setSubjects((prev) => prev.filter((s) => s._id !== id && s.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: "", name: "", branch: "", year: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    const subject = subjects.find((s) => s._id === id || s.id === id);
    setFormData({
      code: subject.code || "",
      name: subject.name || "",
      branch: subject.branch || "",
      year: subject.year != null ? String(subject.year) : "",
    });
    setEditingId(id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.code || !formData.name) {
      alert("Please fill all fields");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    const payload = {
      ...formData,
      year: formData.year ? Number(formData.year) : undefined,
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const saved = await res.json();
    const normalized = { ...saved, id: saved._id || saved.id };
    if (editingId) {
      setSubjects((prev) =>
        prev.map((s) =>
          (s._id === editingId || s.id === editingId) ? normalized : s
        )
      );
    } else {
      setSubjects((prev) => [...prev, normalized]);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Subjects</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject._id || subject.id} className="flex justify-between items-center p-4 border rounded">
            <div>
              <p className="font-medium">{subject.name}</p>
              {(subject.branch || subject.year) && (
                <p className="text-sm text-muted-foreground">
                  {[subject.branch, subject.year != null ? `Year ${subject.year}` : null]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(subject._id)} className="p-2 text-blue-500 hover:bg-blue-100 rounded">
                <Icon name="Edit" size={16} />
              </button>
              <button onClick={() => handleDelete(subject._id)} className="p-2 text-red-500 hover:bg-red-100 rounded">
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit Subject" : "Add Subject"}</h3>
            <input
              type="text"
              name="code"
              placeholder="Subject Code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="name"
              placeholder="Subject Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch (e.g. BCA, CSE, AI)"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Year</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;
