import React from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('accessToken'));
    const [redirectTo, setRedirectTo] = React.useState(null);

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
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, register, redirectTo, setRedirectTo }}>
            {children}
        </AuthContext.Provider>
    );
}

