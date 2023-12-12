import React, { useState, useEffect } from 'react'
import "../css/petition.css"

const Petition = () => {
  const [petitions, setPetitions] = useState(null);

  useEffect(() => {
    let url = "http://localhost:8081/petitions/active"
    console.log("FETCH URL: " + url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("DATA: " + JSON.stringify(data, null, 2))
        setPetitions(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  if (!petitions) {
    return <div className='loadingBox'>Loading...</div>;
  }

  return (
    <div className='petitionsBox'>
      {petitions && petitions.map((petition) => (
        <div className='petition' key={petition.id}>
          <h1 className='petitionTitle'> {petition.title} </h1>
          <div className='petitionInfoBox'>
            <p className='petitionShortDescription'> {petition.shortDescription} </p>
            <div className='petitionsButtonsBox'>
              <button className='petitionOptionMoreInfoButton'>More info</button>
              <button className='petitionOptionVoteForButton'>Vote for</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Petition
