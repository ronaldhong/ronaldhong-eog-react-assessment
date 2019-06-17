import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import CircularProgress from "@material-ui/core/LinearProgress";
import { Dropdown } from "semantic-ui-react";
import Charts from "./Charts";

const query_metric = `
    query {
        getMetrics
    }`;

const query_multiple_measurements = `
    query($input: [MeasurementQuery] = [{metricName: "tubingPressure", after: 1560712691613, before: 1560712711613},{metricName: "casingPressure", after: 1560712691613, before: 1560712711613}]
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

// {metricName: "tubingPressure", after: 1560712411613, before: 1560712711613}
// {metricName: "casingPressure", after: 1560712411613, before: 1560712711613}

const FetchMultipleMeasurements = e => {
  let query = query_multiple_measurements;
  const dispatch = useDispatch();
  let [result] = useQuery({
    query,
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
    console.log("TESTSAFSTAWTATA")
    const getMultipleMeasurements = data;
    dispatch({
      type: actions.METRICS_MEASUREMENTS_RECEIVED,
      getMultipleMeasurements
    });
  }, [dispatch, data, error]);
};

const MetricList = () => {
  FetchMetricList();
  const { getMetrics } = useSelector(getMetric);
  FetchMultipleMeasurements(getMetrics);
  const { getMultipleMeasurements } = useSelector(getMultipleMeasurement);
  const [metricSearched, setGreeting] = useState([]);
  // const [result] = useSubscription({
  //   query: metric_Subscription_Query,
  //   variables: {}
  // });
  if (!getMetrics) return <CircularProgress />;
  let options = [];
  getMetrics.forEach(value => {
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
      <Charts
        dataSelected={metricSearched}
        displayMultipleMeasurements={getMultipleMeasurements}
      />
    </div>
  );
};
