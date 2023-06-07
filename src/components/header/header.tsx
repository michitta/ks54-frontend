import { FC, memo, useEffect, useState } from "react";
import styles from "./header.module.scss";
import { currentDay, itemTime } from "../../utils/time";
import dayjs from "dayjs";
import clsx from "clsx";

const Header: FC<{ schedule: any, position: any }> = memo(({ schedule, position }) => {
  const [curTime, setCurTime] = useState(dayjs().format("HH:mm:ss"));
  const [weekType, setWeekType] = useState();
  const maintenance = true;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(dayjs().format("HH:mm:ss"));
      if (schedule) setWeekType(schedule.weekType);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (schedule) setWeekType(schedule.weekType);
  }, [schedule]);
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.day}>{currentDay(true)}</p>
        {schedule && weekType ? (<p className={styles.weekType}>
          {weekType === "numerator"
            ? "числитель"
            : "знаменатель"}
        </p>) : (
          <div className={clsx(styles.sceleton, "w-[158px]")}></div>
        )}
      </div>
      <div>
        {schedule && position != -1 ? <p className={styles.curLesson}>
          {position + 1} урок ({itemTime(position).replace(" ", " - ")})
          {/* <p className={styles.curLesson}>Отдыхаем братья</p> */}
        </p> : (
          <div className={clsx(styles.sceleton, "w-[200px]")}></div>
        )}
        <p className={styles.time}>{curTime}</p>
      </div>
    </header>
  );
});

export default Header;
