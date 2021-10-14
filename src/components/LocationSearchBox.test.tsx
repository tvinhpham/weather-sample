import React from 'react';
import renderer from 'react-test-renderer';
import LocationSearchBox from './LocationSearchBox';
import { queryClient } from '../utils/helper';
import { QueryClientProvider } from 'react-query';

it('renders search box', () => {

  // @ts-ignore
  const searchBox = renderer
    .create(<QueryClientProvider client={queryClient}><LocationSearchBox /></QueryClientProvider>)
    .toJSON();
  expect(searchBox).toMatchSnapshot();
});
