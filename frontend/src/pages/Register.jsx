import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Icon from "../components/AppIcon";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    agree: false
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        !form.fullName ||
        !form.email ||
        !form.rollNo ||
        !form.password ||
        !form.confirmPassword
      ) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!form.agree) {
        setError("You must accept terms");
        setLoading(false);
        return;
      }

      register({
        id: Date.now(),
        name: form.fullName,
        email: form.email,
        rollNo: form.rollNo,
        type: "student"
      });

      navigate("/student-profile");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border">

        <h1 className="text-3xl font-bold text-center mb-2">
          Student Registration
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input name="fullName" placeholder="Full Name" onChange={handleChange} />
          <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <Input name="rollNo" placeholder="Roll Number" onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
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
