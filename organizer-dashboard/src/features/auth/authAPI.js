import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000/api/v1",
    baseURL: import.meta.env.VITE_API_URL,
})

export const loginOrganizerAPI = async (data) => {
    const response = await API.post("auth/login", data)
    return response.data
}