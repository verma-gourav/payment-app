import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axiosClient from "../api/axiosClient";

interface AuthContextType {
  user: any;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const token = localStorage.getItem("token");
      if (token) fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await axiosClient.get("/user/me", {
        headers: { Authorization: `Beares ${token}` },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err: any) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
