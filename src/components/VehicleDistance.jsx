import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getDistance } from '../utils/api';

const fetchDistance = async (userLat, userLng, airportLat, airportLng) => {
  const distance = await getDistance(userLat, userLng, airportLat, airportLng);
  const miles = distance.data.routes[0].summary.lengthInMeters / 1609.34; // convert result in metres to meters to miles an return.
  return miles.toFixed(0);
};

export default function VehicleDistance({ user, homeAirport, travelDistance, setTravelDistance }) {
  const { data, refetch } = useQuery(
    ['distance', user.lat, user.lng, homeAirport.lat, homeAirport.lng],
    () => fetchDistance(user.lat, user.lng, homeAirport.lat, homeAirport.lng),
    { enabled: false }
  );

  console.log('🚀 ~ file: VehicleDistance.jsx ~ line 13 ~ VehicleDistance ~ data', data);

  useEffect(() => {
    if (user.postcode && homeAirport.name) {
      refetch();
    }
  }, [user.postcode, homeAirport.name]);

  if (data) {
    // setTravelDistance({ ...travelDistance, vehicle: data });
    console.log('travel distance set');
    return <p>The travel distance to the airport is {data} miles.</p>;
  } else {
    return <></>;
  }
}
