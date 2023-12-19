import React, { useState, useEffect } from 'react'
import "../css/petition.css"

const Petition = (props) => {
  const [petitions, setPetitions] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/users/${localStorage.getItem('currentUserUsername')}`)
      .then(response => response.json())
      .then(userData => setCurrentUser(userData))
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    
    fetch("http://localhost:8081/petitions/active")
      .then(response => response.json())
      .then(data => {
        const petitions = data.map(petition => ({ ...petition, voted: false }));
        // console.log("DATA: " + JSON.stringify(data, null, 2))
        const promises = petitions.map(petition =>
          fetch(`http://localhost:8081/petitions/${petition.id}/hasVotedBy/${currentUser.id}`)
            .then(response => response.json())
            .then(hasVoted => {
              if (hasVoted) {
                petition.voted = true;
              }
            })
        );

        Promise.all(promises).then(() => setPetitions(petitions));
      })
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, [currentUser]);

  const handleVoteClick = (petition_id, user_id) => {
    fetch(`http://localhost:8081/petitions/${petition_id}/vote/${user_id}`, { method: 'POST' })
      .then(() => {
        setPetitions(prevPetitions =>
          prevPetitions.map(petition => {
            if (petition.id === petition_id) {
              return { ...petition, voted: true };
            }
            return petition;
          })
        );
      })
      .catch(error => console.error(error));
  };

  if (!petitions) {
    return <div className='loadingBox'>Loading...</div>;
  }

  const handleMoreInfoButton = (infoObject) => {
    props.onPetitionMoreInfoButtonClick();
    if (localStorage.getItem('petitionInfoObject')) {
      localStorage.removeItem('petitionInfoObject');
    }
    localStorage.setItem('petitionInfoObject', JSON.stringify(infoObject));
  }

  return (
    <div className='petitionsBox'>
      {petitions.map((petition) => (
        <div className='petition' key={petition.id}>
          <h1 className='petitionTitle'> {petition.title} </h1>
          <div className='petitionInfoBox'>
            <p className='petitionShortDescription'> {petition.shortDescription} </p>
            <div className='petitionsButtonsBox'>
              <button className='petitionOptionMoreInfoButton' onClick={() => {handleMoreInfoButton({
                  "petitionTitle": petition.title, 
                  "petitionLongDescription": petition.longDescription, 
              })}}>More info</button>
              <button className={`petitionOptionVoteForButton ${petition.voted ? 'blocked' : ''}`} onClick={() => handleVoteClick(petition.id, currentUser.id)}>
                {petition.voted ? 'VOTED' : 'Vote for'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Petition
