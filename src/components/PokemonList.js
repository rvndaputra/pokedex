import React, { Component } from "react";
import Pokemon from "./Pokemon";

import "../styles/PokemonList.css";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const POKEMON_QUERY = gql`
  {
    pokemons(first: 151) {
      id
      name
      types
      image
    }
  }
`;

class PokemonList extends Component {
  render() {
    return (
      <Query query={POKEMON_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const pokemonsToRender = data.pokemons;

          return (
            <div>
              <div className="uk-grid uk-width-auto uk-grid-divider uk-flex-center">
                {pokemonsToRender.map(pokemon => (
                  <Pokemon
                    key={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                  />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PokemonList;
