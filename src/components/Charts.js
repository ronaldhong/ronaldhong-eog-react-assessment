import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Dropdown } from "semantic-ui-react";
import CircularProgress from "@material-ui/core/LinearProgress";
var moment = require("moment");

function formatXAxis(tickItem) {
  tickItem = moment(parseInt(tickItem)).format("LT");
  return tickItem;
}

export default props => {
  return <Chart props={props} />;
};

const getMultipleMeasurement = state => {
  const getMultipleMeasurements =
    state.metricsMeasurements.getMultipleMeasurements;
  return getMultipleMeasurements;
};

const getMetric = state => {
  const getMetrics = state.metric.getMetrics;
  return getMetrics;
};

const turnMeasurementDataToChartFormat=(data_list, getMultipleMeasurements)=>{
  let list = [];
  let datas = getMultipleMeasurements.getMultipleMeasurements;
  for (let i = 0; i < datas.length; i++) {
    for (let j = 0; j < datas[i].measurements.length; j++) {
      let data = datas[i].measurements[j];
      list.push(data);
    }
  }

  const groupBy = key => array =>
    array.reduce((objectsByKeyValue, list) => {
      const value = list[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(
        list
      );
      return objectsByKeyValue;
    }, {});

  const groupByTime = groupBy("at");

  let v = groupByTime(list);
  let list_of_time = [];
  list_of_time.push(Object.keys(v));
  list_of_time = list_of_time[0];

  for (let index = 0; index < list_of_time.length; index++) {
    let obj = {};
    obj["name"] = list_of_time[index];
    for (let k = 0; k < v[list_of_time[index]].length; k++) {
      obj[v[list_of_time[index]][k].metric] = v[list_of_time[index]][k].value;
    }
    data_list.push(obj);
  }
  return data_list;
};

const turnMetricListToDropDownFormat=(options, getMetrics)=>{
  getMetrics.getMetrics.forEach(value => {
    let obj = { key: value, text: value, value: value };
    options.push(obj);
  });
  return options;
}

const Chart = () => {
  const getMultipleMeasurements = useSelector(getMultipleMeasurement);
  const getMetrics = useSelector(getMetric);
  let data_list = [];
  if (getMetrics.length === 0) return <CircularProgress />;
  if (getMultipleMeasurements.length !== 0) {
    data_list = turnMeasurementDataToChartFormat(data_list, getMultipleMeasurements)
  };

  let options = [];
  options = turnMetricListToDropDownFormat(options, getMetrics);
  

  // const handleSelectionChange = (event, { value }) => {
  //   setGreeting([value]);
  // };
  const handleSelectionChange = () => {};

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
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data_list}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            allowDataOverflow={true}
            tickFormatter={formatXAxis}
          />
          <YAxis
            domain={["auto", "auto"]}
            scale="linear"
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip labelFormatter={t => moment(parseInt(t)).format("lll")} />
          <Legend />

          {/* {props.props.dataSelected[0]
          ? props.props.dataSelected[0].map(a => {
              return (
                <Line
                  type="monotone"
                  key={`${a}`}
                  dataKey={`${a}`}
                  strokeOpacity=".5"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  isAnimationActive={false}
                />
              );
            }) */}
          {/* : null} */}

          <Line
            type="monotone"
            dataKey="tubingPressure"
            strokeOpacity=".5"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            hide={false}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="casingPressure"
            strokeOpacity=".5"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="oilTemp"
            strokeOpacity=".5"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="waterTemp"
            strokeOpacity=".5"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="flareTemp"
            strokeOpacity=".5"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="injValveOpen"
            strokeOpacity=".5"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
