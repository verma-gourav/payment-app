import React, { useState } from "react";
import authImage from "../assets/authImage.svg";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userApi } from "../api/userApi";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signin" ? false : true;
  const [isSignup, setIsSignup] = useState(initialMode);
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (mode: "signup" | "signin") => {
    setIsSignup(mode === "signup");
    setSearchParams({ mode }); // updates mode
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await userApi.signup(form);
        setIsSignup(false); // switch to signin
      } else {
        const res = await userApi.signin({
          username: form.username,
          password: form.password,
        });

        const token = res.data.token;
        login(token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Illustration */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-white">
        <img
          src={authImage}
          alt="auth illustration"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center  p-6">
        <div className="w-full max-w-md bg-light rounded-2xl shadow-md px-8 py-10 flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-2xl text-dark font-bold text-center mb-2">
            {isSignup ? "Create your account" : "Login to your account"}
          </h2>
          <p className="text-[#8f8f8f] text-sm mb-8 text-center">
            {isSignup ? "It's free and easy" : "Welcome back!"}
          </p>

          {/* Toggle */}
          <div className="flex justify-center gap-10 mb-8 font-medium text-lg">
            <button
              className={`pb-1 transition-all ${
                isSignup
                  ? "border-b-2 border-dark text-dark"
                  : "text-[#8f8f8f] hover:text-dark"
              }`}
              onClick={() => handleToggle("signup")}
              type="button"
            >
              SignUp
            </button>
            <button
              className={`pb-1 transition-all ${
                !isSignup
                  ? "border-b-2 border-dark text-dark"
                  : "text-[#8f8f8f] hover:text-dark"
              }`}
              onClick={() => handleToggle("signin")}
              type="button"
            >
              SignIn
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <Input
              label="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            {isSignup && (
              <div className="flex gap-3">
                <Input
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
            )}

            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <div className="pt-4 flex items-center justify-center">
              <Button
                variant="primary"
                size="lg"
                text={isSignup ? "SIGNUP" : "SIGNIN"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
