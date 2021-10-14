import React, { useState } from 'react';

import './App.css';
import { QueryClientProvider } from 'react-query';
import Container from 'react-bootstrap/Container';
import LocationSearchBox from './components/LocationSearchBox';
import WeatherPanel from './components/WeatherPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { queryClient } from './utils/helper';

function App() {
  const [location, setLocation] = useState<any>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <LocationSearchBox onLocationSelected={(loc) => setLocation(loc)} className="col-12 col-lg-6" />
        <WeatherPanel locationId={location?.woeid} className="mt-2 d-flex flex-wrap flex-row justify-content-around" />
      </Container>
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
}

export default App;
