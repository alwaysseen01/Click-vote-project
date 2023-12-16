import React, { useState, useEffect } from 'react'
import "../css/survey.css"

const Survey = () => {
  const [surveys, setSurveys] = useState(null);
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
    
    fetch("http://localhost:8081/surveys/active")
      .then(response => response.json())
      .then(data => {
        const surveys = data.map(survey => ({ ...survey, voted: false }));
        // console.log("DATA: " + JSON.stringify(data, null, 2))
        const promises = surveys.map(survey =>
          fetch(`http://localhost:8081/surveys/${survey.id}/hasVotedBy/${currentUser.id}`)
            .then(response => response.json())
            .then(hasVoted => {
              if (hasVoted) {
                survey.voted = true;
              }
            })
        );

        Promise.all(promises).then(() => setSurveys(surveys));
      })
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, [currentUser]);

  const handleVoteClick = (survey_id, option_id, user_id) => {
    fetch(`http://localhost:8081/surveys/${survey_id}/vote/${option_id}/${user_id}`, { method: 'POST' })
      .then(() => {
        setSurveys(prevSurveys =>
          prevSurveys.map(survey => {
            if (survey.id === survey_id) {
              return { ...survey, voted: true };
            }
            return survey;
          })
        );
      })
      .catch(error => console.error(error));
  };

  if (!surveys) {
    return <div className='loadingBox'>Loading...</div>;
  }

  return (
    <div className='surveysBox'>
      {surveys.map((survey) => (
        <div className='survey' key={survey.id}>
          <h1 className='surveyTitle'> {survey.title} </h1>
          <div className='surveyInfoBox'>
            <p className='surveyShortDescription'> {survey.shortDescription} </p>
            <div className='surveysOptionsButtonsBox'>
              {survey.options && survey.options.map(surveyOption => (
                <button className={`surveyOptionButton ${survey.voted ? 'blocked' : ''}`} key={surveyOption.id} onClick={() => handleVoteClick(survey.id, surveyOption.id, currentUser.id)}>
                  {survey.voted ? 'VOTED' : `${surveyOption.text}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Survey