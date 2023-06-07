import api from "../utils/api";

export const authService = {
  async login(username: string, password: string) {
    return api.post('/auth/login', {
      username,
      password
    });
  },

  async me() {
    return api.get("/auth/@me").then(res => res.data).catch(() => null);
  },
};
