import React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import Card from 'react-bootstrap/Card';
import { parseISO, format } from 'date-fns';
import LazyLoadImage from './LazyLoadImage';
import { API_URL } from '../utils/constants';

export type ForecastDetails = {
  id: number;
  applicable_date: string;
  max_temp: number;
  min_temp: number;
  weather_state_abbr: string;
};

const getDayOfWeek = (date: string) => {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'EEEE');
};

const DayForecast: FunctionComponent<{ data: ForecastDetails } & HTMLAttributes<HTMLElement>> = ({
  data,
  ...props
}) => {
  const { weather_state_abbr, applicable_date, min_temp, max_temp } = data;
  return (
    <div {...props}>
      <Card>
        <Card.Header>
          <Card.Title className="text-center">{getDayOfWeek(applicable_date)}</Card.Title>
        </Card.Header>
        <LazyLoadImage src={`${API_URL}/static/img/weather/${weather_state_abbr}.svg`} />
        <Card.Body className="d-flex flex-column">
          <span className="text-center"> Min: {min_temp.toFixed(0)}&#8451;</span>
          <span className="text-center">Max: {max_temp.toFixed(0)}&#8451;</span>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DayForecast;
