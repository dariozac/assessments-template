import * as React from "react";
import { Country } from "./schemas/Country";

interface Props {
  removedCountries: Country[];
  setRemovedCountries: (country: Country[]) => void;
}

export default function RemovedCounties({
  removedCountries,
  setRemovedCountries
}: Props) {
  const display = () => {
    return removedCountries.length > 0
      ? removedCountries.map((country) => {
          return (
            <p key={country.alpha3Code + country.name}>
              {country.name}
              <img
                onClick={() =>
                  setRemovedCountries([
                    ...removedCountries.filter(
                      (removedCountry) =>
                        removedCountry.alpha3Code !== country.alpha3Code
                    )
                  ])
                }
                width="35px"
                style={{ border: "0.5px solid grey" }}
                alt={`Flag of ${country.name}`}
                src={country.flag}
              />
            </p>
          );
        })
      : "no countries set";
  };
  return (
    <div style={{ border: "2px red solid" }}>
      <h4>Excluded countries</h4>
      {display()}
    </div>
  );
}
