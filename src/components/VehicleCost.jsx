import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getDistance } from '../utils/api';

const fetchDistance = async (userLat, userLng, airportLat, airportLng) => {
  const distance = await getDistance(userLat, userLng, airportLat, airportLng);
  const miles = distance.data.routes[0].summary.lengthInMeters / 1609.34; // convert result in metres to meters to miles an return.
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
      console.log('data fetched');
    }
  }, [user.lat, homeAirport.lat]);

  const numberOfVehicles = Math.ceil(calculate.passengers / 4);
  const parking = numberOfVehicles * calculate.carParking;
  const pricePerCar = data * (mode === 'Car' ? calculate.carRate : calculate.taxiRate);
  const carSubTotal = pricePerCar * numberOfVehicles;
  const totalPrice = carSubTotal + (mode === 'Car' ? parking : 0);

  // if (data) {
  //   console.log(
  //     '🏎 ~ file: VehicleCost.jsx ~ line 34 ~ VehicleCost ~ numberOfVehicles',
  //     numberOfVehicles
  //   );
  //   console.log('🅿️ ~ file: VehicleCost.jsx ~ line 35 ~ VehicleCost ~ parking', parking);
  //   console.log('🤑 ~ file: VehicleCost.jsx ~ line 36 ~ VehicleCost ~ pricePerCar', pricePerCar);
  //   console.log('💰 ~ file: VehicleCost.jsx ~ line 37 ~ VehicleCost ~ totalPrice', totalPrice);
  // }

  // if (mode === 'car') {
  //   const price = numberOfVehicles * calculate.carRate;
  //   totalPrice = price + parking;
  // } else if (mode === 'taxi') {
  //   totalPrice = numberOfVehicles * calculate.taxiRate;
  // }

  if (data && mode === 'Car') {
    return (
      <>
        <p>{`The journey to the airport will cost £${totalPrice.toFixed(2)}`}</p>
        <p>{`Vehicles required: ${numberOfVehicles}`}</p>
        {mode === 'Car' ? <p>{`This price includes parking charges of £${parking}.`}</p> : <></>}
      </>
    );
  }
}
