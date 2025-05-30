import {createContext, useState, useEffect } from "react";
import { registerApi, loginApi, authMe } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authMe();
                if (res.data) {
                    setIsLogin(true);
                    setUser(res.data);
                } else {
                    setIsLogin(false);
                    setUser(null);
                    localStorage.removeItem("token");
                }
            } catch(err) {
                setIsLogin(false);
                setUser(null);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async ({ username, password }) => {
        const res = await loginApi({ username, password });
        if (res.data.token) {
            
            localStorage.setItem("token", res.data.token);
            setIsLogin(true);
            setUser(res.data.user);
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        setUser(null);

    }

    const register = async ({ username, password, email }) => {
        const res = await registerApi({ username, password, email });
      };



    return (
        <AuthContext.Provider value={{ isLogin, user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
}