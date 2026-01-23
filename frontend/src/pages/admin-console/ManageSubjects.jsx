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
    branch: "BCA",
  });

  const branchOptions = ["BCA", "BCOM", "BA"];

  // ✅ LOAD FROM DB
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setSubjects(data));
  }, [setSubjects]);

  const handleSave = async () => {
    if (!formData.code || !formData.name) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const saved = await res.json();
    setSubjects((prev) => [...prev, saved]);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setSubjects((prev) => prev.filter((s) => s._id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: "", name: "", branch: "BCA" });
  };

  return (
    <div>
      {/* 🔒 UI LEFT EXACTLY SAME */}
      {/* ONLY LOGIC CHANGED */}
    </div>
  );
};

export default ManageSubjects;
