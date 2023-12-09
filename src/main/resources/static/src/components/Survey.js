import React, { useState, useEffect } from 'react'
import "../css/survey.css"

const Survey = () => {
  const [surveys, setSurveys] = useState(null);

  useEffect(() => {
    let url = "http://localhost:8081/surveys/active"
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
        setSurveys(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  if (!surveys) {
    return <div>Loading...</div>;
  }

  return (
    <div className='surveysBox'>
      {surveys && surveys.map((survey) => (
        <div className='survey' key={survey.id}>
          <h1 className='surveyTitle'> {survey.title} </h1>
          <div className='surveyInfoBox'>
            <p className='surveyShortDescription'> {survey.shortDescription} </p>
            <div className='surveysOptionsButtonsBox'>
              {survey.options && survey.options.map(surveyOption => (
                <button className='surveyOptionButton' key={surveyOption.id}>{surveyOption.text}</button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Survey