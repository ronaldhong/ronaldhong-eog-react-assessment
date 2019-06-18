import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

export default props => {
  return props.display.value.length !== 0 ? <DisplayBox props={props} /> : null;
};

const getNewMeasurementData = state => {
  const getNewMeasurementDatas =
    state.metricsMeasurements.getMultipleMeasurements;
  return getNewMeasurementDatas;
};

const DisplayBox = props => {
  let box_display_list = props.props.display.value;
  const getNewMeasurementDatas = useSelector(getNewMeasurementData);
  let new_data = getNewMeasurementDatas.getMultipleMeasurements;
  let list = [];
  for (let index = 0; index < new_data.length; index++) {
    let data = new_data[index].measurements.slice(-1)[0];
    if (box_display_list.includes(data.metric)) list.push(data);
  }

  return (
    <div>
      <Grid columns="equal" divided>
        {list
          ? list.map(a => {
              return (
                <Grid.Column key={a.metric} style={{ margin: '20px' }}>
                  <Segment>
                    {a.metric} : <h2>{a.value}</h2><p>{a.unit}</p>
                  </Segment>
                </Grid.Column>
              );
            })
          : null}
      </Grid>
    </div>
  );
};
