import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const createAuthHeader = (accessToken: string) =>
  `Bearer ${accessToken}`;

export default apiService;
