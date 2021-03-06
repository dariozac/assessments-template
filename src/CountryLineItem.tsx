import * as React from 'react';
//import styled from "styled-components";
import { Country } from "./schemas/Country";
import SelectedDetail from "./SelectedDetail"

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
      style={{ padding: 5 }}
      onClick={!isSelected ? () => setSelectedCountry(country) : () => setSelectedCountry(undefined)}
      key={country.alpha3Code}
    >
      { isSelected ? <span>&#9661;</span> : <span>&#9655;</span>}
      <span style={{ padding: 5 }}>{country.alpha3Code}</span>
      <span style={{ paddingRight: 5 }}><img
        onClick={() =>
          setRemovedCountries([...removedCountries, country])
        }
        width="15px"
        style={{ border: "0.5px solid grey" }}
        alt={`Flag of ${country.name}`}
        src={country.flag}
      /></span>
      {country.name}
      <div>Remove X</div>
      {isSelected && <SelectedDetail country={country} />}
    </div>);
};


export default CountryLineItem;



