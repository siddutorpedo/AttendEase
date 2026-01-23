import React, { useEffect, useState } from "react";
//import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";

const API = "http://localhost:5000/api/students";

const ManageStudents = () => {
  const { students, setStudents } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
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
    if (!formData.name || !formData.roll || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const savedStudent = await res.json();

      // ✅ Update UI after DB save
      setStudents((prev) => [...prev, savedStudent]);

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
      roll: "",
      email: "",
      branch: "BCA",
    });
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

    {/* STUDENT LIST (whatever you already had) */}
    {/* DO NOT CHANGE YOUR DESIGN HERE */}

  </div>
);

};

export default ManageStudents;
