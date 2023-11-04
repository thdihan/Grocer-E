import { createContext, useEffect, useState } from "react";
import UserLog from "../apis/UserLog";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [newUser, setNewUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserDetails = async () => {
            const response = await UserLog.get("/", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setNewUser(response.data.user);
        };
        try {
            if (user) {
                getUserDetails();
            }
        } catch (error) {
            console.log(error);
        }
    }, [user]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await UserLog.post(
                "/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);

            setLoading(false);
            return { data: data };
        } catch (err) {
            console.log(err);
            console.log(err.response.data.error);
            setError(err.response.data.error);
            setLoading(false);
            return { error: err.response.data.error };
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setNewUser(null);
    };

    const value = {
        user,
        setUser,
        newUser,
        setNewUser,
        login,
        loading,
        error,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
