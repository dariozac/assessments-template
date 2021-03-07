// import data from './data/countries.json';
import React from 'react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';


const server = setupServer(
  rest.get('https://restcountries.eu/rest/v2/all', (req: any, res: any, ctx: any) => {
    return res(ctx.json({}))
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



test('loads and displays countries list', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent('Country Intelligence');
});