import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../features/events/eventSlice";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    totalSeats: "",
    date: "",
    image: null,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("price", formData.price);
    payload.append("totalSeats", formData.totalSeats);
    payload.append("date", new Date(formData.date).toISOString());
    payload.append("category", formData.category);

    if (formData.image) {
      payload.append("image", formData.image);
    }

    const result = await dispatch(createEvent(payload));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Event Created Successfully");
      navigate("/events");
    }
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold leading-none">
          Create Event
        </h2>

        <p className="text-slate-400 text-sm mt-2">
          Add a new event and publish it for bookings.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6"
      >
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Event Title
            </label>

            <input
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Location
            </label>

            <input
              name="location"
              placeholder="Enter location"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">Price</label>

            <input
              name="price"
              type="number"
              placeholder="Enter price"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Total Seats
            </label>

            <input
              name="totalSeats"
              type="number"
              placeholder="Enter seats"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Event Date
            </label>

            <input
              name="date"
              type="datetime-local"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Category
            </label>

            <input
              name="category"
              placeholder="Music / Sports / Tech"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Upload */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-slate-300">
              Upload Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-cyan-500 file:text-black file:font-medium hover:file:bg-cyan-600"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Write event details..."
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 resize-none focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/events")}
            className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
