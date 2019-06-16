import React, {useState, useEffect } from "react";
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
    name: 1560604692246,
    tubingPressure: 607.74,
    casingPressure: 463.66,
    oilTemp:  204.27
  },
  {
    name: 1560604693546,
    tubingPressure: 619.09,
    casingPressure: 465.83,
    oilTemp: 194.91
  },
  {
    name: 1560604694847,
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

  const [dataSelected, setGreeting] = useState(props);

  useEffect(() => {
    if (dataSelected !== props) {
      setGreeting(props);
    }
  }, [props]);

  const input = [
    {metricName: "tubingPressure", after: 1560604691151, before:156060470000},
    {metricName: "casingPressure", after: 1560604691151, before:156060470000},
    {metricName: "oilTemp", after: 1560604691151, before:156060470000},
    {metricName: "flareTemp", after: 1560604691151, before:156060470000},
    {metricName: "waterTemp", after: 1560604691151, before:156060470000},
    {metricName: "injValveOpen", after: 1560604691151, before:156060470000}
    ]
  
    
  // const [result] = useQuery({
  //   query,
  //   variables: {input}
  // });
  // if (result.data !== undefined){
  //   // console.log(result.data)
  //   for (let index = 0; index < result.data.getMultipleMeasurements.length; index++) {
  //     console.log(result.data.getMultipleMeasurements[index])
  //   }
  // }

  
  return (
    <div>
      <button />
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
        <XAxis dataKey="name" />
        <YAxis />
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
