import axios from "axios";

// console.log(process.env.API_URL);

const api = axios.create({ baseURL: "http://localhost:3000/api/" });

export default api;
