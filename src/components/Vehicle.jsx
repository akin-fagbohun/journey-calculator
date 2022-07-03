import { useEffect, useState } from 'react';
import VehicleCost from './VehicleCost';

export default function Vehicle({ user, homeAirport }) {
  const [mode, setMode] = useState('Car');

  const [calculate, setCalculate] = useState({
    taxiRate: 0.4,
    carRate: 0.2,
    carParking: 3,
    passengers: 1,
  });

  const updatePassengers = (value) => {
    setCalculate({ ...calculate, passengers: Number(value) });
  };

  const toggleMode = (vehicle) => {
    console.log(vehicle);
    setMode(vehicle);
  };

  return (
    <>
      <p>Choose your mode of transport:</p>
      <div>
        <label htmlFor="vehicle-select">Traval by</label>
        <select id="vehicle-select" onChange={(e) => toggleMode(e.target.value)}>
          <option>Car</option>
          <option>Taxi</option>
        </select>
      </div>
      <p>How many passengers?:</p>
      <small>maximum, 4 per vehicle.</small>
      <div>
        <label htmlFor="passengers">Passengers</label>
        <input
          type="number"
          id="car"
          name="passengers"
          min={1}
          max={16}
          onChange={(e) => updatePassengers(e.target.value)}
        />
      </div>
      <VehicleCost mode={mode} user={user} homeAirport={homeAirport} calculate={calculate} />
    </>
  );
}
