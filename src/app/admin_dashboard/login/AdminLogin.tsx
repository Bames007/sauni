"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  email: string;
  role: "vc" | "admin" | "accounts" | "founder";
  displayName: string;
}

const ADMIN_CREDENTIALS: Record<string, AdminUser> = {
  "vc@sauni.edu.ng": {
    email: "vc@sauni.edu.ng",
    role: "vc",
    displayName: "Vice Chancellor",
  },
  "admin@sauni.edu.ng": {
    email: "admin@sauni.edu.ng",
    role: "admin",
    displayName: "Administrator",
  },
  "accounts@sauni.edu.ng": {
    email: "accounts@sauni.edu.ng",
    role: "accounts",
    displayName: "Accounts Officer",
  },
  "founder@sauni.edu.ng": {
    email: "founder@sauni.edu.ng",
    role: "founder",
    displayName: "Founder",
  },
};

const DEFAULT_PASSWORD = "1234567890";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate admin email
    if (!ADMIN_CREDENTIALS[email]) {
      setError("Unauthorized admin access.");
      setLoading(false);
      return;
    }

    // Validate password
    if (password !== DEFAULT_PASSWORD) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store admin data in session storage
      const adminData = ADMIN_CREDENTIALS[email];
      sessionStorage.setItem("adminUser", JSON.stringify(adminData));
      sessionStorage.setItem("isAuthenticated", "true");

      // Redirect to admin dashboard
      router.push(`/admin_dashboard/dashboard/?role=${adminData.role}`);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const sideImageUrl =
    "https://images.unsplash.com/photo-1645263012668-a6617115f9b9?q=80&w=1170&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-white">
        {/* Left Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${sideImageUrl})` }}
        ></div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* Header */}
          <div className="bg-[#017840] px-6 py-6 text-center">
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-white/90">University Administration System</p>
          </div>

          {/* Contact Bar */}
          <div className="bg-[#BD9946] px-4 py-3 text-center">
            <p className="text-white text-sm font-medium">
              System Access: Authorized Personnel Only
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleAdminLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#BD9946] focus:border-transparent"
                  placeholder="SAU Verified E-mail"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#BD9946] focus:border-transparent"
                  placeholder="Enter default password"
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#017840] to-[#BD9946] hover:from-[#016635] hover:to-[#ac8840] focus:ring-2 focus:ring-[#BD9946] disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.99]"
              >
                {loading ? "Signing In..." : "Access Admin Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
