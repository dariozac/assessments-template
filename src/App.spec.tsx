// import data from './data/countries.json';
import React from 'react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import countries from './data/countries.json';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /countries" requests
  rest.get('https://restcountries.eu/rest/v2/all', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json(countries));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays title and sort button', async () => {
  render(<App />);

  //const countryLineItems = screen.getAllByRole('ul');
  //expect(countryLineItems).toHaveLength(1);

  const countryLineItems = await screen.findAllByTestId('countryLineItem');

  expect(countryLineItems).toHaveLength(16);

  // the test file contains only coutries beginning with "A"

  // expect the largest population to be ARGENTINA
  expect(countryLineItems[0]).toHaveTextContent('ARG');

  expect(screen.getByRole('heading')).toHaveTextContent('Country Intelligence');
  expect(screen.getByRole('button')).toHaveTextContent('Population Sort');

  fireEvent.click(screen.getByRole('button'));

  const countryLineItemsSortedByPopulationASC = await screen.findAllByTestId('countryLineItem');
 // expect the smallest population to be ANTARCTICA
  expect(countryLineItemsSortedByPopulationASC[0]).toHaveTextContent('ATA'); 
  
  




});

// test('handles server error', async () => {
//   server.use(
//     rest.get('https://restcountries.eu/rest/v2/all', (req, res, ctx) => {
//       return res(ctx.status(500))
//     })
//   )

//   act(() => {
//     render(<App />)
//   });

//   //fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByText('no countries'))

// })
