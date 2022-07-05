import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getDistance } from '../utils/api';

const fetchDistance = async (userLat, userLng, airportLat, airportLng) => {
  const distance = await getDistance(userLat, userLng, airportLat, airportLng);
  const miles = distance.data.routes[0].summary.lengthInMeters / 1609.34;
  return miles.toFixed(0);
};

export default function VehicleCost({ user, homeAirport, calculate, mode }) {
  const { data, refetch } = useQuery(
    ['distance', user.lat, user.lng, homeAirport.lat, homeAirport.lng],
    () => fetchDistance(user.lat, user.lng, homeAirport.lat, homeAirport.lng),
    { enabled: false }
  );

  useEffect(() => {
    if (user.lat && user.lng && homeAirport.lat && homeAirport.lng) {
      refetch();
    }
  }, [user.lat, homeAirport.lat]); // eslint-disable-line

  const numberOfVehicles = Math.ceil(calculate.passengers / 4);
  const parking = numberOfVehicles * calculate.carParking;
  const pricePerCar = data * (mode === 'Car' ? calculate.carRate : calculate.taxiRate);
  const carSubTotal = pricePerCar * numberOfVehicles;
  const totalPrice = carSubTotal + (mode === 'Car' ? parking : 0);

  if (data && mode === 'Car') {
    return (
      <>
        <p>{`The journey to the airport will cost £${totalPrice.toFixed(2)}`}</p>
        <p>
          <span>Vehicles required:</span> {`${numberOfVehicles}`}
        </p>
        {mode === 'Car' ? <p>{`This price includes parking charges of £${parking}.`}</p> : <></>}
      </>
    );
  } else if (data && mode === 'Taxi') {
    return (
      <>
        <p>{`The journey to the airport will cost £${totalPrice.toFixed(2)}`}</p>
        <p>{`Vehicles required: ${numberOfVehicles}`}</p>
      </>
    );
  } else if (!data && calculate.passengers > 1) {
    return (
      <p>
        We&apos;re having trouble getting your location. Check that you&apos;ve entered a valid
        postcode!
      </p>
    );
  }
}
