import styled from "@emotion/styled";
import React from "react";
import { usePokemonQuery } from "../../generated/graphql";
import Pokemon from "./Pokemon";

const PokemonsWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 1rem 1.25rem;
  overflow: hidden;
  list-style: none;
  margin: auto;

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
`;

interface PokemonsProps {}

const Pokemons = (props: PokemonsProps) => {
  const { data, loading } = usePokemonQuery({ variables: { limit: 250 } });

  if (loading) <div>loading...</div>;

  if (!data) return null;

  return (
    <div>
      <PokemonsWrapper>
        <Title>Pokedex</Title>
        {data.pokemon.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonsWrapper>
    </div>
  );
};

export default Pokemons;
