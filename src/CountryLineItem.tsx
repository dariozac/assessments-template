import * as React from 'react';
//import styled from "styled-components";
import { Country } from './schemas/Country';
import SelectedDetail from './SelectedDetail';

interface Props {
  country: Country;
  setSelectedCountry: (country: Country | undefined) => void;
  isSelected: boolean;
  removedCountries: Country[];
  setRemovedCountries: (country: Country[]) => void;
}

const CountryLineItem = ({ country, setSelectedCountry, isSelected, removedCountries, setRemovedCountries }: Props) => {
  return (
    <div
      style={{ padding: 5, backgroundColor: `${isSelected ? '#abb2bf' : '#282c34'}`, color: `${isSelected ? '#282c34' :'#abb2bf'}`}}
      key={country.alpha3Code}
      data-testid={'countryLineItem'}
      onClick={!isSelected ? () => setSelectedCountry(country) : () => setSelectedCountry(undefined)}
    >
      {isSelected ? (
        <span>
          &#9661;
        </span>
      ) : (
        <span onClick={!isSelected ? () => setSelectedCountry(country) : () => setSelectedCountry(undefined)}>
          &#9655;
        </span>
      )}
      <span style={{ padding: 5 }}>{country.alpha3Code}</span>
      <span style={{ paddingRight: 5 }}>
        <img width="15px" style={{ border: '0.5px solid grey' }} alt={`Flag of ${country.name}`} src={country.flag} />
      </span>
      {country.name}
      <span title="remove country" style={{padding: 5, color: 'red', cursor: 'pointer'}} onClick={() => setRemovedCountries([...removedCountries, country])}>X</span>
      {isSelected && <SelectedDetail country={country} />}
    </div>
  );
};

export default CountryLineItem;
