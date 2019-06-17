import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const data = [
  {
    name: new Date(1560604692246).toLocaleTimeString(),
    tubingPressure: 607.74,
    casingPressure: 463.66,
    oilTemp:  204.27
  },
  {
    name: new Date(1560604693546).toLocaleTimeString(),
    tubingPressure: 619.09,
    casingPressure: 465.83,
    oilTemp: 194.91
  },
  {
    name: new Date(1560604694847).toLocaleTimeString(),
    tubingPressure: 589.66,
    casingPressure: 473.19,
    oilTemp: 204.36
  }
 
];

export default props => {
  return (
    <Chart props={props} />
  );
};

const Chart = props => {
  // console.log(props)

  // const input = [
  //   {metricName: "tubingPressure", after: 1560604691151, before:156060470000},
  //   {metricName: "casingPressure", after: 1560604691151, before:156060470000},
  //   {metricName: "oilTemp", after: 1560604691151, before:156060470000},
  //   {metricName: "flareTemp", after: 1560604691151, before:156060470000},
  //   {metricName: "waterTemp", after: 1560604691151, before:156060470000},
  //   {metricName: "injValveOpen", after: 1560604691151, before:156060470000}
  //   ]
  
    

  //   for (let index = 0; index < result.data.getMultipleMeasurements.length; index++) {
  //     console.log(result.data.getMultipleMeasurements[index])
  //   }
  // }

  
  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" allowDataOverflow={true} />
        <YAxis domain={['auto', 'auto']} scale="linear" padding={{ top: 10, bottom: 10 }}/>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="tubingPressure"
          strokeOpacity=".5"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="casingPressure"
          strokeOpacity=".5"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="oilTemp"
          strokeOpacity=".5"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <p className="notes">Tips: Hover the legend !</p>
    </div>
  );
};
