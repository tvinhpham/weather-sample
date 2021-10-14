import React from 'react';
import renderer from 'react-test-renderer';
import LocationSearchBox from './LocationSearchBox';
import { queryClient } from '../utils/helper';
import { QueryClientProvider } from 'react-query';
import WeatherPanel from './WeatherPanel';

it('renders with loading expectation', () => {
  // @ts-ignore
  const searchBox = renderer
    .create(<QueryClientProvider client={queryClient}><WeatherPanel locationId={2487956} /></QueryClientProvider>)
    .toJSON();
  expect(searchBox).toMatchSnapshot();
});

