/**
 *
 *  ⚠️ this component handles the journey calculation
 *  from the user's desired starting location to their
 *  departure airport.
 *
 *  it accepts the following props
 *  'user'
 *  'departure'
 *
 */

export default function CalculateVehicleJourney(props) {
  const { user, departure } = props;

  const apiKey = process.env.REACT_APP_API_KEY;

  // fetch distance with Matrix API

  if (user.postcode && departure) {
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${departure.lat}%2C${departure.lng}&origins=${user.lat}%2C${user.lng}&key=${apiKey}`
    ).then((res) => {
      res.json().then((data) => console.log(data));
    });
  }

  // const handleGoogleDistanceClick = () => {
  //   fetch(
  //     `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${departure.lat}%2C${departure.lng}&origins=${user.lat}%2C${user.lng}&key=${apiKey}`
  //   ).then((res) => {
  //     res.json().then((data) => console.log(data));
  //   });
  // };

  return (
    <>
      <p>Choose your mode of transport:</p>
      <div>
        <input type="radio" id="car" name="vehicle" value="car" />
        <label htmlFor="car">Car</label>
        <input type="radio" id="taxi" name="vehicle" value="taxi" />
        <label htmlFor="taxi">Taxi</label>
      </div>
    </>
  );
}
