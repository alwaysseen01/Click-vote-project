import React, { useState, useEffect } from 'react'
import "../css/surveyResult.css"

const SurveyResult = () => {
    const [surveyResults, setSurveyResults] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8081/surveys/completed")
            .then(response => response.json())
            .then(data => {
                setSurveyResults(data);
                console.log("SURVEYS DATA: " + JSON.stringify(data, null, 2))

                const winnerPromises = data.map(survey => 
                    fetch(`http://localhost:8081/surveys/${survey.id}/winner`)
                        .then(response => response.json())
                );

                Promise.all(winnerPromises)
                .then(winnersData => {
                    setWinner(winnersData);
                    console.log("WINNERS DATA: " + JSON.stringify(winnersData, null, 2))
                })
                .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    }, []);

    if (!surveyResults) {
        return <div className='loadingBox'>Loading...</div>;
    }

    return (
        <div className='surveyResultsBox'>
            {surveyResults && surveyResults.map((survey) => {
                return (
                    <div className='survey' key={survey.id}>
                        <h1 className='surveyTitle'>{survey.title}</h1>
                        <div className='surveyOptionsBox'>
                            {survey.options && survey.options.map((option) => {
                                return (
                                    <div className='surveyOption' key={option.id}>
                                        <h1 className={`surveyOptionVotesBox ${winner && winner.some(w => w.id === option.id) ? 'winner' : ''}`}>{option.votesCount}</h1>
                                        <h1 className='surveyOptionTitle'>{option.text}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SurveyResult