import React, { useState, useEffect } from 'react'
import "../css/election.css"


const Election = () => {
  const [elections, setElections] = useState(null);

  useEffect(() => {
    let url = "http://localhost:8081/elections/active"
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
        setElections(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  if (!elections) {
    return <div>Loading...</div>;
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
                  <button className='electionOptionVoteForButton'>Vote for</button>
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
