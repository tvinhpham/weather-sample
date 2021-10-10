import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

describe('Test rendering application', () => {
  it('Show Sanfrancisco forecast', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    render(<App />);
    const { data } = await axios.get('/mock/test');
    expect(data).toBe('Hello');

    //1> Search locations
    const searchBox = screen.getByPlaceholderText('Search');
    expect(searchBox).toBeInTheDocument();
    searchBox.focus();
    userEvent.type(searchBox, 'san');
    expect(await screen.findByText('Searching...')).toBeVisible();
    expect(await screen.findByText('San Francisco')).toBeInTheDocument();
    expect(screen.queryByText('Santorini')).toBeInTheDocument();

    // 2> Select 1st options & load forecast
    userEvent.type(searchBox, '{arrowdown}');
    userEvent.type(searchBox, '{enter}');

    expect(searchBox).toHaveValue('San Francisco');
    //3: Loading
    expect(await screen.findByTestId('loadingForcast')).toBeInTheDocument();

    //4> Loaded > Assertion forecast data.
    const sundayTitle = await screen.findByText('Sunday');
    const sundayCard = sundayTitle.closest<HTMLElement>('div.card');
    expect(sundayCard).not.toBeNull();

    //Veriy min max value
    expect(within(sundayCard!).queryByText(/Min: 13/)).toBeVisible();
    expect(within(sundayCard!).queryByText(/Max: 19/)).toBeVisible();
    expect(getSpy).toHaveBeenCalledTimes(3);
  });
});
