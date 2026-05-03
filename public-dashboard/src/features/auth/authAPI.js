import API from "../../api/axios";

export const registerUserAPI = async (userData) => {
    const res = await API.post("/auth/register", userData);
    return res.data;
}

export const loginUserAPI = async (userData) => {
    const res = await API.post("/auth/login", userData);
    return res.data;
}