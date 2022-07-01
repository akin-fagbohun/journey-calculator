/**
 *
 *  ⚠️ this component enables the user to select from
 *  a list of airports based in their country.
 *
 *  it accepts a prop state of 'airports' and 'user'
 *  along with the 'airportCache' and 'setAirportCache'
 *  getter and setter.
 *
 */

export default function DepartureAirportSelect(props) {
  const { airports, user, airportCache, setAirportCache } = props;

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleChange = (e) => {
    const selectedAirport = e.target.value;

    let airportLat;
    let airportLng;

    // beforeEach 'checkedAirports' for selectedAirpoty
    if (airportCache.indexOf(selectedAirport) !== -1) {
      // if the item is in the box, what are we doing with it?
      // it needs to be an object with airport keys and good/bad values
    } else if (airportCache.indexOf(selectedAirport) === -1) {
      for (let i = 0; i < airports.length; i++) {
        if (airports[i].name === selectedAirport) {
          airportLat = airports[i].latitude;
          airportLng = airports[i].longitude;
        }
      }

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${airportLat},${airportLng}&key=${apiKey}&result_type=country`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.results.formatted_address === user.country) {
            setAirportCache({ ...airportCache, [selectedAirport]: true });
          } else {
            setAirportCache({ ...airportCache, [selectedAirport]: false });
          }
        })
        .catch((error) => console.error(error));
    }

    // filter the airports array for an airport that matches the check value

    // once found, fetch that geocode the airport

    // if the airport country matches the user country - validate form - else - invalidate form
  };

  if (!user.postcode) {
    return (
      <>
        <label htmlFor="airport-select">Travelling from:</label>
        <select id="airport-select" disabled>
          <option></option>
          {airports.map((airport) => {
            return <option key={airport.id}>{airport.name}</option>;
          })}
        </select>
      </>
    );
  } else {
    return (
      <>
        <label htmlFor="airport-select">Travelling from:</label>
        <select id="airport-select" onChange={(e) => handleChange(e)}>
          <option></option>
          {airports.map((airport) => {
            return <option key={airport.id}>{airport.name}</option>;
          })}
        </select>
      </>
    );
  }
}
