import type { NextPage } from "next";
import styles from "../pages/Index/css/Index.module.scss";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Schedule, ScheduleData } from "../src/types/schedule.module";
import { useWindowSize } from "usehooks-ts";
import { getCurrentTime, itemTime } from "../src/utils/time";
import clsx from "clsx";
import { indexService } from "../src/service/Index.service";

const DynamicHeader = dynamic(() => import("../src/components/header/header"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [position, setPosition] = useState(-1);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { width } = useWindowSize();
  const [elementsToRender, setElementsToRender] = useState<ScheduleData[]>([]);
  const [elementsInCurrentPosition, setElementsInCurrentPosition] =
    useState<number>(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setPosition(getCurrentTime());
    }, 1000);

    const scheduleInterval = setInterval(async () => {
      const schedule = await indexService.getSchedule();
      if (schedule) {
        setSchedule(schedule);
      } else {
        setSchedule(null);
      }
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(scheduleInterval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        if (prev + 1 >= pages) return 0;
        return prev + 1;
      });
    }, 2000);

    if (schedule?.data) {
      setPages(
        Math.round(
          schedule.data.filter((x) => x.items?.length > 0).length /
          ((width - 64) / 428)
        )
      );
    }

    return () => clearInterval(interval);
  }, [pages, currentPage, schedule, position]);

  useEffect(() => {
    setElementsInCurrentPosition(
      schedule?.data
        ?.slice(
          currentPage * ((width - 64) / 428),
          (currentPage + 1) * ((width - 64) / 428)
        )
        .map((x) => x.items?.length)
        .filter((x) => x >= position + 1).length
    );

    if (pages > 0) {
      setElementsToRender(
        schedule?.data?.slice(
          Math.ceil(currentPage * ((width - 64) / 428)),
          (currentPage + 1) * (width / 428)
        )
      );
    }
  }, [currentPage, width, schedule, position, pages]);

  return (
    <main className={styles.main}>
      {/* <div className={styles.maintenance}>
        <p>
          Включён режим разработчика, отображение данных может быть нарушенно
        </p>
      </div> */}
      <DynamicHeader schedule={schedule} position={position} />
      {elementsToRender && elementsToRender[0] ? (
        <div className={styles.items}>
          {elementsToRender
            .sort((a, b) => b.items?.length - a.items?.length)
            .filter((x) => x.items?.length > 0)
            .map((x: ScheduleData) => {
              return (
                <div className={clsx(styles.item)} key={x.groupName}>
                  <h1>
                    {x.replacement ? `${x.groupName} (замены)` : x.groupName}
                  </h1>
                  <ul>
                    {x.items?.map((item, index) => {
                      return (
                        <li
                          key={item.name + index}
                          className={clsx({
                            [styles.active]: index === position,
                          })}
                        >
                          <p>{item.name ? itemTime(index) : ""}</p>
                          <div>
                            <p>{item.name ? item.name : "—"}</p>
                            <p>{item.teacher ? item.teacher : ""}</p>
                          </div>
                          <p>{item.cab}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          {position >= 0 &&
            elementsToRender.map(
              (x) => x.items?.length < elementsInCurrentPosition
            ) && (
              <div
                className={styles.indicator}
                style={
                  {
                    "--width": `${elementsInCurrentPosition != 1
                      ? elementsInCurrentPosition * 428 +
                      (width - 64 - elementsInCurrentPosition * 428)
                      : elementsInCurrentPosition * 444
                      }px`,
                    "--top": `${82 + position * 10 + position * 78}px`,
                  } as React.CSSProperties
                }
              ></div>
            )}
        </div>
      ) : (
        <div className={styles.items}>
          <div className={"flex flex-col gap-[18px] w-full h-full"}>
            <h1 className={clsx(styles.sceleton, "w-full", "h-6")}></h1>
            <ul className={clsx(styles.sceleton, "w-full", "h-full")}></ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
