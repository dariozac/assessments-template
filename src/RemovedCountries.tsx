import * as React from 'react';
import { Country } from './schemas/Country';

interface Props {
  removedCountries: Country[];
  setRemovedCountries: (country: Country[]) => void;
  setSelectedCountry: (country: Country | undefined) => void
}

export default function RemovedCounties({ removedCountries, setRemovedCountries, setSelectedCountry }: Props) {
  const display = () => {
    return removedCountries.length > 0
      ? removedCountries.map(country => {
          return (
            <img
              key={country.alpha3Code + country.name}
              onClick={() => {
                setRemovedCountries([
                  ...removedCountries.filter(removedCountry => removedCountry.alpha3Code !== country.alpha3Code)
                ]);
                setSelectedCountry(undefined);
              }}
              width="15px"
              style={{ border: '0.5px solid grey' }}
              alt={`Flag of ${country.name}`}
              src={country.flag}
              title={`${country.name} click to return to list`}
            />
          );
        })
      : 'no countries set';
  };
  return (
    <div>
      {removedCountries.length > 0 && <div>Removed Countries ({`${removedCountries.length}`})</div>}
      {removedCountries.length > 0 && display()}
    </div>
  );
}

