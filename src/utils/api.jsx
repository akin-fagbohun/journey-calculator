import axios from 'axios';

const google_Key = process.env.REACT_APP_API_KEY;
const tomTom_key = process.env.REACT_APP_TOMTOM_API_KEY;

const tomTomApi = axios.create({
  baseURL: 'https://api.tomtom.com/routing/1/calculateRoute/',
});

const panApi = 'https://7302htasp6.execute-api.eu-west-1.amazonaws.com/v1';

export const getDistance = (userLat, userLng, destinationLat, destinationLng) => {
  return tomTomApi
    .get(`${userLat}%2C${userLng}%3A${destinationLat}%2C${destinationLng}/json?key=${tomTom_key}`)
    .then((res) => res)
    .catch((error) => console.error(error));
};

export const getAirports = () => {
  return fetch(`${panApi}/airport`)
    .then((res) => res.json())
    .catch((error) => console.error(error));
};

export const getOutFlights = (homeAirportId, awayAirportId) => {
  return fetch(`${panApi}/airport/${homeAirportId}/to/${awayAirportId}`)
    .then((res) => res.json())
    .catch((error) => console.error(error));
};

export const getInFlights = (homeAirportId, awayAirportId) => {
  return fetch(`${panApi}/airport/${awayAirportId}/to/${homeAirportId}`)
    .then((res) => res.json())
    .catch((error) => console.error(error));
};

export const getPostcode = (postcode) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${google_Key}`
  )
    .then((res) => res.json())
    .catch((error) => console.error(error));
};
