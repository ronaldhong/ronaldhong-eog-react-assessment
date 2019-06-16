import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import CircularProgress from "@material-ui/core/LinearProgress";
import { Dropdown } from "semantic-ui-react";
import Charts from "./Charts";
// import Grid from "@material-ui/core/Grid";

const query_metric = `
    query {
        getMetrics
    }`;

const query_multiple_measurements = `
    query(
      $input: [MeasurementQuery] = [{metricName: "oilTemp", after: 1560702120000, before:1560702139383}]
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

const getMetric = state => {
  const getMetrics = state.metric.getMetrics;
  return getMetrics;
};

const getMultipleMeasurement = state =>{
  const getMultipleMeasurements = state.metricsMeasurements.getMultipleMeasurements;
  return getMultipleMeasurements;
}

export default () => {
  return <MetricList />;
};

const FetchMetricList = () => {
  let query = query_metric;
  const dispatch = useDispatch();
  const { getMetrics } = useSelector(getMetric);
  let [result] = useQuery({
    query,
    variables: {}
  });
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) {
      return;
    }
    const getMetrics = data;
    dispatch({ type: actions.METRICS_DATA_RECEIVED, getMetrics });
  }, [dispatch, data, error]);

  return getMetrics;
};

const FetchMultipleMeasurements = (e) => { 
  let query = query_multiple_measurements;
  const dispatch = useDispatch();
  const {getMultipleMeasurements} = useSelector(getMultipleMeasurement);
  let [result] = useQuery({
    query,
    variables: {}
  });
  const {data, error} = result;
  useEffect(()=>{
    if (error){return;}
    if (!data){return;}
    const getMultipleMeasurements = data;
    dispatch({type: actions.METRICS_MEASUREMENTS_RECEIVED, getMultipleMeasurements});
  },[dispatch, data, error]);

  return getMultipleMeasurements
};

const MetricList = () => {
  let getMetricsList = FetchMetricList();
  let getMetrics_measurement = FetchMultipleMeasurements(getMetricsList);
  const [metricSearched, setGreeting] = useState([]);
  if (!getMetricsList) return <CircularProgress />;
  let options = [];
  getMetricsList.forEach(value => {
    let obj = { key: value, text: value, value: value };
    options.push(obj);
  });

  const handleChange = (event, { value }) => {
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
        onChange={handleChange}
      />
      <Charts dataSelected={metricSearched} />
    </div>
  );
};
