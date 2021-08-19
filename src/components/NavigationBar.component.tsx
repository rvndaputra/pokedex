import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const NavigationBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  height: 5vh;
  width: 100%;
  background-color: #000000;
  line-height: 5vh;
  font-size: 1.25rem;
  z-index: 99;
`;

interface NavigationBarProps {}

const NavigationBar = (props: NavigationBarProps) => {
  return (
    <NavigationBarWrapper>
      <Link to="/">Pokedex</Link>
      <Link to="/mypokemon">My Pokemon</Link>
    </NavigationBarWrapper>
  );
};

export default NavigationBar;
