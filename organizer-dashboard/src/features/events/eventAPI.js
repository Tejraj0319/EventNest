import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})

export const fetchEventsAPI = () => API.get("/events");

export const createEventAPI = (data) => API.post("/events", data);

export const deleteEventAPI = (id) => API.delete(`/events/${id}`);

export const updateEventAPI = (id, data) => API.put(`/events/${id}`, data);

export const fetchMyEventsAPI = () => API.get("/events/my-events")
