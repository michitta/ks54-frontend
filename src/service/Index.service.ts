import api from "../utils/api";

export const indexService = {
  async getSchedule() {
    return api.get("/schedules").then((res) => res?.data);
  },
};
