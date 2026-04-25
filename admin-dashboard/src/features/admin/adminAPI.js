import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const getToken = () => {return localStorage.getItem("token") }

const config = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})


export const fetchStatsAPI = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/stats`, config())
        return res.data;
    } catch (error) {
        console.error("Error fetching stats:", error)
    }
}

export const fetchUsersAPI = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/users`, config());
        return res.data;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export const fetchEventsAPI = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/events`, config());
        return res.data;
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

export const fetchBookingsAPI = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/bookings`, config());
        return res.data;
    } catch (error) {
        console.error("Error in fetching Bookings:", error);
    }
};

export const updateRoleAPI = async (id, role) => {
    try {
        const res = await axios.patch(`${BASE_URL}/admin/users/${id}/role`, { role }, config())
        return res.data;
    } catch (error) {
        console.error("Error in updating role:", error);
    }
}

export const blockUserAPI = async (id, isBlocked) => {
    try {
        const res = await axios.patch(
            `${BASE_URL}/admin/users/${id}/block`,
            { isBlocked },
            config());
        return res.data;
    } catch (error) {
        console.error("Error in block user:", error);
    }
};
