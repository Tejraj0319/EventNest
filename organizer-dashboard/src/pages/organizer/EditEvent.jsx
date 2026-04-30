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
    image: "",  
  });

  // Fetch events if not already loaded
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  // Find current event
  useEffect(() => {
    const event = events.find((e) => e.id === Number(id));
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        location: event.location,
        price: event.price,
        totalSeats: event.totalSeats,
        date: event.date?.slice(0, 16), // for datetime-local
        image: event.image || "",
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

    const payload = {
      ...formData,
      price: Number(formData.price),
      totalSeats: Number(formData.totalSeats),
      date: new Date(formData.date).toISOString(),
    };

    if (!formData.image.trim()) {
      delete payload.image;
    }

    const result = await dispatch(updateEvent({ id, data: payload }));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Event Updated Successfully");
      navigate("/events");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Edit Event</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} required />
        <br /><br />

        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <br /><br />

        <input name="location" value={formData.location} onChange={handleChange} required />
        <br /><br />

        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        <br /><br />

        <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required />
        <br /><br />

        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
        <br /><br />

        <input name="image" value={formData.image} onChange={handleChange} />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;