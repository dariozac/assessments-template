// import data from './data/countries.json';
import React from 'react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';



test('loads and displays countries list', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Country Intelligence');
});