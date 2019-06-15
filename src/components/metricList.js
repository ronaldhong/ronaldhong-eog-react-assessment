import React, { useEffect } from "react";
import { Provider, createClient, useQuery } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import CircularProgress from "@material-ui/core/LinearProgress";
import MetricSelect from './MetricSelect'

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const query = `
    query {
        getMetrics
    }`;

const getMetric = state => {
  const getMetrics = state.metric.getMetrics;
  return getMetrics;
};

export default () => {
  return (
    <Provider value={client}>
      <MetricList />
    </Provider>
  );
};

const MetricList = () => {
  const dispatch = useDispatch();
  const { getMetrics } = useSelector(getMetric);
  const [result] = useQuery({
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
  console.log("getMetrics", getMetrics);
  if (!getMetrics) return <CircularProgress />;
  
  return (
    <MetricSelect  metricList={getMetrics}/>
  );
};
