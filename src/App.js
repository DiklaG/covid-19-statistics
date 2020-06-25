import React, { Component } from 'react';

import './App.css';
import './css/materialize.min.css';
import Cards from './components/Cards';
import Select from './components/Select';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      allData: [],
      countryData: [],
      todayData: '',
      country: "Israel",
      selectedOption: '',
      selectValue: 'Israel'      
    }
    this.handleChange = this.handleChange.bind(this);
    
  }
  componentDidMount() {
    fetch('https://pomber.github.io/covid19/timeseries.json')
      .then(response => response.json())
      .then(data => {        
        this.setState({ countryData: data[this.state.country], allData: data })
      });
  }
  handleChange(e){ 
    this.setState({      
      country: e.target.value,
      countryData: this.state.allData[e.target.value],
      selectValue: e.target.value
    }, () => {
        console.log('country', this.state.country, 'selectValue',this.state.selectValue);       
    });     
  }
  
  componentDidUpdate() {
    
  }
  render() {    
    const { allData, country, countryData } = this.state;   
    if (countryData.length !== 0){      
    }
// Chart 1
// last 6 days confirmed cases
let lastSixDaysArr = [];
    let lastSixDaysDates = [];
    if (countryData.length !== 0) {
      for (let i = countryData.length - 1; i > countryData.length - 7; i--) {
        let activeCases = countryData[i].confirmed - countryData[i].recovered - countryData[i].deaths;
        lastSixDaysArr.push(activeCases);
        lastSixDaysDates.push(countryData[i].date);
      }
      lastSixDaysArr.reverse(); // last 6 days confirmed cases in chronological order
      lastSixDaysDates.reverse(); // last 6 days dates in chronological order 
    }
    
    const state = {
      labels: lastSixDaysDates,
      datasets: [
        {         
          backgroundColor:                                     
                'rgba(75, 192, 192, 0.2)',
          borderColor:
              'rgba(54, 162, 235, 1)'
          ,
          borderWidth: 1,
          data: lastSixDaysArr
        }
      ]
    } 
    
    // Chart 2
    let weekRecoveriesDates = [],
      previous2WeekDates = [],
      monthDates = [];
    
    if (countryData.length !== 0) {
      for (let j = countryData.length - 1; j > countryData.length - 15; j--) {
        let num = countryData[j].confirmed - countryData[j - 1].confirmed;
        let confirmedAndTime = {
          x: countryData[j].date,
          y: num
        };
        weekRecoveriesDates.push(confirmedAndTime);        
      }          

      for (let k = countryData.length - 15; k > countryData.length - 29; k--) {
        let num1 = countryData[k].confirmed - countryData[k - 1].confirmed;
        let prevconfirmedAndTime = {
          x: countryData[k].date,
          y: num1
        };        
        previous2WeekDates.push(prevconfirmedAndTime);        
      }
              
      for (let i = countryData.length - 1; i > countryData.length - 29; i--) {
        monthDates.push(countryData[i].date);
      }
        
      weekRecoveriesDates.reverse();
      monthDates.reverse();
      previous2WeekDates.reverse();
    }
    var s1 = {
      label: 'Last 2 weeks',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      fill: 'false',
      data: weekRecoveriesDates
  };

  var s2 = {
      label: 'Previous 2 weeks',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      fill: 'false',
      data: previous2WeekDates
  };   

    const bar2state = {
      type: 'line',
      labels: monthDates,
      datasets: [s2, s1]
      
    }  
    //console.log("s1", s1.data, "s2", s2.data);
    return (
      <div className="App">
        <div className="section no-pad-bot valign-wrapper">
          <div className="container center">         
            <h1 className="carbon-text">Covid 19 statistics for
            <Select country={country} onChange={this.handleChange} allData={allData} />            
            </h1>
          <div className="row center">
            <h5 className="header col s12 light">Number of Coronavirus confirmed cases, deaths, and recoveries.</h5>            
          </div>
          <div className="row info">               
              <Cards countryData={countryData} country={country} selectValue={this.state.selectValue} />                
            </div>                       
          </div> 
        </div>
        <div className="container center">
          <div className="row center chart-wrapper">
          <div className="col s12 m12 row tabs-wrapper">
          <Tabs>
            <TabList>
              <Tab>Active cases for the last week</Tab>
              <Tab>Confirmed cases comparison</Tab>
            </TabList>

            <TabPanel>
            <div className="card">
                <Bar
                data={state}
                options={{
                  title:{
                    display:true,
                    text:`# of Active Cases in ${country} during the past week`,
                    fontSize: 18,
                    fontStyle: "normal"
                  },
                  legend:{
                    display:false              
                  }
                }}
                    />
            </div>
            </TabPanel>
            <TabPanel>
            <div className="card">            
                <Line
                data={bar2state}
                options={{
                  title:{
                    display:true,
                    text:`# of Confirmed cases in the past 2 weeks vs. the preceding time`,
                    fontSize: 18,
                    fontStyle: "normal"
                  },
                  legend:{
                    display:false              
                  }
                }}
                    />
            </div>
            </TabPanel>
          </Tabs>
            </div>
          </div>
        </div>
       
        <footer className="container center">
          <div className="row">
              <div className="col m6 s12 left-align">
                  <p className="grey-text text-darken-2">Design and code © Dikla Gefen </p>
              </div>
              <div className="col m6 s12 right-align">
                  <p className="grey-text text-darken-2">API Source: <a target="_blank"
                          href="https://github.com/pomber/covid19">https://github.com/pomber/covid19</a></p>
              </div>
          </div>
      </footer>  
    </div>
     );
  }
}

export default App;
