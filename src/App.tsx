import * as React from "react";
import axios from "axios";
import RemovedCountries from "./RemovedCountries";
import { Country } from "./Country";
import SelectedDetail from "./SelectedDetail";
import CountryLineItem from "./CountryLineItem";
import styled from "styled-components";

type CountryFilter = string | undefined;

const AppContainer = styled.div`
  border: 5px solid red;
`;
export default function App() {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [countryFilter, setCountryFilter] = React.useState<CountryFilter>("");
  const [removedCountries, setRemovedCountries] = React.useState<Country[]>([]);
  const [sort, setSort] = React.useState<{ col: string; dir: string }>({
    col: "population",
    dir: "DESC"
  });
  const [selectedCountry, setSelectedCountry] = React.useState<
    Country | undefined
  >(undefined);
  function customSort(a: Country, b: Country) {
    return b[sort.col] - a[sort.col];
  }
  const customFilter = (country: Country) => {
    return (
      countryFilter !== undefined &&
      (country.name.toLocaleLowerCase().includes(countryFilter.trim()) ||
        country.alpha3Code.toLocaleLowerCase().includes(countryFilter.trim()))
    );
  };
  React.useEffect(() => {
    async function fetchData() {
      const result = await axios("https://restcountries.eu/rest/v2/all");
      setCountries(result.data);
    }
    fetchData();
  }, []);

  const display = () => {
    return countries.length > 1
      ? countries
          .filter(
            (country: Country) => removedCountries.includes(country) === false
          )
          .filter(customFilter)
          .sort(customSort)
          .map((country) => {
            const isSelected =
              country.alpha3Code === selectedCountry?.alpha3Code;
            return (
              <CountryLineItem
                country={country}
                onClick={() => setSelectedCountry(country)}
                key={country.alpha3Code}
                style={{ backgroundColor: isSelected ? "darkgrey" : null }}
              >
                {country.alpha3Code}
                <img
                  onClick={() =>
                    setRemovedCountries([...removedCountries, country])
                  }
                  width="35px"
                  style={{ border: "0.5px solid grey" }}
                  alt={`Flag of ${country.name}`}
                  src={country.flag}
                />
                {country.name}
                {isSelected && <SelectedDetail country={country} />}
              </CountryLineItem>
            );
          })
      : "no countries set";
  };

  return (
    <AppContainer>
      <h1>Hello CodeSandbox</h1>
      <h2>{selectedCountry?.name}</h2>
      <RemovedCountries
        removedCountries={removedCountries}
        setRemovedCountries={setRemovedCountries}
      />
      <p>{countryFilter}</p>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCountryFilter(e.target.value.toLocaleLowerCase())
        }
      />
      <div>
        <button onClick={() => setSort({ col: "population", dir: "ASC" })}>
          Population Sort
        </button>
      </div>
      <ul>{display()}</ul>
    </AppContainer>
  );
}

