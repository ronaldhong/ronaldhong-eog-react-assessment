import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import CircularProgress from "@material-ui/core/LinearProgress";
import { Dropdown } from "semantic-ui-react";
import Charts from "./Charts";

const current_time = new Date().valueOf()
const query_metric = `
    query {
        getMetrics
    }`;

const query_multiple_measurements = `
    query($input: [MeasurementQuery] = [
      {metricName: "tubingPressure", after: ${current_time - 10000}, before: ${current_time}},
      {metricName: "casingPressure", after: ${current_time - 10000}, before: ${current_time}},
      {metricName: "oilTemp", after: ${current_time - 10000}, before: ${current_time}},
      {metricName: "flareTemp", after: ${current_time - 10000}, before: ${current_time}},
      {metricName: "waterTemp", after: ${current_time - 10000}, before: ${current_time}},
      {metricName: "injValveOpen", after: ${current_time - 10000}, before: ${current_time}}
    ]
    ){
      getMultipleMeasurements(input: $input) {
        metric
        measurements {
         at
         value
         metric
         unit
        }
      }
    }`;
const metric_Subscription_Query = `
  subscription {
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
`;

const getMetric = state => {
  const getMetrics = state.metric.getMetrics;
  return getMetrics;
};

const getMultipleMeasurement = state => {
  const getMultipleMeasurements =
    state.metricsMeasurements.getMultipleMeasurements;
  return getMultipleMeasurements;
};

const getNewMeasurementData = state =>{
  const getNewMeasurementDatas = state.metricsMeasurements.getMultipleMeasurements;
  return getNewMeasurementDatas
}

export default () => {
  return <MetricList />;
};

const FetchMetricList = () => {
  let query = query_metric;
  const dispatch = useDispatch();
  let [result] = useQuery({
    query,
    variables: {}
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    const getMetrics = data;
    dispatch({ type: actions.METRICS_DATA_RECEIVED, getMetrics });
  }, [dispatch, data, error, fetching]);
};

const CheckMetricHasData = e => {
  let query_data = [];
  let time_current = new Date().getTime();
  let time_before = time_current - 5 * 60 * 1000;
  if (!e) return;
  for (let index = 0; index < e.length; index++) {
    query_data.push({
      metricName: e[index],
      after: time_before,
      before: time_current
    });
  }
  return query_data;
};

const FetchMultipleMeasurements = () => {
  const dispatch = useDispatch();
  let [result] = useQuery({
    query: query_multiple_measurements,
    variable: []
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) {
      return;
    }
    const getMultipleMeasurements = data;
    dispatch({
      type: actions.METRICS_MEASUREMENTS_RECEIVED,
      getMultipleMeasurements
    });
  }, [dispatch, data, error]);
};

const FetchNewMeasurementData = ()=>{  ///FetchNewMeasurementData has real time data, dispatch an action and will update the total measurement data
  const dispatch = useDispatch();
  const [result] = useSubscription({
    query: metric_Subscription_Query,
    variables: {}
  }); 
  const {data, error} = result;
  useEffect(()=>{
    if (error){
      return;
    }
    if (!data){
      return;
    }
    const newMeasurementData = data;
    dispatch({
      type: actions.NEW_MEASUREMENTS_RECEIVED,
      newMeasurementData
    })
  }, [data, error, dispatch])
}

const MetricList = () => {
  FetchMetricList(); ///get the list of metrics for dropdown
  const { getMetrics } = useSelector(getMetric);
  FetchMultipleMeasurements();
  FetchNewMeasurementData(); 
  const [metricsSelected, setGreeting] = useState([]);
  const {getMultipleMeasurements} = useSelector(getMultipleMeasurement)
  if (!getMetrics) return <CircularProgress />;

  let options = [];
    getMetrics.forEach(value => {
      let obj = { key: value, text: value, value: value };
      options.push(obj);
    });

  const handleSelectionChange = (event, { value }) => {
    setGreeting({ value });
  };

  return (
    <div>
      <Dropdown
        placeholder="Select..."
        fluid
        multiple
        selection
        options={options}
        style={{ width: "500px" }}
        onChange={handleSelectionChange}
      />
      <Charts
        dataSelected={metricsSelected}
      />
    </div>
  );
};
