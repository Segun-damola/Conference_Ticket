"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; avatar?: string }>({});
  const [ticket, setTicket] = useState<{ fullName: string; email: string; avatar: string } | null>(null);

  // Load persisted data from localStorage
  useEffect(() => {
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    const savedAvatar = localStorage.getItem("avatar");
    if (savedFullName) setFullName(savedFullName);
    if (savedEmail) setEmail(savedEmail);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("avatar", avatar);
  }, [fullName, email, avatar]);

  // Form validation
  const validateForm = () => {
    let valid = true;
    let newErrors: { fullName?: string; email?: string; avatar?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }
    if (!avatar.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/)) {
      newErrors.avatar = "Enter a valid image URL";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setTicket({ fullName, email, avatar });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Conference Ticket Generator</h1>

      <form onSubmit={handleSubmit} className="bg-green-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full p-2 rounded bg-green-700 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Cloudinary or image URL"
          />
          {errors.avatar && <p className="text-red-400 text-sm mt-1">{errors.avatar}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 p-2 rounded text-white font-bold hover:bg-green-500 transition"
        >
          Generate Ticket
        </button>
      </form>

      {ticket && (
        <div className="mt-6 p-6 bg-green-700 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-2">Your Ticket</h2>
          <p className="mb-1"><strong>Name:</strong> {ticket.fullName}</p>
          <p className="mb-1"><strong>Email:</strong> {ticket.email}</p>
          <img src={ticket.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mt-2 border-4 border-green-400" />
        </div>
      )}
    </div>
  );
}
