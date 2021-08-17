import styled from "@emotion/styled";
import React from "react";
import { usePokemonQuery } from "../../generated/graphql";
import Pokemon from "./Pokemon";

const PokemonsWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2.5rem;
  padding: 1rem;
  overflow: hidden;
  list-style: none;

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

interface PokemonsProps {}

const Pokemons = (props: PokemonsProps) => {
  const { data, loading } = usePokemonQuery({ variables: { limit: 125 } });

  if (loading) <div>loading...</div>;

  if (!data) return null;

  return (
    <PokemonsWrapper>
      {data.pokemon.map((pokemon) => (
        <Pokemon key={pokemon.id} pokemon={pokemon} />
      ))}
    </PokemonsWrapper>
  );
};

export default Pokemons;
