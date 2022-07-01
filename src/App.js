import './App.css';
import { useState, useEffect } from 'react';
import DepartureAirportSelect from './components/DepartureAirportSelect';
import CalculateVehicleJourney from './components/CalculateVehicleJourney';

const apiKey = process.env.REACT_APP_API_KEY;

export default function App() {
  const [postcode, setPostcode] = useState(null);
  const [airports, setAirports] = useState([]);
  const [airportCache, setAirportCache] = useState({});
  const [departure, setDeparture] = useState(null);
  const [user, setUser] = useState({
    postcode: '',
    lat: 0,
    lng: 0,
    country: '',
    countryCode: '',
  });

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
        setUser({
          postcode,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          country: 'United Kingdom', // later add country selector
          countryCode: 'GB',
        });
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
            setDeparture={setDeparture}
          />
          <CalculateVehicleJourney user={user} departure={departure} />
        </form>
      </section>
    </main>
  );
}

/* <header className="App-header">
  <button type="button" onClick={handleClick}>
    App
  </button>
  <button type="button" onClick={handleGoogleDistanceClick}>
    Google Distance Click
  </button>
</header> */
