import * as actions from "../actions";

const initialState = {
    getMetrics: []
  };

const metricsDataReceived =(state,action) =>{
    const {getMetrics} = action;
    return {getMetrics}
}

const metricsDataFailed =(state, action)=>{
    return {...state, error: action.error}
}

const handlers = {
    [actions.METRICS_DATA_RECEIVED]: metricsDataReceived,
    [actions.METRIC_API_CALL_FAIL]: metricsDataFailed
}

export default (state = initialState, action)=>{
    const handler = handlers[action.type];
    if (typeof handler === 'undefined') return state;
    return handler(state, action);
}