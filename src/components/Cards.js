import React from 'react';

const Cards = ({ countryData, country, selectValue }) => {
    let lastData = countryData[countryData.length - 1] || [];    
    let dateArr = [], confirmedArr = [], deathsArr = [], recoveredArr = [];
    
    countryData.forEach(({ date, confirmed, recovered, deaths }) => {
      dateArr.push(date);
      confirmedArr.push(confirmed);
      deathsArr.push(deaths);
      recoveredArr.push(recovered);
    });
    
    //console.log();
    return (
        <React.Fragment> 
         <div className="col s12 m4">   
            <div className="card">
                    <div className="card-content"> 
                        <h2 className="center teal-text"><i className="material-icons">local_hospital</i></h2>        
                        <div>
                            <h4 className="center">{ Number(lastData.confirmed).toLocaleString() }</h4>                            
                                        <h6>Confirmed cases</h6>
                            <p className="light"><span>
                            {(confirmedArr[confirmedArr.length - 1] - confirmedArr[confirmedArr.length - 8]) >= 1 ?
                                    `+${Number(confirmedArr[confirmedArr.length - 1] - confirmedArr[confirmedArr.length - 8]).toLocaleString()} cases added since last week`
                                    : ` No new cases this week`}                               
                            </span></p>
                        </div> 
                </div> 
            </div> 
        </div>
        <div className="col s12 m4">    
            <div className="card">
                    <div className="card-content"> 
                    <h2 className="center teal-text"><i className="material-icons">mood_bad</i></h2>        
                            <div>
                                <h4 className="center"> {Number(lastData.deaths).toLocaleString()}</h4>
                                <h6>Deaths</h6>
                            <p className="light"><span>
                            {(deathsArr[deathsArr.length - 1] - deathsArr[deathsArr.length - 8]) >= 1 ?
                                    `+${Number(deathsArr[deathsArr.length - 1] - deathsArr[deathsArr.length - 8]).toLocaleString()} cases added since last week`
                                    : ` No new cases this week`}
                                </span></p>           
                            </div> 
                    </div>                                      
                </div> 
            </div>
            <div className="col s12 m4">    
            <div className="card">
                    <div className="card-content"> 
                    <h2 className="center teal-text"><i className="material-icons">check</i></h2>        
                            <div>
                                <h4 className="center"> {Number(lastData.recovered).toLocaleString()}</h4>
                                <h6>Recovered</h6>
                            <p className="light"><span>
                                {(recoveredArr[recoveredArr.length - 1] - recoveredArr[recoveredArr.length - 8]) >= 1 ?
                                    `+${Number(recoveredArr[recoveredArr.length - 1] - recoveredArr[recoveredArr.length - 8]).toLocaleString()} cases added since last week`
                                    : ` No new cases this week`}
                                </span></p>           
                            </div> 
                    </div>                                      
                </div> 
        </div> 
        </React.Fragment>
    )
}

export default Cards;