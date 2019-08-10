import React, { Component } from 'react';
import './App.css';
import Weather from './components/weather'
import Form from './components/form'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'


const APIkey = 'b302a0a87aabb08b4029ea03af6e4705';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
      tempForm : 'F'
    }
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }
  tempFormChange = (deg) =>{
    this.setState({
      tempForm : deg
    })
  }

  getWeatherIcon(icon,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }

  }


  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if(city && country){
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`
        )
      const response = await api_call.json()
      console.log(response)
  
      this.setState({
        city : response.name,
        country : response.sys.country,
        main: undefined,
        celsius: response.main.temp,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        description: response.weather[0].description,
        icon: this.weatherIcon.Thunderstorm,
        weatherId : response.weather[0].id,
      })
      this.getWeatherIcon(this.weatherIcon,response.weather[0].id)
    }else{
      this.setState({
        error : true
      })
    }
  }
  render() { 
    return (
      <div className="App">
        <Form
          loadWeather={this.getWeather}
          error={this.state.error}
        ></Form>
        <Weather
          cityName={this.state.city}
          countryName={this.state.country}
          temp_celius={this.state.celsius}
          temp_min = {this.state.temp_min}
          temp_max = {this.state.temp_max}
          description = {this.state.description}
          weatherIcon = {this.state.icon}
          weatherId = {this.state.weatherId}
          tempForm = {this.state.tempForm}
        ></Weather>
        {this.state.city ? (
            <div className='tempSelect'>
            <p id='F'
              onClick={() =>{
                this.tempFormChange('F')
              }}
            >F&deg;</p>
            <p id="C"
              onClick={() =>{
                let deg = 'C'
                this.tempFormChange(deg)
              }}
            >C&deg;</p>
            
          </div>
        ):null}
      </div>
    );
  }
}
 
export default App;