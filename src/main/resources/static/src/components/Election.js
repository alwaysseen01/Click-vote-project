import React, { useState, useEffect } from 'react'
import "../css/election.css"


const Election = () => {
  const [elections, setElections] = useState(null);
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

    fetch("http://localhost:8081/elections/active")
      .then(response => response.json())
      .then(data => {
        // console.log("DATA: " + JSON.stringify(data, null, 2))
        const elections = data.map(election => {
          const updatedElection = { ...election };
          updatedElection.options = election.options.map(option => ({ ...option, voted: false }));
          return updatedElection;
        });

        const promises = elections.map(election =>
          fetch(`http://localhost:8081/elections/${election.id}/hasVotedBy/${currentUser.id}`)
            .then(response => response.json())
            .then(hasVoted => {
              if (hasVoted) {
                election.voted = true;
              } else {
              }
            })
        );

        Promise.all(promises).then(() => setElections(elections));
      })
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, [currentUser]);

  const handleVoteClick = (election_id, option_id, user_id) => {
    fetch(`http://localhost:8081/elections/${election_id}/vote/${option_id}/${user_id}`, { method: 'POST' })
      .then(() => {
        const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
        if (!savedVotes[user_id]) {
          savedVotes[user_id] = [];
        }
        savedVotes[user_id].push(election_id);
        localStorage.setItem('votes', JSON.stringify(savedVotes));

        setElections(prevElections =>
          prevElections.map(election => {
            if (election.id === election_id) {
              return { ...election, voted: true };
            }
            return election;
          })
        );
      })
      .catch(error => console.error(error));
  };

  if (!elections) {
    return <div className='loadingBox'>Loading...</div>;
  }
  
  return (
    <div className='electionsBox'>
      {elections.map((election) => (
        <div className='election' key={election.id}>
          <h1 className='electionTitle'> {election.title} </h1>
          <div className='electionOptionsBox'>
            {election.options && election.options.map(electionOption => (
              <div className='electionOption' key={electionOption.id}>
                <img className='electionOptionImg' src={electionOption.photoUrl}></img>
                <div className='electionOptionInfoBox'>
                  <div className='electionOptionNameAndYOBox'>
                    <h1 className='electionOptionName'> {electionOption.firstName} {electionOption.lastName} {electionOption.middleName} </h1>
                    <p className='electionOptionYO'> {electionOption.dateOfBirth} </p>
                  </div>
                  <p className='electionOptionShortDescription'>
                      {electionOption.shortDescription}
                  </p>
                </div>
                <div className='electionOptionButtonsBox'>
                  <button className='electionOptionMoreInfoButton'>More info</button>
                  <button className={`electionOptionVoteForButton ${election.voted ? 'blocked' : ''}`} disabled={electionOption.voted} onClick={() => handleVoteClick(election.id, electionOption.id, currentUser.id)}>{election.voted ? 'VOTED' : 'Vote for'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Election
