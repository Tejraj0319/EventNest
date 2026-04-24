import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

export const loginAdminAPI = async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
};