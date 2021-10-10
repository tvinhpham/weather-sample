import React from 'react';
import axios from 'axios';
import { FunctionComponent, HTMLAttributes } from 'react';
import { useQuery } from 'react-query';

import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import DayForecast from './DayForecast';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { API_URL } from '../utils/constants';

const getLocationDetails = async ({ queryKey }: any) => {
  let [, locId] = queryKey;

  if (!locId) {
    return null;
  }

  const { data } = await axios.get(`${API_URL}/api/location/${locId}/`);
  return data;
};

const WeatherPanel: FunctionComponent<
  {
    locationId?: number;
  } & HTMLAttributes<HTMLDivElement>
> = ({ locationId, ...props }) => {
  const { isLoading, isError, data } = useQuery(['locationDetails', locationId], getLocationDetails);

  if (isLoading) {
    return <Spinner animation="grow" data-testid="loadingForcast" />;
  }

  if (isError) {
    return (
      <Alert key="forecastPnError" variant="danger">
        Unexpected error occurs: Cannot connect to server
      </Alert>
    );
  }

  return (
    <div {...props}>
      {
        // @ts-ignore
        data?.consolidated_weather?.slice(0, 5)?.map((fc: any, index: number) => (
          <DayForecast
            key={locationId + '_' + index}
            data={fc}
            className="col-12 col-sm-6 col-md-4 col-lg-2 p-2 p-md-1 p-lg-0"
          />
        ))
      }
    </div>
  );
};

export default WeatherPanel;
