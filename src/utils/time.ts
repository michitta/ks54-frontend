import dayjs from "dayjs";

export const currentDay = (russian: boolean) => {
  const curDay = dayjs().day();
  switch (curDay) {
    case 0:
      return russian ? "Воскресенье" : "Sunday";
    case 1:
      return russian ? "Понедельник" : "Monday";
    case 2:
      return russian ? "Вторник" : "Tuesday";
    case 3:
      return russian ? "Среда" : "Wednesday";
    case 4:
      return russian ? "Четверг" : "Thursday";
    case 5:
      return russian ? "Пятница" : "Friday";
    case 6:
      return russian ? "Суббота" : "Saturday";
    default:
      return "Error";
  }
};

export const itemTime = (position: number) => {
  switch (position) {
    case 0:
      return "9:00 9:45";
    case 1:
      return "9:55 10:40";
    case 2:
      return "11:00 11:45";
    case 3:
      return "12:05 12:50";
    case 4:
      return "13:10 13:55";
    case 5:
      return "14:05 14:50";
    case 6:
      return "15:00 15:45";
    case 7:
      return "15:55 16:40";
    case 8:
      return "16:50 17:35";
    case 9:
      return "17:45 18:30";
    default:
      return "";
  }
};

export const getCurrentTime = () => {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  let position: number;
  if (currentHours === 9 && currentMinutes >= 0 && currentMinutes <= 45) {
    position = 0;
  } else if (
    (currentHours === 9 && currentMinutes >= 55) ||
    (currentHours === 10 && currentMinutes <= 40)
  ) {
    position = 1;
  } else if (
    currentHours === 11 &&
    currentMinutes >= 0 &&
    currentMinutes <= 45
  ) {
    position = 2;
  } else if (
    currentHours === 12 &&
    currentMinutes >= 5 &&
    currentMinutes <= 50
  ) {
    position = 3;
  } else if (
    currentHours === 13 &&
    currentMinutes >= 10 &&
    currentMinutes <= 55
  ) {
    position = 4;
  } else if (
    currentHours === 14 &&
    currentMinutes >= 5 &&
    currentMinutes <= 50
  ) {
    position = 5;
  } else if (
    currentHours === 15 &&
    currentMinutes >= 0 &&
    currentMinutes <= 45
  ) {
    position = 6;
  } else if (
    (currentHours === 15 && currentMinutes >= 55) ||
    (currentHours === 16 && currentMinutes <= 40)
  ) {
    position = 7;
  } else if (
    (currentHours === 16 && currentMinutes >= 50) ||
    (currentHours === 17 && currentMinutes <= 35)
  ) {
    position = 8;
  } else if (
    (currentHours === 17 && currentMinutes >= 45) ||
    (currentHours === 18 && currentMinutes <= 30)
  ) {
    position = 9;
  } else {
    position = -1; // Если текущее время не входит ни в один из временных интервалов
  }
  return position;
};
