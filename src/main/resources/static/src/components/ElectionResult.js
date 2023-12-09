import React, { useState, useEffect } from 'react'
import "../css/electionResult.css"

const ElectionResult = () => {
    const [electionResults, setElectionResults] = useState(null);
    const [winner, setWinner] = useState(null);
    const [percentages, setPercentages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/elections/completed")
        .then(response => response.json())
        .then(data => {
            setElectionResults(data);
            console.log("DATA: " + JSON.stringify(data, null, 2))

            const winnerPromises = data.map(election => 
                fetch(`http://localhost:8081/elections/${election.id}/winner`)
                    .then(response => response.json())
            );

            const percentagePromises = data.map(election => 
                fetch(`http://localhost:8081/elections/${election.id}/results`)
                    .then(response => response.json())
            );

            Promise.all(winnerPromises)
                .then(winnersData => {
                    setWinner(winnersData);
                    console.log("WINNERS DATA: " + JSON.stringify(winnersData, null, 2))
                })
                .catch(error => console.error('Error:', error));

            Promise.all(percentagePromises)
                .then(percentagesData => {
                    setPercentages(percentagesData);
                    console.log("PERCENTAGES DATA: " + JSON.stringify(percentagesData, null, 2))
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
    }, []);

    if (!electionResults) {
        return <div>Loading...</div>;
    }

    return (
        <div className='electionsBox'>
            {electionResults && electionResults.map((result) => (
                <div className='electionResult' key={result.id}>
                    <h1>{result.title}</h1>
                    {result.options && result.options.map(electionOption => {
                        const flatPercentages = percentages.flat();
                        console.log("FLAT PERCENTAGES: " + JSON.stringify(flatPercentages, null, 2));
                        const percentage = flatPercentages.find(p => p.optionId === electionOption.id);
                        return (
                            <div className={`electonOptionBox ${winner && winner.some(w => w.id === electionOption.id) ? 'winner' : ''}`} key={electionOption.id}>
                                <h1 className={`electionOptionPercentageBox ${winner && winner.some(w => w.id === electionOption.id) ? 'winner' : ''}`}>{percentage ? Number(percentage.percentage).toFixed(2) : 0}%</h1>
                                <div className='electionOption'>
                                    <img className='electionOptionImg' src={electionOption.photoUrl}></img>
                                    <div className='electionOptionInfoBox'>
                                        <h1>{electionOption.firstName} {electionOption.lastName}</h1>
                                        <p className='electionOptionShortDescription'>{electionOption.shortDescription}</p>
                                    </div>
                                    <div className='electionOptionButtonsBox'>
                                        <button className='electionOptionMoreInfoButton'>More info</button>
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