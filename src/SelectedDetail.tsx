import * as React from "react";
import { Country } from "./schemas/Country";
import styled from "styled-components";

interface Props {
  country: Country;
}
const SelectedDetailContainer = styled.div`
  background-color: #5c6370;
  color: whitesmoke;
  min-height: 50px;
`;

const Card = styled.div`
  background-color: #61aeee;
  color: #282c34
  "&.title" {
    background: black
  }
`;

const SelectedDetail = (props: Props) => {
  return (
    <SelectedDetailContainer>
      <Card>
        <div className="title">Population</div>
        {props.country.population}
      </Card>

    </SelectedDetailContainer>
  );
};

export default SelectedDetail;
