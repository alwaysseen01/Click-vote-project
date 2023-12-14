import React, { useState, useContext, useEffect } from 'react'
import "../css/profile.css"

const Profile = () => {
    const [currentUserData, setCurrentUserData] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8081/users/${localStorage.getItem('currentUserUsername')}`)
            .then(response => response.json())
            .then(data => {
                setCurrentUserData(data);
                // console.log("DATA: " + JSON.stringify(data, null, 2))
            })
    }, [])

    return (
        <div className='profilePageBox'>
            <div className='profileBlock'>
                <h1 className='userFullName'>{currentUserData.firstName} {currentUserData.lastName}</h1>
                <h1 className='authStatus'>SUCCESSFULLY AUTHENTICATED</h1>
            </div>
        </div>
    )
}

export default Profile