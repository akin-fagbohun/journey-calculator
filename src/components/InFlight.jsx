import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getInFlights } from '../utils/api';

const fetchJourney = async (homeAirport, awayAirport) => {
  const inJourney = await getInFlights(homeAirport.id, awayAirport.id);
  return inJourney;
};

export default function InFlight({ allAirports, homeAirport, awayAirport }) {
  const { data, refetch } = useQuery(
    ['inbound', homeAirport, awayAirport],
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
        <h2>Inbound Journey</h2>

        <p>
          Tickets will cost <span>{`£${ticket.toFixed(2)}`} per passenger</span>.
        </p>
        <p>
          Your flight will depart from <span>{` ${awayAirport.name}`}</span>, returning to
          <span>{` ${homeAirport.name}`}</span>.
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
                return allAirports
                  .filter((airport) => airport.id === connection)
                  .map((filteredAirport) => <li key={connection}>{filteredAirport.name}</li>);
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
