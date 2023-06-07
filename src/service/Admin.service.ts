import { toast } from "react-hot-toast";
import api from "../utils/api";

export const adminService = {
  async getGroups() {
    return api.get("/groups").then((res) => res?.data);
  },

  async addGroup(groupName: string) {
    const data = api.post("/groups", {
      groupName,
    });

    await toast.promise(data, {
      loading: "Отправка данных",
      success: "Группа добавлена!",
      error: "Ошибка при добавлении",
    });
    return data.then((res) => res?.data);
  },

  async deleteGroup(groupName: string) {
    const data = api.delete("/groups", {
      params: {
        groupName,
      },
    });

    await toast.promise(data, {
      loading: "Удаляем группу",
      success: "Группа удалена!",
      error: "Ошибка при удалении",
    });
    return data.then((res) => res?.data);
  },

  async getReplacement(day: string, groupName: string, weekType: string) {
    const res = api.get("replacements/search", {
      params: {
        day: day,
        groupName: groupName,
        weekType: weekType,
      },
    });

    await toast.promise(res, {
      loading: "Получаем замены",
      success: "Данные обновлены",
      error: "Произошла ошибка при обновлении",
    });
    return res.then((res) => res?.data);
  },

  async getScheduleByParams(day: string, groupName: string, weekType: string) {
    const res = api.get("/schedules/search", {
      params: {
        day: day,
        groupName: groupName,
        weekType: weekType,
      },
    });

    await toast.promise(res, {
      loading: "Получаем расписание",
      success: "Данные обновлены",
      error: "Произошла ошибка при обновлении",
    });
    return res.then((res) => res?.data);
  },

  async setSchedule(
    groupName: string,
    day: string,
    weekType: string,
    items: any
  ) {
    const res = api.post(`/schedules`, {
      groupName: groupName,
      day: day,
      weekType: weekType,
      items: items,
    });

    await toast.promise(res, {
      loading: "Загрузка данных на сервер",
      success: "Расписание обновлено",
      error: "Возникла ошибка при обновлении",
    });
    return res.then((res) => res?.data);
  },

  async setReplacement(
    groupName: string,
    day: string,
    weekType: string,
    items: any
  ) {
    const res = api.post(`/replacements`, {
      groupName: groupName,
      day: day,
      weekType: weekType,
      items: items,
    });

    await toast.promise(res, {
      loading: "Загрузка данных на сервер",
      success: "Расписание обновлено",
      error: "Возникла ошибка при обновлении",
    });
    return res.then((res) => res?.data);
  },

  async deleteSchedule(day: string, groupName: string, weekType: string) {
    return await api
      .delete("/schedules", {
        params: {
          day,
          groupName,
          weekType,
        },
      })
      .then((res) => res?.data);
  },

  async deleteReplacement(day: string, groupName: string, weekType: string) {
    return await api
      .delete("/replacements", {
        params: {
          day,
          groupName,
          weekType,
        },
      })
      .then((res) => res?.data);
  },
};
