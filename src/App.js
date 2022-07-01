import './App.css';
import { useState, useEffect } from 'react';
import DepartureAirportSelect from './components/DepartureAirportSelect';

const apiKey = process.env.REACT_APP_API_KEY;

export default function App() {
  const [postcode, setPostcode] = useState(null);
  const [user, setUser] = useState({
    postcode: '',
    lat: 0,
    lng: 0,
    country: '',
    countryCode: '',
  });
  const [airports, setAirports] = useState([]);
  const [airportCache, setAirportCache] = useState({});

  useEffect(() => {
    fetch('https://7302htasp6.execute-api.eu-west-1.amazonaws.com/v1/airport')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAirports(data);
      })
      .catch((error) => console.error(error));
  }, [airports.length]);

  const getPostcode = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setAirportCache([]);
        console.log(data);
        setUser({
          postcode,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          country: 'United Kingdom', // later add country selector
          countryCode: 'GB',
        });

        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <main className="container">
      <section className="App">
        <form className="form">
          <label htmlFor="postcode">Enter Postcode</label>
          <div className="submit-data">
            <input
              type="text"
              id="name"
              name="postcode"
              required
              onChange={(e) => setPostcode(e.target.value)}
            />

            {postcode ? (
              <button type="button" onClick={getPostcode}>
                Google Postcode Click
              </button>
            ) : (
              <button type="button" onClick={getPostcode} disabled>
                Google Postcode Click
              </button>
            )}
          </div>
          <DepartureAirportSelect
            airports={airports}
            user={user}
            airportCache={airportCache}
            setAirportCache={setAirportCache}
          />
        </form>
      </section>

      {/* <header className="App-header">
        <button type="button" onClick={handleClick}>
          App
        </button>
        <button type="button" onClick={handleGoogleDistanceClick}>
          Google Distance Click
        </button>
      </header> */}
    </main>
  );
}

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY valid single value query

// const handleClick = () => {
//   fetch('https://7302htasp6.execute-api.eu-west-1.amazonaws.com/v1/airport').then((res) => {
//     res.json().then((data) => console.log(data));
//   });
// };

// const handleGoogleDistanceClick = () => {
//   fetch().then((res) => {
//     // `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${userLat}%2C${userLng}&origins=${airportLat}%2C${airportLng}&key=${apiKey}`
//     res.json().then((data) => console.log(data));
//   });
// };
