import React from 'react';

const Select = ({ country, allData, onChange }) => {
    let allCountriesArr = Object.keys(allData) || [];
    
    return (
        <select className="col s12 m4" onChange={onChange}>
              <option defaultValue="Choose country" disabled>{country} </option>
              {allCountriesArr.map((country, i) => {
                return(
                  <option key={i} defaultValue={country}>{country}</option>                  
                  )
              })}
              <option defaultValue={country}>{country}</option>
        </select>
    )
}

export default Select;