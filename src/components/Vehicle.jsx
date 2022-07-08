import { useState, useContext, useCallback } from 'react';
import { SummaryContext } from './contexts/SummaryContext';
import VehicleCost from './VehicleCost';

export default function Vehicle({ user, homeAirport }) {
  const [mode, setMode] = useState('Car');

  const { costSummary, setCostSummary } = useContext(SummaryContext);

  const [calculate, setCalculate] = useState({
    taxiRate: 0.4,
    carRate: 0.2,
    carParking: 3,
    passengers: 1,
  });

  const updatePassengers = useCallback((value) => {
    setCostSummary({ ...costSummary, numberOfPassengers: Number(value) });
    setCalculate({ ...calculate, passengers: Number(value) });
  }, []);

  // const updatePassengers = (value) => {
  //   setCostSummary({ ...costSummary, numberOfPassengers: Number(value) });
  //   setCalculate({ ...calculate, passengers: Number(value) });
  // };

  const toggleMode = (vehicle) => {
    setMode(vehicle);
  };

  return (
    <>
      <p>
        <span>Choose your mode of transport:</span>
      </p>
      <div>
        <label htmlFor="vehicle-select">Travel by</label>
        <select id="vehicle-select" onChange={(e) => toggleMode(e.target.value)}>
          <option>Car</option>
          <option>Taxi</option>
        </select>
      </div>
      <p>
        <span>How many passengers?:</span>
      </p>
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
