import React, { useState } from 'react'
import axios from "axios";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const linkedinLink = () => {
  window.location.href = "https://www.linkedin.com/in/ryankrohne/"
};
const gitHubLink = () => {
  window.location.href = "https://github.com/Ryan-Krohne"
};

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ce4da213d164a438a2ecb96131b897a3` //api key is deactivated for safety reasons

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">

      <div icons>
        <FaLinkedinIn onClick={linkedinLink}
          size={40}
          style={{
            position: 'relative', /* Set a relative position */
            top: '13px',         /* Move 10 pixels down from its original position */
            left: '1380px',        /* Move 20 pixels to the right */
          }} />

        <FaGithub onClick={gitHubLink}
          size={40}
          style={{
            position: 'relative', /* Set a relative position */
            top: '10px',         /* Move 10 pixels down from its original position */
            left: '1290px',        /* Move 20 pixels to the right */
          }} />
      </div>

      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter a Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>


          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }


        </div>
      </div>
    </div>
  );
}

export default App;
