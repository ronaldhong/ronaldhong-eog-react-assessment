import * as actions from "../actions";

const initialState = {
  getMultipleMeasurements: []
};

const mutipleMeasurementsDataReceived = (state, action) => {
  const { getMultipleMeasurements } = action;
  return { getMultipleMeasurements };
};
const newMeasurementsDataReceived = (state, action) => {
  if (state.getMultipleMeasurements.hasOwnProperty("getMultipleMeasurements")) {
    for (let i = 0; i < Object.keys(state.getMultipleMeasurements.getMultipleMeasurements).length; i++) {
      if (
        state.getMultipleMeasurements.getMultipleMeasurements[i].metric ===
        action.newMeasurementData.newMeasurement.metric
      ) {
        state.getMultipleMeasurements.getMultipleMeasurements[i].measurements.push(action.newMeasurementData.newMeasurement);
        state.getMultipleMeasurements.getMultipleMeasurements[i].measurements.shift()
      }
    }
  }
  return state;
};

const newMeasurementsDataFailure= (state, action) => {
  return {...state, error: action.error};
};

const mutipleMeasurementsDataFailure= (state, action) => {
  return {...state, error: action.error};
}

const handlers = {
  [actions.METRICS_MEASUREMENTS_RECEIVED]: mutipleMeasurementsDataReceived,
  [actions.NEW_MEASUREMENTS_RECEIVED]: newMeasurementsDataReceived,
  [actions.NEW_MEASUREMENTS_API_CALL_FAIL]: newMeasurementsDataFailure,
  [actions.MULTIPLE_MEASUREMENTS_API_CALL_FAIL]: mutipleMeasurementsDataFailure
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
