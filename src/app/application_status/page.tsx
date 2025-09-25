"use client";

import React, { useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import { useRouter } from "next/navigation";

const ApplicationStatus = () => {
  const [prospectiveId, setProspectiveId] = useState("");
  const [password, setPassword] = useState("");
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const snapshot = await get(
        ref(db, `applications/students/${prospectiveId}`)
      );
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.tempPassword === password) {
          setApplication(data);
          router.push(
            `/application_status/application_status_home?pid=${prospectiveId}`
          );
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else {
        setError("No application found with this ID.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sideImageUrl =
    "https://images.unsplash.com/photo-1645263012668-a6617115f9b9?q=80&w=1170&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      {/* Connected Card */}
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
            <h1 className="text-3xl font-bold text-white">
              Application Status
            </h1>
            <p className="text-white/90">Prospective Student Login</p>
          </div>

          {/* Contact Bar */}
          <div className="bg-[#BD9946] px-4 py-3 text-center">
            <p className="text-white text-sm font-medium">
              Questions? Contact Admissions:{" "}
              <span className="font-semibold">+234 (812) 772 8084</span> |{" "}
              <span className="font-semibold">admission@sauni.edu.ng</span>
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            {!application ? (
              <form onSubmit={checkStatus} className="space-y-6">
                {/* ID */}
                <div>
                  <label
                    htmlFor="prospectiveId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prospective ID
                  </label>
                  <input
                    type="text"
                    id="prospectiveId"
                    value={prospectiveId}
                    onChange={(e) => setProspectiveId(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#BD9946] focus:border-transparent"
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
                  {loading ? "Checking..." : "Check Status"}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Login successful! Redirecting...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
