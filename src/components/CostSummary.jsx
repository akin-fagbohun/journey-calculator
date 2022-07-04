export default function CostSummary() {
  return (
    <>
      <h2>Cost Summary</h2>
      <div id="summary-grid">
        <div id="vehicle-summary">
          <p>
            <span>Total Vehicle Journey</span>
          </p>
          <small>toggle vehicle to compare prices</small>
        </div>
        <p id="vehicle-summary-value">£value</p>
        <div id="vehicle-summary-num">
          <p>
            <span>Number of vehicles</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="total-vehicles">£value</p>
        <div id="flight-summary-out">
          <p>
            <span>Total Outbound Flight Cost</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="out-flight-total">£value</p>
        <div id="flight-summary-in">
          <p>
            <span>Total Inbound Flight Cost</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="in-flight-total">£value</p>
        <p id="total-cost">
          <span>Total Journey Cost</span>
        </p>
        <p id="total-cost-value">£value</p>
        <div id="total-cost-person">
          <p>
            <span>Total Journey Cost Per Passenger</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="total-person-value">£value</p>
      </div>
    </>
  );
}
