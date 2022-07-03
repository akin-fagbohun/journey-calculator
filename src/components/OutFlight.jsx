import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getOutFlights } from '../utils/api';

const fetchJourney = async (homeAirport, awayAirport) => {
  const outJourney = await getOutFlights(homeAirport.id, awayAirport.id);
  return outJourney;
};

export default function OutFlight({ homeAirport, awayAirport }) {
  const { data, refetch } = useQuery(
    ['outbound', homeAirport, awayAirport],
    () => fetchJourney(homeAirport, awayAirport),
    { enabled: false }
  );

  useEffect(() => {
    if (homeAirport.id && awayAirport.id) {
      refetch();
    }
  }, [homeAirport.id, awayAirport.id]);

  if (data) {
    console.log(data);
    return (
      <div>
        <h2>Outbound Journey</h2>
        <p>{`Your flight will depart from ${homeAirport.name}`}</p>
        <p>
          {data.journey.length === 2
            ? `This is a direct flight to ${awayAirport.name}`
            : `Your flight has the following connections`}
        </p>
        {data.journey.length > 2 ? (
          <ul>
            {data.journey.map((connection) => {
              return <li key={connection}>{connection}</li>;
            })}
          </ul>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
