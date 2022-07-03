import { useState } from 'react';

export default function Airports({ airports, status, homeAirport, setHomeAirport }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const originSelect = (originAirport) => {
    console.log(originAirport);
    setOrigin(originAirport);
    for (let i = 0; i < airports.length; i++) {
      if (airports[i].name === originAirport) {
        setHomeAirport({
          ...homeAirport,
          name: airports[i].name,
          id: airports[i].id,
          lat: airports[i].latitude,
          lng: airports[i].longitude,
        });
      }
    }
    console.log('origin airport set');
  };

  return (
    <>
      <label htmlFor="origin-select">Travelling from:</label>

      {status === 'loading' && (
        <select id="origin-select">
          <option>loading airports</option>
        </select>
      )}
      {status === 'error' && (
        <select id="origin-select">
          <option>Error fetching airports</option>
        </select>
      )}
      {status === 'success' && (
        <select id="origin-select" onChange={(e) => originSelect(e.target.value)}>
          <option></option>
          {airports.map((airport) => {
            return <option key={`origin-${airport.id}`}>{airport.name}</option>;
          })}
        </select>
      )}
      <label htmlFor="desination-select">Travelling to:</label>
      {status === 'loading' && (
        <select id="destination-select">
          <option>loading airports</option>
        </select>
      )}
      {status === 'error' && (
        <select id="destination-select">
          <option>Error fetching airports</option>
        </select>
      )}
      {status === 'success' && (
        <select id="destination-select" onChange={(e) => setDestination(e.target.value)}>
          <option></option>
          {airports.map((airport) => {
            return <option key={`destination-${airport.id}`}>{airport.name}</option>;
          })}
        </select>
      )}
    </>
  );
}
