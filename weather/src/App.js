import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class WeatherDislay extends Component {
  constructor () {
    super();
    this.state = {
      weatherData:null
    }
  }
  componentDidMount () {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({weatherData:json});
    });
  }
  render () {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";

    return (
    <div>
      <h1>
        {weather.main} in {weatherData.name}
        <img src={iconUrl} alt={weatherData.description} />
      </h1>
      <p>Current: {weatherData.main.temp} </p>
      <p>High: {weatherData.main.temp_max} </p>
      <p>Low: {weatherData.main.temp_min} </p>
      <p>Wind Speed: {weatherData.wind.speed} </p>
    </div>);
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      activePlace:0,
    };
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <WeatherDislay 
          zip={PLACES[activePlace].zip}
          key={activePlace}
        />
        {PLACES.map((place,index) => (
          <button 
            key={index}
            onClick={() => {
              this.setState({activePlace:index});
            }}
          >
          {place.name}
          </button>
        ))}
      </div>
    );
  }
}

export default App;
