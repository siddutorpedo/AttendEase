import { useEffect, useState, useMemo } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";
import subjectService from "../../services/subjectService";

const ManageSubjects = () => {
  const { subjects, setSubjects } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Filter states
  const [filterYear, setFilterYear] = useState("");
  const [filterBranch, setFilterBranch] = useState("");

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    branch: "",
    year: "",
  });

  const yearOptions = [1, 2, 3, 4, 5];

  // Derive unique branches from subjects
  const branches = useMemo(() => {
    const branchSet = new Set(
      subjects.map((s) => s.branch).filter(Boolean)
    );
    return [...branchSet].sort();
  }, [subjects]);

  // Filtered subjects based on dropdown selections
  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchYear = filterYear
        ? String(s.year) === String(filterYear)
        : true;
      const matchBranch = filterBranch ? s.branch === filterBranch : true;
      return matchYear && matchBranch;
    });
  }, [subjects, filterYear, filterBranch]);

  // ✅ LOAD FROM DB
  useEffect(() => {
    subjectService.getAll()
      .then((data) =>
        setSubjects((data || []).map((s) => ({ ...s, id: s._id || s.id })))
      )
      .catch(() => {});
  }, [setSubjects]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      await subjectService.delete(id);
      setSubjects((prev) => prev.filter((s) => s._id !== id && s.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete subject");
    }
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

    const payload = {
      ...formData,
      year: formData.year ? Number(formData.year) : undefined,
    };

    try {
      const saved = editingId
        ? await subjectService.update(editingId, payload)
        : await subjectService.create(payload);

      const normalized = { ...saved, id: saved._id || saved.id };
      if (editingId) {
        setSubjects((prev) =>
          prev.map((s) =>
            s._id === editingId || s.id === editingId ? normalized : s
          )
        );
      } else {
        setSubjects((prev) => [...prev, normalized]);
      }
      handleCloseModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save subject");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">
          Manage Subjects
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
        >
          Add Subject
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-4">
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 cursor-pointer min-w-[160px] appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: '36px',
          }}
        >
          <option value="">Select Year</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </select>

        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 cursor-pointer min-w-[160px] appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: '36px',
          }}
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Subject List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredSubjects.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground text-sm">
            No subjects found.
          </div>
        ) : (
          filteredSubjects.map((subject, index) => (
            <div
              key={subject._id || subject.id}
              className={`flex justify-between items-center px-6 py-4 hover:bg-muted/50 transition-colors duration-150 ${index !== filteredSubjects.length - 1
                  ? "border-b border-border"
                  : ""
                }`}
            >
              <div>
                <p className="font-semibold text-foreground text-[15px]">
                  {subject.name}
                </p>
                {(subject.branch || subject.year) && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {[
                      subject.branch,
                      subject.year != null
                        ? `Year ${subject.year}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(subject._id || subject.id)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  title="Edit subject"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  onClick={() => handleDelete(subject._id || subject.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
                  title="Delete subject"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-200">
          <div className="bg-card p-6 rounded-xl shadow-elevated w-[420px] border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-5">
              {editingId ? "Edit Subject" : "Add Subject"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                name="code"
                placeholder="Subject Code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              />
              <input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch (e.g. BCA, CSE, AI)"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              />
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              >
                <option value="">Select Year</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-200 shadow-sm"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;
