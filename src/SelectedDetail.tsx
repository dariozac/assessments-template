import * as React from "react";
import { Country } from "./schemas/Country";
import styled from "styled-components";

interface Props {
  country: Country;
}
const SelectedDetailContainer = styled.div`
  background-color: #abb2bf;
  color: whitesmoke;
  min-height: 50px;
  display:flex;
  flex-direction:row;
`;

const Card = styled.div`
  color: #abb2bf;
  background-color: #282c34
  padding: 5px;
  margin: 5px;
  border:  #abb2bf 1px solid;
`;

const CardTitle = styled.div`
  background-color: #abb2bf;
  color: #282c34;
  text-weight: bold;
`;

const CardBody = styled.div`
  background-color: #abb2bf;
  color: #282c34
`;

const SelectedDetail = (props: Props) => {
  return (
    <SelectedDetailContainer>
      <Card>
      <CardTitle>Population</CardTitle>
      <CardBody>{props.country.population.toLocaleString()}</CardBody>
      </Card>
      <Card>
        <CardTitle>Capital City</CardTitle>
        <CardBody>{props.country.capital}</CardBody>
      </Card>
      <Card>
      <CardTitle>Currencies</CardTitle>
       <CardBody>
       {props.country.currencies.map((currency, i) => {
          return <div style={{listStyle: 'none'}} key={i}>
            {currency.code} {currency.symbol} {currency.name}
            </div>
        })}
       </CardBody>
      </Card>
    </SelectedDetailContainer>
  );
};

export default SelectedDetail;
