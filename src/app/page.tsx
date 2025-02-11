"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [ticketGenerated, setTicketGenerated] = useState(false);

  // Load saved data from local storage
  useEffect(() => {
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    const savedAvatarUrl = localStorage.getItem("avatarUrl");

    if (savedFullName) setFullName(savedFullName);
    if (savedEmail) setEmail(savedEmail);
    if (savedAvatarUrl) setAvatarUrl(savedAvatarUrl);
  }, []);

  // Save data to local storage on change
  useEffect(() => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("avatarUrl", avatarUrl);
  }, [fullName, email, avatarUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email.";
    if (!avatarUrl.trim() || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(avatarUrl))
      newErrors.avatarUrl = "Enter a valid image URL.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTicketGenerated(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-900 text-white p-6">
      <div className="w-full max-w-md bg-green-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Conference Ticket Generator</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-green-500"
              required
            />
            {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-green-500"
              required
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="avatarUrl" className="block text-sm font-medium">
              Avatar URL (Cloudinary or External)
            </label>
            <input
              type="url"
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-green-500"
              required
            />
            {errors.avatarUrl && <p className="text-red-400 text-sm">{errors.avatarUrl}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400 text-white py-2 rounded-md transition"
          >
            Generate Ticket
          </button>
        </form>

        {/* Ticket Display */}
        {ticketGenerated && (
          <div className="mt-6 p-4 bg-green-700 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold">Your Conference Ticket</h3>
            <p className="text-gray-300">{fullName}</p>
            <p className="text-gray-300">{email}</p>
            <div className="flex justify-center mt-2">
              <Image src={avatarUrl} alt="Avatar" width={100} height={100} className="rounded-full border-2 border-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
