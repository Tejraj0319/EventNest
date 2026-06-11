import API from "../../api/axios";

export const fetchEventsAPI = async () => {
  const res = await API.get("/events");
  return res.data;
};

export const fetchEventByIdAPI = async (id) => {
  const res = await API.get(`/events/${id}`);
  return res.data;
};