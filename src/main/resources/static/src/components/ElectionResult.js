import React, { useState, useEffect } from 'react'
import "../css/electionResult.css"

const ElectionResult = (props) => {
    const [electionResults, setElectionResults] = useState(null);
    const [winner, setWinner] = useState(null);
    const [percentages, setPercentages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/elections/completed")
        .then(response => response.json())
        .then(data => {
            setElectionResults(data);
            // console.log("DATA: " + JSON.stringify(data, null, 2))

            const winnerPromises = data.map(election => 
                fetch(`http://localhost:8081/elections/${election.id}/winner`)
                    .then(response => response.text())
                    .then(text => text ? JSON.parse(text) : null)
            );

            const percentagePromises = data.map(election => 
                fetch(`http://localhost:8081/elections/${election.id}/results`)
                    .then(response => response.json())
            );

            Promise.all(winnerPromises)
                .then(winnersData => {
                    setWinner(winnersData);
                    // console.log("WINNERS DATA: " + JSON.stringify(winnersData, null, 2))
                })
                .catch(error => console.error('Error:', error));

            Promise.all(percentagePromises)
                .then(percentagesData => {
                    setPercentages(percentagesData.flat());
                    // console.log("PERCENTAGES DATA: " + JSON.stringify(percentagesData, null, 2))
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
    }, []);

    if (!electionResults) {
        return <div className='loadingBox'>Loading...</div>;
    }

    const handleMoreInfoButton = (infoObject) => {
        props.onElectionMoreInfoButtonClick();
        if (localStorage.getItem('electionInfoObject')) {
          localStorage.removeItem('electionInfoObject');
        }
        localStorage.setItem('electionInfoObject', JSON.stringify(infoObject));
    }

    return (
        <div className='electionsBox'>
            {electionResults && electionResults.map((result) => (
            <div className='electionResult' key={result.id}>
                <h1 className='electionResultTitle'>{result.title}</h1>
                {result.options && result.options.map(electionOption => {
                    let percentage = percentages.find(p => p.optionId === electionOption.id);
                    let isWinner = winner && winner.some(w => w && w.id === electionOption.id);
                    return (
                        <div className={`electonOptionBox ${isWinner ? 'winner' : ''}`} key={electionOption.id}>
                            <h1 className={`electionOptionPercentageBox ${isWinner ? 'winner' : ''}`}>{percentage ? Number(percentage.percentage).toFixed(2) : 0}%</h1>
                            <div className='electionOption'>
                                <img className='electionOptionImg' src={electionOption.photoUrl}></img>
                                <div className='electionOptionInfoBox'>
                                    <h1>{electionOption.firstName} {electionOption.lastName}</h1>
                                    <p className='electionOptionShortDescription'>{electionOption.shortDescription}</p>
                                </div>
                                <div className='electionOptionButtonsBox'>
                                    <button className='electionOptionMoreInfoButton' onClick={() => {handleMoreInfoButton({
                                        "electionTitle": result.title, 
                                        "electionOptionPhotoUrl": electionOption.photoUrl, 
                                        "electionOptionFirstName": electionOption.firstName, 
                                        "electionOptionLastName": electionOption.lastName,
                                        "electionOptionMiddleName": electionOption.middleName,
                                        "electionOptionDOB": electionOption.dateOfBirth,
                                        "electionOptionLongDescription": electionOption.longDescription
                                    })}}>More info</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            ))}
        </div>
    );    
};

export default ElectionResult