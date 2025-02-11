"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; avatarUrl?: string }>({});
  const [ticketGenerated, setTicketGenerated] = useState(false);

  useEffect(() => {
    setFullName(localStorage.getItem("fullName") || "");
    setEmail(localStorage.getItem("email") || "");
    setAvatarUrl(localStorage.getItem("avatarUrl") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("avatarUrl", avatarUrl);
  }, [fullName, email, avatarUrl]);

  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string; avatarUrl?: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Valid Email is required.";
    if (!avatarUrl.trim() || !avatarUrl.startsWith("http")) newErrors.avatarUrl = "Valid Avatar URL is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) setTicketGenerated(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Conference Ticket Generator</h1>

      <form onSubmit={handleSubmit} className="bg-green-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <label className="block">
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 mt-1 rounded-md text-black"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-400">{errors.fullName}</p>}
        </label>

        <label className="block">
          Email Address:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 rounded-md text-black"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-400">{errors.email}</p>}
        </label>

        <label className="block">
          Avatar URL:
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full p-2 mt-1 rounded-md text-black"
            placeholder="Enter Cloudinary image URL"
          />
          {errors.avatarUrl && <p className="text-red-400">{errors.avatarUrl}</p>}
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Ticket
        </button>
      </form>

      {ticketGenerated && (
        <div className="bg-green-700 p-6 rounded-lg shadow-lg mt-6 text-center max-w-md">
          <h2 className="text-xl font-bold">Your Conference Ticket</h2>
          <p className="mt-2"><strong>Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>

          <div className="mt-4 flex justify-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="User Avatar"
                width={150}
                height={150}
                className="rounded-full"
                unoptimized
              />
            ) : (
              <p className="text-red-400">Avatar URL is invalid.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
