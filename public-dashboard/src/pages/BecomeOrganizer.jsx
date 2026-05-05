import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createRequest } from "../features/organizer/organizerSlice";

const BecomeOrganizer = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.organizer);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    organization: "",
    experience: "",
    eventType: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRequest(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      
      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Become an Organizer
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Host your own events and grow your audience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Organization */}
          <input
            name="organization"
            placeholder="Organization (Optional)"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Experience */}
          <textarea
            name="experience"
            placeholder="Your Experience in Hosting Events"
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Event Type */}
          <input
            name="eventType"
            placeholder="Type of Events (e.g. Tech, Music, Workshop)"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Why should we approve you?"
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-semibold"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {/* Feedback */}
        {success && (
          <p className="mt-4 text-green-400 text-center">
            Request sent successfully!
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-400 text-center">
           {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default BecomeOrganizer;