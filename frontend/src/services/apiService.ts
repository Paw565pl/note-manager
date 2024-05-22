import { auth } from "@/auth";
import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.API_BASE_URL,
});

apiService.interceptors.request.use(async (request) => {
  const session = await auth();

  if (session?.access_token) {
    request.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return request;
});

export default apiService;
