import React from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('accessToken'));
    const [redirectTo, setRedirectTo] = React.useState(null);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    async function login(username, password) {
        const response = await fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
    
        if (!response.ok) {
            throw new Error('Error logging in. Please check your credentials and try again.');
        }
    
        const data = await response.json();
        const { accessToken, refreshToken } = data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('currentUserUsername', username);
        setIsAuthenticated(true);
        setRedirectTo('/profile');
    }
    
    async function register(firstName, lastName, username, password) {
        const response = await fetch('http://localhost:8081/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, username, password }),
        });
    
        if (!response.ok) {
            throw new Error('Error registering. Please try again.');
        }
    
        await login(username, password);
    }
    
    async function refreshToken() {
        console.log("REFRESHING");
        setIsRefreshing(true);
    
        const response = await fetch('http://localhost:8081/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken')})
        });

        if (response.ok) {
            const data = await response.json();
            console.log("DATA: " + JSON.stringify(data, null, 2))
            const { accessToken, refreshToken } = data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);    
            setIsAuthenticated(true);
            setIsRefreshing(false);
            setRedirectTo('/main');
        } else {
            setIsAuthenticated(false);
            setIsRefreshing(false);
        }
    
        if (isAuthenticated) {
            console.log("SUCCESSFULLY AUTHENTICATED");  
        }
    }    

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, register, redirectTo, setRedirectTo, refreshToken, isRefreshing }}>
            {children}
        </AuthContext.Provider>
    );
}
