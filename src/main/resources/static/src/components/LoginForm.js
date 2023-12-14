import React, { useState, useEffect } from 'react'
import "../css/loginForm.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../security/AuthContext'
import { Navigate } from 'react-router-dom';

const LogInForm = () => {
    const { login, redirectTo, setRedirectTo } = React.useContext(AuthContext);
    const [errorMessage, setErrorMessage] = React.useState(null);

    if (redirectTo) {
        setRedirectTo(null);
        return <Navigate to={redirectTo} replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        try {
            await login(username, password);
        } catch(error) {
            console.error('Error parsing JSON:', error);
            setErrorMessage('Error logging in. Please check your credentials and try again.');
        }
    };

    return (
        <div className='loginPage'>
            <div className='loginFormBox'>
                <h1 className='loginFormBoxTitle'>Log in</h1>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input name='username' type='text' placeholder='Enter your username' required />
                    <input name='password' type='password' placeholder='Enter your password' required />
                    <button type="submit" className="loginButton">Log in</button>
                </form>
                {errorMessage && <p className='loginErrorMessage'>{errorMessage}</p>}
                <p>Don't have an account? <Link to="/register"> <b className='registerText'>Register</b> </Link></p>
            </div>
        </div>
    )
}

export default LogInForm