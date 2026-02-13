import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    branch: "",
    year: "",
    section: "",
    password: "",
    confirmPassword: "",
    agree: false
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

    // Validation
    if (
      !form.fullName ||
      !form.email ||
      !form.rollNo ||
      !form.branch ||
      !form.year ||
      !form.section ||
      !form.password ||
      !form.confirmPassword
    ) {
      return setError("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!form.agree) {
      return setError("You must accept terms");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          rollNo: form.rollNo,
          branch: form.branch.trim(),
          year: form.year ? Number(form.year) : undefined,
          section: form.section.trim(),
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/student-profile");
    } catch (err) {
      setError(err.message);
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
          <Input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <Input
            name="rollNo"
            placeholder="Roll Number"
            onChange={handleChange}
          />

          <Input
            name="branch"
            placeholder="Branch (e.g. BCA, CSE, AI, MECH)"
            onChange={handleChange}
          />

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

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="agree" onChange={handleChange} />
            I agree to terms and privacy policy
          </label>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
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
