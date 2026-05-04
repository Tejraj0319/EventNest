import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, fetchEvents } from "../../features/events/eventSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events, loading } = useSelector((state) => state.events);

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

  // Fetch events if not loaded
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  // Find event
  useEffect(() => {
    const event = events.find((e) => e.id === Number(id));

    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        location: event.location,
        price: event.price,
        totalSeats: event.totalSeats,
        date: event.date?.slice(0, 16),
        image: event.image || "",
        category: event.category || "",
      });
    }
  }, [events, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    payload.append("date", formData.date);
    payload.append("category", formData.category);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    const result = await dispatch(updateEvent({ id, data: payload }));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Event Updated Successfully");
      navigate("/events");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-cyan-400 text-lg font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Edit Event</h2>
        <p className="text-slate-400 mt-1 text-sm">
          Update your event details and save changes.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6"
      >
        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Event Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Total Seats
            </label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Event Date
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
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
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-slate-300">
              Image URL
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0],
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition"
          >
            {loading ? "Updating..." : "Update Event"}
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

export default EditEvent;
