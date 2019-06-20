import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import TooltipBox from "./TooltipBox";

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

const measurementDataToChartFormat = (data_list, getMultipleMeasurements) => {
  let data = getMultipleMeasurements.getMultipleMeasurements;
  if (data.length === 0) {
    return [];
  }
  let metric_length = data[0].measurements.length;
  let data_chart_format = [];

  for (let index = 0; index < metric_length; index++) {
    let obj = {};
    for (let j = 0; j < data.length; j++) {
      obj[data[j].measurements[index].metric] =
        data[j].measurements[index].value;
      obj["name"] = data[j].measurements[index].at;
    }
    data_chart_format.push(obj);
  }
  return data_chart_format;

  /////////
  // It was 12am midnight, I was hungry.
  /////////
  // for (let i = 0; i < data.length; i++) {
  //   for (let j = 0; j < data[i].measurements.length; j++) {
  //     let data_total_sort = data[i].measurements[j];
  //     list.push(data_total_sort);
  //   }
  // }
  // const groupBy = key => array =>
  //   array.reduce((objectsByKeyValue, list) => {
  //     const value = list[key];
  //     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(list);
  //     return objectsByKeyValue;
  //   }, {});
  // const groupByTime = groupBy('at');
  // let sorted_data_list = groupByTime(list)
  // let list_of_time = [];
  // list_of_time.push(Object.keys(sorted_data_list));
  // list_of_time = list_of_time[0];
  // for (let index = 0; index < list_of_time.length; index++) {
  //   let obj = {};
  //   obj['name'] = list_of_time[index];
  //   for (let k = 0; k < sorted_data_list[list_of_time[index]].length; k++) {
  //     obj[sorted_data_list[list_of_time[index]][k].metric] = sorted_data_list[list_of_time[index]][k].value;
  //   }
  //   data_chart_format.push(obj);
  // }
  // return data_chart_format;
};

const Chart = props => {
  const getMultipleMeasurements = useSelector(getMultipleMeasurement);
  const [state, setState] = React.useState({
    tooltip: [],
  });
  let data_list = [];
  if (getMultipleMeasurements.length !== 0) {
    data_list = measurementDataToChartFormat(
      data_list,
      getMultipleMeasurements
    );
  }
  if (props.props.command.value.length === 0) {
    return null;
  }
  if (data_list.length === 0) {
    return <div>NO DATA</div>;
  }

  const displayTooltip = name => e => {
    setState({ ...state, [name]: e });
  };
  const hideTooltip = name => e =>{
    setState({...state, [name]: []})
  }

  return (
    <div>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data_list}
          onMouseMove={displayTooltip("tooltip")}
          onMouseLeave={hideTooltip("tooltip")}
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
            tickCount={10}
          />
          {/* <Tooltip
            labelFormatter={t => moment(parseInt(t)).format("lll")}
            useTranslate3d={false}
          /> */}
          <Legend />

          {props.props.command.value
            ? props.props.command.value.map(a => {
                return (
                  <Line
                    type="monotone"
                    key={`${a}`}
                    dataKey={`${a}`}
                    strokeOpacity="1"
                    stroke="red"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                    dot={false}
                  />
                );
              })
            : null}
        </LineChart>
      </ResponsiveContainer>
      {state.tooltip === false ? null: <TooltipBox tooltipInfo = {state.tooltip}/>}
      

    </div>
  );
};
