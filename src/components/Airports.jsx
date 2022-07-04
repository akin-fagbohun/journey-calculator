export default function Airports({
  airports,
  status,
  homeAirport,
  setHomeAirport,
  awayAirport,
  setAwayAirport,
}) {
  const originSelect = (originAirport) => {
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
  };

  const destinationSelect = (destinationAirport) => {
    for (let i = 0; i < airports.length; i++) {
      if (airports[i].name === destinationAirport) {
        setAwayAirport({
          ...awayAirport,
          name: airports[i].name,
          id: airports[i].id,
          lat: airports[i].latitude,
          lng: airports[i].longitude,
        });
      }
    }
  };

  return (
    <>
      <h2>Outbound Flights</h2>
      <label htmlFor="origin-select">Travelling from:</label>

      {status === 'loading' && (
        <select id="origin-select">
          <option></option>
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
          <option></option>
        </select>
      )}
      {status === 'error' && (
        <select id="destination-select">
          <option>Error fetching airports</option>
        </select>
      )}
      {status === 'success' && (
        <select id="destination-select" onChange={(e) => destinationSelect(e.target.value)}>
          <option></option>
          {airports.map((airport) => {
            return <option key={`destination-${airport.id}`}>{airport.name}</option>;
          })}
        </select>
      )}
    </>
  );
}
