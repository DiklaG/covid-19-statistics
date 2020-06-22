import React, { Fragment } from 'react';

const CardConfirmed = ({ cardData }) => {
    return (
        <React.Fragment>  
         <div className="card">
                <div className="card-content"> 
                <h2 className="center teal-text"><i className="material-icons">local_hospital</i></h2>        
                <div id="confirmed-info">
                                <h4 id="confirmed" className="center"> {cardData.confirmed}</h4>
                                <h6>Confirmed cases</h6>
                                <p className="light">
                                    <span id="confirmedAddedDiv"></span>
                                </p>
                            </div>                                      
            </div> 
        </div> 
        </React.Fragment>
    )
}

export default CardConfirmed;