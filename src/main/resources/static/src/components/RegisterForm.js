import React, { useState, useEffect } from 'react'
import "../css/registerForm.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../security/AuthContext'
import { Navigate } from 'react-router-dom';

const RegisterForm = () => {
    const { register, redirectTo, setRedirectTo } = React.useContext(AuthContext);
    const [errorMessage, setErrorMessage] = React.useState(null);

    if (redirectTo) {
        setRedirectTo(null);
        return <Navigate to={redirectTo} />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            await register(firstName, lastName, username, password);
        } catch (error) {
            console.error('Error registering:', error);
            setErrorMessage("Error registering. Please, try again later.");
        }
    };

    return (
        <div className='registerPage'>
            <div className='registerFormBox'>
                <h1 className='registerFormBoxTitle'>Registration</h1>
                <form className='registerForm' onSubmit={handleSubmit}>
                    <input type='text' name='firstName' placeholder='Enter your first name' required />
                    <input type='text' name='lastName' placeholder='Enter your last name' required />
                    <input type='text' name='username' placeholder='Imagine your new username/login' required />
                    <input type='password' name='password' placeholder='Imagine your new password' required />
                    <input type='password' name='confirmPassword' placeholder='Repeat your new password' required />
                    <button type="submit" class="registerButton">Register</button>
                </form>
                {errorMessage && <p className='registerErrorMessage'>{errorMessage}</p>}
                <p>Already have an account? <Link to="/login"> <b className='signInText'>Sign in</b> </Link></p>
            </div>
        </div>
    )
}

export default RegisterForm