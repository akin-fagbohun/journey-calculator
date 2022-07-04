import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getOutFlights } from '../utils/api';

const fetchJourney = async (homeAirport, awayAirport) => {
  const outJourney = await getOutFlights(homeAirport.id, awayAirport.id);
  return outJourney;
};

export default function OutFlight({ allAirports, homeAirport, awayAirport }) {
  const { data, refetch } = useQuery(
    ['outbound', homeAirport, awayAirport],
    () => fetchJourney(homeAirport, awayAirport),
    { enabled: false }
  );

  useEffect(() => {
    if (homeAirport.id && awayAirport.id) {
      refetch();
    }
  }, [homeAirport.id, awayAirport.id]); // eslint-disable-line

  if (data) {
    const flightDistance = data.miles.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    const ticket = flightDistance * 0.1;

    return (
      <div>
        <h2>Outbound Journey</h2>

        <p>
          Tickets will cost <span>{`£${ticket.toFixed(2)}`} per passenger</span>.
        </p>
        <p>
          Your flight will depart from
          <span>{` ${homeAirport.name} `}</span>, destined for
          <span>{` ${awayAirport.name}`}</span>.
        </p>
        <p>
          {data.journey.length === 2
            ? `This is a direct flight.`
            : `Your flight has the following connections`}
        </p>
        {data.journey.length > 2 ? (
          <ul>
            {data.journey.map((connection, i) => {
              if (i !== 0 && i !== data.journey.length - 1) {
                return <li key={connection}>{connection}</li>;
              }
            })}
          </ul>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
