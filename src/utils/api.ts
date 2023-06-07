import { toast } from "react-hot-toast";
import axios from "axios";

const api = axios.create({
  baseURL: "https://owocon.eu.org/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  ({ request, response }) => {
    toast.error(response?.data?.message);
    return null;
  }
);

export default api;
