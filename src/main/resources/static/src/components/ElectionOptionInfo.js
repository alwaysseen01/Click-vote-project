import React, { useState, useEffect } from 'react'
import "../css/electionOptionInfo.css"

const ElectionOptionInfo = () => {
  const [infoObject, setInfoObject] = useState({});

  useEffect(() => {
    if (localStorage.getItem('electionInfoObject')) {
      setInfoObject(JSON.parse(localStorage.getItem('electionInfoObject')));
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
    <div className='electionOptionInfoBox'>
      <img className='electionOptionPhoto' alt='' src={infoObject.electionOptionPhotoUrl}></img>
      <h1 className='electionOptionFullName'>
        {infoObject.electionOptionFirstName}{" "} 
        {infoObject.electionOptionLastName}{" "} 
        {infoObject.electionOptionMiddleName}{" "}
      </h1>
      <p className='electionOptionDOB'>{infoObject.electionOptionDOB}</p>
      <h2 className='electionOptionLongDescriptionTitle'>My election program</h2>
      <p className='electionOptionLongDescriptionText'>{infoObject.electionOptionLongDescription}</p>
    </div>
  )
}

export default ElectionOptionInfo