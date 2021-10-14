import React from 'react';
import renderer from 'react-test-renderer';
import DayForecast, { ForecastDetails } from './DayForecast';

it('renders ForecastDetails', () => {
  const data:ForecastDetails = {
    id: 1,
    applicable_date: '2021-10-14',
    max_temp: 20.001,
    min_temp: 30.6,
    weather_state_abbr: 'hc'
  };
  const forecast = renderer
    .create(<DayForecast data={data}/>)
    .toJSON();
  expect(forecast).toMatchSnapshot();
});
