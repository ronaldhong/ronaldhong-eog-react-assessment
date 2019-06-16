import * as actions from "../actions";

const initialState = {
    getMultipleMeasurements:[]
  };

const metricsMeasurementsDataReceived =(state, action) =>{
    const {getMultipleMeasurements} = action;
    return {getMultipleMeasurements}

}

const handlers = {
    [actions.METRICS_MEASUREMENTS_RECEIVED]: metricsMeasurementsDataReceived
}

export default (state = initialState, action)=>{
    const handler = handlers[action.type];
    if (typeof handler === 'undefined') return state;
    return handler(state, action);
}
