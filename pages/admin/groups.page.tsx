import type { NextPage } from "next";
import styles from "./css/Admin.module.scss";
import {
  Selector,
} from "../../src/components/admin/select/select";
import { adminService } from "../../src/service/Admin.service";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/contexts/auth.context";
import { actionTypes } from "../../src/types/admin.module";
import Head from "next/head";
import { useRouter } from "next/router";

const Admin: NextPage = () => {
  const { user, isLoading } = useAuth();
  const [groups, setGroups] = useState<string[]>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const reFetchTimeout = setTimeout(async () => {
      await getGroups();
    });

    return () => clearInterval(reFetchTimeout);
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = async (data) => {
    await adminService.addGroup(data.groupName);
    await getGroups();
  };

  const getGroups = async () => {
    const data = (await adminService.getGroups()).map(
      (group: string, index: number) => ({
        value: index,
        label: group,
      })
    );
    setGroups(data);
    setIsLoad(false);
    return data;
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
                value={{
                  value: "groups",
                  label: "Редактирование групп",
                }}
                onChange={async (selectValue: any) => {
                  selectValue.value === "replacement" ? router.push('/admin/replacements') : router.push('/admin')
                }}
              />
            </div>
            <div>
              <p>Хотите удалить группу?</p>
              <Selector
                placeholder={isLoad ? "Выполняется удаление" : "Выберите группу"}
                isLoading={isLoad}
                options={groups || []}
                value={null}
                onChange={async (selectValue: any) => {
                  setIsLoad(true);
                  reset();
                  await adminService.deleteGroup(selectValue.label);
                  await getGroups();
                }}
              />
            </div>
            <div>
              <p>Нужно добавить группу?</p>
              <input
                className={styles.input}
                type="text"
                placeholder={"Введите название группы"}
                defaultValue={""}
                {...register("groupName", { required: false, maxLength: 14 })}
              />
            </div>
            <button type="submit" className={styles.button}>
              Добавить группу
            </button>
          </div>
        </div>
      </form>
    )
  );
};

export default Admin;
