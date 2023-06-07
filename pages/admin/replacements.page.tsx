import type { NextPage } from "next";
import styles from "./css/Admin.module.scss";
import {
  AsyncSelector,
  Selector,
} from "../../src/components/admin/select/select";
import { adminService } from "../../src/service/Admin.service";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { itemTime } from "../../src/utils/time";
import { useAuth } from "../../src/contexts/auth.context";
import { actionTypes, dayTypes, weekTypes } from "../../src/types/admin.module";
import Head from "next/head";
import { ScheduleData } from "../../src/types/schedule.module";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Admin: NextPage = () => {
  const { user, isLoading } = useAuth();
  const [replacement, setReplacement] = useState<ScheduleData>();
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedWeekType, setSelectedWeekType] = useState();

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = async (data) => {
    let result = [];
    let index = 0;
    for (let i = 0; i < 10; i++) {
      const name = data["item" + i];
      const cab = data["cabinet" + i];
      const teacher = data["teacher" + i];

      if (name === "" || cab === "" || teacher === "") index++;
      if (data["item" + i] === "" || data["cabinet" + i] === "" || data["teacher" + i] === "") {
        if (!(data["item" + i] === "" && data["cabinet" + i] === "" && data["teacher" + i] === "")) {
          toast.error("Заполните все поля");
          return;
        }
      }
      const obj = {
        name: data["item" + i] || "",
        cab: data["cabinet" + i] || "",
        teacher: data["teacher" + i] || "",
      };
      result.push(obj);
    }
    await adminService.setReplacement(
      selectedGroup,
      selectedDay,
      selectedWeekType,
      index === 10 ? [] : result
    );
    setReplacement(undefined);
    await getReplacements(selectedDay, selectedGroup, selectedWeekType);
  };


  const getReplacements = async (
    day: string,
    groupName: string,
    weekType: string
  ) => {
    reset();
    const data = await adminService.getReplacement(day, groupName, weekType);
    setReplacement(data ? data : []);
  };

  return (
    !isLoading &&
    user && (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
        <Head>
          <title>Панель администратора</title>
        </Head>
        <div>
          <div className={styles.controlPanelInfo}>
            <p>Добро пожаловать, {user.username}!</p>
            <h1>Режим администратора</h1>
          </div>
          <div className={styles.controlPanel}>
            <div>
              <p>Что вы хотите сделать?</p>
              <Selector
                placeholder={"Выберите вариант"}
                options={actionTypes}
                value={
                  {
                    value: "replacement",
                    label: "Управление заменами",
                  }
                }
                onChange={async (selectValue: any) => {
                  selectValue.value === "groups" ? router.push('/admin/groups') : router.push('/admin')
                }}
              />
            </div>
            <div>
              <p>Для какого типа недели вы хотите изменить расписание?</p>
              <Selector
                placeholder={"Выберите тип недели"}
                options={weekTypes}
                key={"all"}
                onChange={async (selectValue: any) => {
                  setSelectedWeekType(selectValue.value);
                  if (selectedGroup && selectedDay)
                    await getReplacements(
                      selectedDay,
                      selectedGroup,
                      selectValue.value
                    );
                }}
              />
            </div>
            {selectedWeekType && (
              <div>
                <p>В какой день требуется изменение расписания?</p>
                <Selector
                  placeholder={"Выберите день недели"}
                  isDisabled={selectedWeekType ? false : true}
                  options={dayTypes}
                  onChange={async (selectValue: any) => {
                    setSelectedDay(selectValue.value);
                    if (selectedGroup && selectedWeekType)
                      await getReplacements(
                        selectValue.value,
                        selectedGroup,
                        selectedWeekType
                      );
                  }}
                />
              </div>
            )}
            {selectedDay && selectedWeekType && (
              <div>
                <p>У какой группы нужно изменить расписание?</p>
                <AsyncSelector
                  placeholder={"Выберите группу"}
                  isDisabled={selectedDay ? false : true}
                  defaultOptions={true}
                  loadOptions={async () => {
                    const data = await adminService.getGroups();
                    return data.map((group: string, index: number) => ({
                      value: index,
                      label: group,
                    }));
                  }}
                  onChange={async (selectValue: any) => {
                    setSelectedGroup(selectValue.label);
                    await getReplacements(
                      selectedDay,
                      selectValue.label,
                      selectedWeekType
                    );
                  }}
                />
              </div>
            )}
            {selectedDay && selectedGroup && selectedWeekType && (
              <div>
                <p>Закончили редактирование?</p>
                <button type="submit" className={styles.button}>
                  Сохранить изменения
                </button>
                <a onClick={async () => {
                  setReplacement(undefined);
                  await adminService.deleteReplacement(selectedDay, selectedGroup, selectedWeekType);
                  await getReplacements(selectedDay, selectedGroup, selectedWeekType);
                }}>Удалить замену</a>
              </div>
            )}
          </div>
        </div>
        {replacement && (
          <div className={styles.content}>
            <div>
              <p>ID</p>
              <p>Время</p>
              <p>Предмет</p>
              <p>Учитель</p>
              <p>Каб</p>
            </div>
            <div className={styles.schedule}></div>
            {...new Array(10).fill("").map((x, index) => (
              <div className={styles.schedule}>
                <div>
                  <p>{index + 1}</p>
                </div>
                <div>
                  <p>{itemTime(index)}</p>
                </div>
                <input
                  type="text"
                  defaultValue={
                    (replacement.items && replacement.items[index]?.name) || ""
                  }
                  placeholder={
                    (replacement.items && replacement.items[index]?.name) || ""
                  }
                  {...register(`item${index}`, { required: false })}
                />
                <input
                  type="text"
                  defaultValue={
                    (replacement.items && replacement.items[index]?.teacher) || ""
                  }
                  placeholder={
                    (replacement.items && replacement.items[index]?.teacher) || ""
                  }
                  {...register(`teacher${index}`, { required: false })}
                />
                <input
                  type="text"
                  maxLength={4}
                  defaultValue={
                    (replacement.items && replacement.items[index]?.cab) || ""
                  }
                  placeholder={
                    (replacement.items && replacement.items[index]?.cab) || ""
                  }
                  {...register(`cabinet${index}`, { required: false })}
                />
              </div>
            ))}
          </div>
        )}
      </form>
    )
  );
};

export default Admin;
