import React from 'react';
import axios from 'axios';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useQuery } from 'react-query';

import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { API_URL } from '../utils/constants';

const searchLocations = async ({ queryKey }: any) => {
  let [, query] = queryKey;

  if (!query) {
    return [];
  }

  const { data } = await axios.get(`${API_URL}/api/location/search/?query=${query}`);
  return data;
};

const LocationSearchBox: FunctionComponent<
  {
    onLocationSelected?: (loc: any) => void;
  } & HTMLAttributes<HTMLElement>
> = ({ onLocationSelected, ...props }) => {
  const [searchText, setSearchText] = useState('');

  const { isLoading, isError, data } = useQuery(['locations', searchText], searchLocations);

  const onSearch = (query: string) => {
    setSearchText(query);
  };

  return (
    <div {...props}>
      <InputGroup {...props}>
        <InputGroup.Text>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8
            /9hAAAAAXNSR0IArs4c6QAAAQ1JREFUOE+d078rhlEYxvHPSwabMluVgfJHGAw2WcQkpchk4FWKjUFJJJQSSdnY/QdKySL
            /gcIiKXTred4eT8+Pek+d5Vx33/u6r3NOQ/nqwHeF/ic1cgW9WEIfvtCFHxzhtgiWBfRjCyt4yBR3o4l3bOYhKSA6XWEar
            yW2V3GHm6yeAiYTy5cVM0eTM0wUAWLGBXzUhLaHZbyldamDU0zVJY51nOA5D9jFGl5qIMeYzzpNHYxgADsVgJ5Ej6BbK3uN
            59jAYwEkHlV038Z9GSA6HOIaF/hMCgeT8YYSwH4ZIM6j0zhG0ZnsJ0T6YzjAIiKzwqdcdxEzeUj+L9QBQv8HaQcQkDkMY7Z
            dQMvpL1evLxHmgIo1AAAAAElFTkSuQmCC"
            alt="Search icon"
          />
        </InputGroup.Text>

        <AsyncTypeahead
          placeholder="Search"
          data-testid="searchLocationBox"
          // @ts-ignore
          labelKey="title"
          filterBy={() => true}
          id="locationBox"
          options={data || []}
          onChange={([loc]) => onLocationSelected?.(loc)}
          minLength={2}
          renderMenuItemChildren={(option: any) => (
            <div key={option.woeid}>
              <span>{option.title}</span>
            </div>
          )}
          onSearch={onSearch}
          isLoading={isLoading}
        />
      </InputGroup>
      {isError && (
        <Alert key="locationSearchError" variant="danger">
          Unexpected error occurs: Cannot connect to server
        </Alert>
      )}
    </div>
  );
};

export default LocationSearchBox;
