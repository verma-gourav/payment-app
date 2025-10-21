import axiosClient from "./axiosClient";

export const userApi = {
  signup: (data: any) => axiosClient.post("/auth/signup", data),
  signin: (data: any) => axiosClient.post("/auth/signin", data),
  profile: () => axiosClient.get("/user/me"),
  search: (username: string) => axiosClient.get(`/user/search?q=${username}`),
};
