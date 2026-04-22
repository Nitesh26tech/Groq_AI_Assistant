import axios from "axios";

const API = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const askAI = (data) => API.post("/chat" , data);

export default API;