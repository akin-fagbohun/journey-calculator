import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPostcode } from '../utils/api';

const fetchAddress = async (postcode) => {
  const address = await getPostcode(postcode);

  return address;
};

export default function Postcode({ homeAirport, user, setUser }) {
  const [postcode, setPostcode] = useState(null);

  const { data, refetch } = useQuery(['address', postcode], () => fetchAddress(postcode), {
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setUser({
        ...user,
        postcode,
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        country: 'United Kingdom', // later add country selector
        countryCode: 'GB',
      });
    }
  }, [data]); // eslint-disable-line

  const handleClick = (e) => {
    if (postcode) {
      refetch();
    }
  };

  return (
    <>
      <label htmlFor="postcode">Enter Postcode</label>
      <div className="submit-data">
        <input
          type="text"
          id="name"
          name="postcode"
          required
          onChange={(e) => setPostcode(e.target.value)}
        />

        <button className="btn" type="button" onClick={handleClick}>
          Enter
        </button>
      </div>
    </>
  );
}
