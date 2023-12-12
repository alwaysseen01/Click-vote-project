import React, { useState, useEffect } from 'react'
import "../css/petitionResult.css"

const PetitionResult = () => {
    const [petitionResults, setPetitionResults] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8081/petitions/completed")
        .then(response => response.json())
        .then(data => {
            setPetitionResults(data);
            console.log("PETITIONS DATA: " + JSON.stringify(data, null, 2))
        })
        .catch(error => console.error('Error:', error));
    }, []);

    if (!petitionResults) {
        return <div className='loadingBox'>Loading...</div>;
    }

    return (
        <div className='petitionsResultBox'>
            {petitionResults && petitionResults.map(petitionResult => (
                <div className={`petitionResult ${petitionResult.votesCount > 10000 ? 'sent' : ''}`} key={petitionResult.id}>
                    <h1 className={`petitionResultVotesBox ${petitionResult.votesCount > 10000 ? 'sent' : ''}`}>{petitionResult.votesCount}</h1>
                    <div className='petitionResultInfoBox'>
                        <h1 className='petitionResultTitle'>{petitionResult.title}</h1>
                        <p className='petitionResultShortDescription'>{petitionResult.shortDescription}</p>
                    </div>
                    <div className='petitionOptionButtonsBox'>
                        <button className='petitionOptionMoreInfoButton'>More info</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PetitionResult

