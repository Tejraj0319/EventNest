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
    // image: "",
    image: null,
    category: "",
  });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     title: formData.title,
  //     description: formData.description,
  //     location: formData.location,
  //     price: Number(formData.price),
  //     totalSeats: Number(formData.totalSeats),
  //     date: new Date(formData.date).toISOString(),
  //     category: formData.category,
  //   };
  //   if (formData.image.trim()) {
  //     payload.image = formData.image;
  //   }
  //   const result = await dispatch(createEvent(payload));
  //   if (result.meta.requestStatus === "fulfilled") {
  //     alert("Event Created Successfully");
  //     navigate("/events");
  //   }
  // };

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
    <div>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="totalSeats"
          type="number"
          placeholder="Total Seats"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="date"
          type="datetime-local"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
