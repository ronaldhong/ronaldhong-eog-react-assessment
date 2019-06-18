import * as actions from "../actions";

const initialState = {
  getMultipleMeasurements: []
};

const metricsMeasurementsDataReceived = (state, action) => {
  const { getMultipleMeasurements } = action;
  return { getMultipleMeasurements };
};
const newMeasurementsDataReceived = (state, action) => {
  if (state.getMultipleMeasurements.hasOwnProperty("getMultipleMeasurements")) {
    for (
      let i = 0;
      i <
      Object.keys(state.getMultipleMeasurements.getMultipleMeasurements).length;
      i++
    ) {
      if (
        state.getMultipleMeasurements.getMultipleMeasurements[i].metric ===
        action.newMeasurementData.newMeasurement.metric
      ) {
        state.getMultipleMeasurements.getMultipleMeasurements[
          i
        ].measurements.push(action.newMeasurementData.newMeasurement);
      }
    }
  }
  return state;
};

const handlers = {
  [actions.METRICS_MEASUREMENTS_RECEIVED]: metricsMeasurementsDataReceived,
  [actions.NEW_MEASUREMENTS_RECEIVED]: newMeasurementsDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
