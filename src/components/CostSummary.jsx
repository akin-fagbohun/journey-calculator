import React from 'react';
import { useContext, useMemo } from 'react';
import { SummaryContext } from './contexts/SummaryContext';

export default function CostSummary() {
  const { costSummary } = useContext(SummaryContext);

  const totalVehicles = useMemo(() => {
    console.log('🚀 ~ file: CostSummary.jsx ~ line 7 ~ CostSummary ~ costSummary', costSummary);
    return costSummary.numberOfVehicles;
  }, [costSummary.numberOfVehicles]);

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
        <p id="vehicle-summary-value">{`£${costSummary.vehicleCost.toFixed(2)}`}</p>
        <div id="vehicle-summary-num">
          <p>
            <span>Number of vehicles</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="total-vehicles">{totalVehicles}</p>
        <div id="flight-summary-out">
          <p>
            <span>Total Outbound Flight Cost</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="out-flight-total">£{costSummary.outFlightCost.toFixed(2)}</p>
        <div id="flight-summary-in">
          <p>
            <span>Total Inbound Flight Cost</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="in-flight-total">£{costSummary.inFlightCost.toFixed(2)}</p>
        <p id="total-cost">
          <span>Total Journey Cost</span>
        </p>
        <p id="total-cost-value">
          £
          {(costSummary.vehicleCost + costSummary.outFlightCost + costSummary.inFlightCost).toFixed(
            2
          )}
        </p>
        <div id="total-cost-person">
          <p>
            <span>Total Journey Cost Per Passenger</span>
          </p>
          <small>based on number of passengers</small>
        </div>
        <p id="total-person-value">
          £
          {(
            (costSummary.vehicleCost + costSummary.outFlightCost + costSummary.inFlightCost) /
            costSummary.numberOfPassengers
          ).toFixed(2)}
        </p>
      </div>
    </>
  );
}
