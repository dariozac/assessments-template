import * as React from 'react';
import axios from 'axios';
import RemovedCountries from './RemovedCountries';
import { Country } from './schemas/Country';
import CountryLineItem from './CountryLineItem';
import styled from 'styled-components';

type CountryFilter = string | undefined;

const AppContainer = styled.div`
  border: 5px solid #56b6c2;
  color: #abb2bf;
  background: #282c34;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 14px;
  padding: 25px;
  height: 100vh;
`;

const SearchFilterBox = styled.input`
  border: 1px solid #56b6c2;
  background-color: #abb2bf;
  font-size: 1em;
  text-align: center;
  padding:10px;
  margin: 5px;
`;

const SortButton = styled.button`
  border: 1px solid #56b6c2;
  background-color: #abb2bf;
  color: #282c34;
  padding:10px;
  margin: 5px;
`;

export default function App() {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [countryFilter, setCountryFilter] = React.useState<CountryFilter>('');
  const [removedCountries, setRemovedCountries] = React.useState<Country[]>([]);
  const [sort, setSort] = React.useState<{ col: string; dir: string }>({
    col: 'population',
    dir: 'DESC'
  });

  const [selectedCountry, setSelectedCountry] = React.useState<Country | undefined>(undefined);

  const customSort = (a: Country, b: Country): number => {
    if (sort.dir === 'DESC') {
      return b.population - a.population;
    }
    if (sort.dir === 'ASC') {
      return a.population - b.population;
    }
    return 0;
  };

  const customFilter = (country: Country) => {
    return (
      countryFilter !== undefined &&
      (country.name.toLocaleLowerCase().includes(countryFilter.trim()) ||
        country.alpha2Code.toLocaleLowerCase().includes(countryFilter.trim()) ||
        country.alpha3Code.toLocaleLowerCase().includes(countryFilter.trim()))
    );
  };

  React.useEffect(() => {
    async function fetchData() {
      const result = await axios('https://restcountries.eu/rest/v2/all');
      setCountries(result.data);
    }
    fetchData();
  }, []);

  const display = () => {
    const removedCountriesFilter = (country: Country) => removedCountries.includes(country) === false;
    return countries.length > 1
      ? countries
          .filter(removedCountriesFilter)
          .filter(customFilter)
          .sort(customSort)
          .map((country, index) => {
            const isSelected = country.alpha3Code === selectedCountry?.alpha3Code;
            return (
              <CountryLineItem
                isSelected={isSelected}
                country={country}
                setSelectedCountry={setSelectedCountry}
                removedCountries={removedCountries}
                setRemovedCountries={setRemovedCountries}
                key={index}
              />
            );
          })
      : 'no countries set';
  };

  return (
    <AppContainer>
      <h1>Country Reference</h1>
      {/* <small>
        {selectedCountry ? `- ${selectedCountry.name}, (Pop. ${selectedCountry.population.toLocaleString()})` : null}
      </small> */}
      <RemovedCountries removedCountries={removedCountries} setRemovedCountries={setRemovedCountries} />
      <p>{countryFilter && `List filtered by: ${countryFilter}`}</p>
      <SearchFilterBox
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountryFilter(e.target.value.toLocaleLowerCase())}
        placeholder="filter list"
      />
      <div>
        <SortButton
          onClick={() => setSort({ ...sort, dir: `${sort.dir === 'ASC' ? 'DESC' : 'ASC'}` })}
          title={`click for ${sort.dir === 'ASC' ? 'DESC' : 'ASC'}`}
        >
          {` Sorted by Population ${sort.dir}`}
        </SortButton>
      </div>
      <ul>{display()}</ul>
    </AppContainer>
  );
}
