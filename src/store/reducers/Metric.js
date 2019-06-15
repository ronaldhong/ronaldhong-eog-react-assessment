import * as actions from "../actions";

const initialState = {
    getMetrics: {}
  };

const metricsDataReceived =(state,action) =>{
    const {getMetrics} = action;
    return {getMetrics}

}

const handlers = {
    [actions.METRICS_DATA_RECEIVED]: metricsDataReceived
}

export default (state = initialState, action)=>{
    const handler = handlers[action.type];
    if (typeof handler === 'undefined') return state;
    return handler(state, action);
}