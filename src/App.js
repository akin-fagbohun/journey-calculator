import React from 'react';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Airports from './components/Airports/Airports';
import Postcode from './components/Postcode/Postcode';
import Vehicle from './components/Vehicle';
import VehicleDistance from './components/VehicleDistance';
import OutFlight from './components/OutFlight';
import InFlight from './components/InFlight';
import CostSummary from './components/CostSummary';

import './index.css';
import { getAirports } from './utils/api';

const fetchAirports = async () => {
  const airports = await getAirports();
  return airports;
};

export default function App() {
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

  console.log(data);
  return (
    <main className="container">
      <h1 className="header">Airport Journey Planner</h1>

      <section className="App">
        <form className="form">
          <Postcode user={user} setUser={setUser} />
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
          <OutFlight allAirports={data} homeAirport={homeAirport} awayAirport={awayAirport} />
          <InFlight allAirports={data} homeAirport={homeAirport} awayAirport={awayAirport} />
          <CostSummary />
        </form>
      </section>
    </main>
  );
}
