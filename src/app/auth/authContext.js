import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default ({ children }) => {
    const authIsAuthenticated = () => {
        return fetch('/usuarios/authenticated')
            .then(res => {
                if (res.status === 401)
                    return { isAuthenticated: false, user: { _id: "", nome: "", email: "", role: "" } };
                else
                    return res.json().then(data => data);
            });
    }

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        authIsAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {!isLoaded ? null :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )
}