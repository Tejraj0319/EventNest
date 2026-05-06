import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000/api/v1/bookings",
    baseURL: import.meta.env.VITE_API_URL+"/api/v1/bookings",
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})

export const fetchMyBookingsAPI = async () => {
    const res = await API.get("/my-bookings");
    return res.data.data;
}

export const refundBookingAPI = async (id) => {
    const res = await API.post(`/refund/${id}`);
    return res.data;
};