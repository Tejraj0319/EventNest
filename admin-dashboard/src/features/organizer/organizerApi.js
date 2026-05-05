import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// USER
export const createOrganizerRequestAPI = (data) =>
    API.post("/organizer-request", data);

// ADMIN
export const getAllRequestsAPI = () =>
    API.get("/organizer-request");

export const approveRequestAPI = (id) =>
    API.patch(`/organizer-request/${id}/approve`);

export const rejectRequestAPI = (id) =>
    API.patch(`/organizer-request/${id}/reject`);