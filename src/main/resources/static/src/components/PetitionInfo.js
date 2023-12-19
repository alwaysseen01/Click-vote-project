import React, { useState, useEffect } from 'react'
import "../css/petitionInfo.css"

const PetitionInfo = () => {
    const [infoObject, setInfoObject] = useState({});

    useEffect(() => {
        if (localStorage.getItem('petitionInfoObject')) {
        setInfoObject(JSON.parse(localStorage.getItem('petitionInfoObject')));
        } else {
        throw new Error("Error occured while trying to get information about candidate.")
        }
    }, [])

    useEffect(() => {
        document.body.style.overflowY = 'auto';
    
        return () => {
            document.body.style.overflowY = 'hidden';
        };
    }, []);

    return (
        <div className='petitionInfoPageBox'>
            <h1 className='petitionInfoTitle'>{infoObject.petitionTitle}</h1>
            <h2 className='petitionLongDescriptionTitle'>Petition description</h2>
            <p className='petitionLongDescriptionText'>{infoObject.petitionLongDescription}</p>
        </div>
    )
}

export default PetitionInfo