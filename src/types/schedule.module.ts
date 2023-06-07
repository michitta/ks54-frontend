export enum day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum weekType {
  "numerator",
  "denominator",
}

export type ScheduleData = {
  groupName: string;
  replacement: boolean;
  items:
    | [
        {
          cab: string;
          name: string;
          teacher: string;
        }
      ]
    | null;
};

export type Schedule = {
  weekType: weekType;
  day: day;
  data: ScheduleData[];
};
