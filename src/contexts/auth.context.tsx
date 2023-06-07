import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { authService } from "../service/Auth.service";
import { toast } from "react-hot-toast";

interface IUser {
  uuid: number;
  username: string;
}

type AuthContextData = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (data: UserData) => Promise<void>;
  isLoading: boolean;
  reFetch: () => Promise<void>;
};

type UserData = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const reFetchTimeout = setTimeout(async () => {
      if (router.asPath != "/") await reFetch();
    });

    return () => clearInterval(reFetchTimeout);
  }, []);

  useEffect(() => {
    if (user && !isLoading && router.asPath.includes("login")) router.push("admin")
    if (!user && !isLoading && router.asPath.includes("admin")) router.push("login");
  }, [user, isLoading, router]);

  const login = async (data: UserData) => {
    const req = await authService.login(data.username, data.password);
    if (req) {
      await reFetch();
      toast.success("Вы успешно авторизовались");
    } else {
    }
  };

  const reFetch = async () => {
    setIsLoading(true);
    const res = await authService.me();
    setIsLoading(false);
    if (!res) return;
    setUser(res);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        reFetch,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
