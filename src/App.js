import { useQuery } from 'react-query';
import { useState } from 'react';
import Airports from './components/Airports';
import Postcode from './components/Postcode';
import Vehicle from './components/Vehicle';
import VehicleDistance from './components/VehicleDistance';
import OutFlight from './components/OutFlight';

import './index.css';
import { getAirports } from './utils/api';

const fetchAirports = async () => {
  const airports = await getAirports();
  return airports;
};

export default function App() {
  // const [travelDistance, setTravelDistance] = useState({
  //   vehicle: 0,
  //   outFlight: 0,
  //   inFlight: 0,
  // });
  const [homeAirport, setHomeAirport] = useState({
    name: '',
    id: '',
    lat: '',
    lng: '',
  });

  const [awayAirport, setAwayAirport] = useState({
    name: '',
    id: '',
    lat: '',
    lng: '',
  });

  const [user, setUser] = useState({
    postcode: '',
    lat: 0,
    lng: 0,
    country: '',
    countryCode: '',
  });

  const { data, status } = useQuery('airports', fetchAirports);

  return (
    <main className="container">
      <h1>Airport Journey Planner</h1>
      <section className="App">
        <form className="form">
          <Postcode homeAirport={homeAirport} setUser={setUser} />
          <Airports
            airports={data}
            status={status}
            homeAirport={homeAirport}
            setHomeAirport={setHomeAirport}
            awayAirport={awayAirport}
            setAwayAirport={setAwayAirport}
          />
          <VehicleDistance user={user} setUser={setUser} homeAirport={homeAirport} />
          <Vehicle user={user} homeAirport={homeAirport} />
        </form>
      </section>
      <section>
        <OutFlight homeAirport={homeAirport} awayAirport={awayAirport} />
      </section>
    </main>
  );
}
