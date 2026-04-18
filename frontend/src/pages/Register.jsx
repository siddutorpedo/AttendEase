import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import authService from "../services/authService";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { refreshData } = useData();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    branch: "",
    year: "",
    section: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.fullName ||
      !form.email ||
      !form.rollNo ||
      !form.branch ||
      !form.password ||
      !form.confirmPassword
    ) {
      return setError("All fields are required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!form.agree) {
      return setError("You must accept terms");
    }

    setLoading(true);
    try {
      const data = await authService.register({
        name: form.fullName,
        email: form.email,
        rollNo: form.rollNo,
        branch: form.branch.trim(),
        year: form.year ? Number(form.year) : undefined,
        section: form.section.trim(),
        password: form.password,
      });

      // Auto-login after registration
      if (data.token) {
        register(
          {
            id: data.user?.id,
            name: data.user?.name || form.fullName,
            email: data.user?.email || form.email,
            role: "student",
            type: "student",
          },
          data.token
        );
        refreshData();
        navigate("/student-profile");
      } else {
        // If no token, redirect to login
        navigate("/login");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(", ") ||
        err.message ||
        "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold text-center mb-4">
          Student Registration
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input name="fullName" placeholder="Full Name" onChange={handleChange} />
          <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <Input name="rollNo" placeholder="Roll Number" onChange={handleChange} />
          <Input name="branch" placeholder="Branch (e.g. BCA, CSE)" onChange={handleChange} />
          <Input
            name="year"
            type="number"
            placeholder="Year (e.g. 1, 2, 3)"
            value={form.year}
            onChange={handleChange}
          />
          <Input
            name="section"
            placeholder="Section (e.g. A, B)"
            value={form.section}
            onChange={handleChange}
          />
          <Input name="password" type="password" placeholder="Password (min 6 chars)" onChange={handleChange} />
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="agree" onChange={handleChange} />
            I agree to terms and privacy policy
          </label>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <Button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-muted"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
