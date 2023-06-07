import type { NextPage } from "next";
import styles from "./login.module.scss";
import { useForm } from "react-hook-form";
import { useAuth } from "../../src/contexts/auth.context";
import clsx from "clsx";
import Head from "next/head";

const Login: NextPage = () => {
  const { user, login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await login({ username: data.username, password: data.password });
  };

  return (
    !user &&
    !isLoading && (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
        <Head>
          <title>Авторизация</title>
        </Head>
        <div>
          <p>Панель управления расписанием</p>
          <h1>Введите данные от своего аккаунта</h1>
        </div>
        <p>Чтобы продолжить работу, Вам необходимо авторизоваться в системе.</p>
        <div>
          <input
            className={clsx(
              styles.input,
              errors.username ? styles.error : null
            )}
            type="text"
            defaultValue={""}
            placeholder="Введите логин"
            {...register(`username`, { required: true, maxLength: 100 })}
          />
          <input
            className={clsx(
              styles.input,
              errors.password ? styles.error : null
            )}
            type="password"
            defaultValue={""}
            placeholder="Введите пароль"
            {...register(`password`, { required: true, maxLength: 100 })}
          />
        </div>
        <div>
          <p>Вы забыли пароль?</p>
          <p>Обратитесь к администратору панели</p>
        </div>
        <button type="submit">Войти в аккаунт</button>
      </form>
    )
  );
};

export default Login;
