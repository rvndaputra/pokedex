/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import Pokeball from "../../assets/images/pokeball-color.png";
import NavigationBar from "../../components/NavigationBar.component";
import { usePokemonQuery } from "../../generated/graphql";
import Pokemon from "./Pokemon";

export const PokemonsWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 2rem 1.25rem;
  padding-bottom: 3.75rem;
  list-style: none;

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

interface PokemonsProps {}

const Pokemons = (props: PokemonsProps) => {
  const { data, loading } = usePokemonQuery({ variables: { limit: 250 } });

  if (loading) <div>loading...</div>;

  if (!data) return null;

  return (
    <>
      <PokemonsWrapper>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.5rem;
          `}
        >
          <h1
            css={css`
              font-size: 2.25rem;
            `}
          >
            Pokedex
          </h1>
          <Link to="/mypokemon">
            <img src={Pokeball} alt="" height="40px" />
          </Link>
        </div>
        {data.pokemon.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonsWrapper>
      <NavigationBar />
    </>
  );
};

export default Pokemons;
