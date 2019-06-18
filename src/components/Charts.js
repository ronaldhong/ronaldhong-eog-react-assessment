import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
var moment = require('moment');

function formatXAxis(tickItem) {
  tickItem = moment(parseInt(tickItem)).format('LT');
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

const measurementDataToChartFormat = (
  data_list,
  getMultipleMeasurements
) => {
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
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(list);
      return objectsByKeyValue;
    }, {});

  const groupByTime = groupBy('at');

  let sorted_data_list = groupByTime(list)
  let list_of_time = [];
  list_of_time.push(Object.keys(sorted_data_list));
  list_of_time = list_of_time[0];

  for (let index = 0; index < list_of_time.length; index++) {
    let obj = {};
    obj['name'] = list_of_time[index];
    for (let k = 0; k < sorted_data_list[list_of_time[index]].length; k++) {
      obj[sorted_data_list[list_of_time[index]][k].metric] = sorted_data_list[list_of_time[index]][k].value;
    }
    data_list.push(obj);
  }
  return data_list;
};

const Chart = props => {
  const getMultipleMeasurements = useSelector(getMultipleMeasurement);
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

  return (
    <div>
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
            domain={['auto', 'auto']}
            scale="linear"
            padding={{ top: 10, bottom: 10 }}
            tickCount={10}
          />
          <Tooltip
            labelFormatter={t => moment(parseInt(t)).format('lll')}
            useTranslate3d={false}
          />
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
    </div>
  );
};
