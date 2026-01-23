import React, { useEffect, useState } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";

const API = "http://localhost:5000/api/students";

const ManageStudents = () => {
  const { students, setStudents } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    branch: "BCA",
  });

  const branchOptions = ["BCA", "BCOM", "BA"];

  /* ✅ LOAD STUDENTS FROM MONGODB ON PAGE LOAD */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };

    loadStudents();
  }, [setStudents]);

  /* INPUT HANDLER */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ADD STUDENT (SAVE TO MONGODB) */
  const handleSave = async () => {
    if (!formData.name || !formData.rollNo || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API}/${editingId}` : API;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const savedStudent = await res.json();

      if (editingId) {
        setStudents((prev) => prev.map(s => s._id === editingId ? savedStudent : s));
      } else {
        setStudents((prev) => [...prev, savedStudent]);
      }

      handleCloseModal();
    } catch (err) {
      console.error("Failed to save student:", err);
    }
  };

  /* DELETE STUDENT */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });

      // ✅ Update UI after delete
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete student:", err);
    }
  };

  /* CLOSE MODAL */
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "",
      rollNo: "",
      email: "",
      branch: "BCA",
    });
  };

  const handleEdit = (id) => {
    const student = students.find(s => s._id === id);
    setFormData(student);
    setEditingId(id);
    setShowModal(true);
  };

  return (
  <div className="space-y-6">

    {/* HEADER */}
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Manage Students</h2>

      {/* ✅ ADD BUTTON (THIS WAS MISSING) */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Add Student
      </button>
    </div>

    <div className="space-y-4">
      {students.map((student) => (
        <div key={student._id} className="flex justify-between items-center p-4 border rounded">
          <p className="font-medium">{student.name}</p>
          <div className="flex space-x-2">
            <button onClick={() => handleEdit(student._id)} className="p-2 text-blue-500 hover:bg-blue-100 rounded">
              <Icon name="Edit" size={16} />
            </button>
            <button onClick={() => handleDelete(student._id)} className="p-2 text-red-500 hover:bg-red-100 rounded">
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit Student" : "Add Student"}</h3>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          >
            {branchOptions.map(option => (
              <option key={option} value={option}>{option}</option>
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

export default ManageStudents;
