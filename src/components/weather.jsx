import React from 'react';

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards">
                {/* City Name */}
                {props.cityName ? (
                    <h1>{props.cityName},{props.countryName}</h1>
                ):null}
                {/* Weather Icon */}
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>

                {/* Degree */}
                  {props.temp_celius ? (<h1 className="py-2">{tempCalc(props.temp_celius,props.tempForm)}&deg; {props.tempForm}</h1>):null}
                  
                {/* Max and Min Temp */}
                {props.temp_celius ? (minMaxTemp(tempCalc(props.temp_min,props.tempForm),tempCalc(props.temp_max,props.tempForm))):null}
                {/* Weather Description */}
                <h4 className="py-3">{props.description}</h4>
                {
                    changeBackground(props.weatherId)
                }
            </div>
        </div>
    )
}

function minMaxTemp(min,max){
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
}
function changeBackground(rangeId){
    switch(true){
        case rangeId >= 200 && rangeId < 232:
            document.body.style.backgroundImage = "url(../imgs/thunder.gif)";
          break;
        case rangeId >= 300 && rangeId <= 321:
            document.body.style.backgroundImage = "url(../imgs/rain.gif)";
          break;
        case rangeId >= 500 && rangeId <= 521:
            document.body.style.backgroundImage = "url(../imgs/rain.gif)";
          break;
        case rangeId >= 600 && rangeId <= 622:
            document.body.style.backgroundImage = "url(../imgs/snow.gif)";
          break;
        case rangeId >= 701 && rangeId <= 781:
            document.body.style.backgroundImage = "url(../imgs/fog.jpg)";
          break;
        case rangeId === 800:
            document.body.style.backgroundImage = "url(../imgs/sun.jpg)";
          break;
        case rangeId >= 801 && rangeId <= 804:
            document.body.style.backgroundImage = "url(../imgs/cloudy.jpg";
          break;
        default:
            document.body.style.backgroundImage = "url(../imgs/default.jpg";
      }
}
function tempCalc (temp,form) {
    let calcTemp = ''
    if(form === 'F'){
      calcTemp = Math.floor(((temp - 273.15) * 9/5) + 32)
    }else{
      calcTemp = Math.floor(temp - 273.15)
    }
    return calcTemp;
  }

export default Weather;