import { PokemonDetailQuery } from "../generated/graphql";

type ActionMap<M extends { [index: string]: any }> = {
  [K in keyof M]: M[K] extends undefined
    ? {
        type: K;
      }
    : {
        type: K;
        payload: M[K];
      };
};

export enum Types {
  Catch = "CATCH_POKEMON",
  Release = "RELEASE_POKEMON",
}

export type MyPokemonType = {
  id: string;
  order: number;
  pokemon_id: number;
  pokemon_name: string;
  pokemon_img: string;
  name: string;
  types: PokemonDetailQuery["pokemon"][number]["types"];
};

type MyPokemonPayload = {
  [Types.Catch]: {
    id: string;
    order: number;
    pokemon_id: number;
    pokemon_name: string;
    pokemon_img: string;
    name: string;
    types: PokemonDetailQuery["pokemon"][number]["types"];
  };
  [Types.Release]: {
    id: string;
  };
};

export type MyPokemonActions =
  ActionMap<MyPokemonPayload>[keyof ActionMap<MyPokemonPayload>];

export const myPokemonReducer = (
  state: MyPokemonType[],
  action: MyPokemonActions
) => {
  switch (action.type) {
    case Types.Catch:
      const catchState = [...state, action.payload];

      localStorage.setItem("pokemons", JSON.stringify(catchState));

      return catchState;
    case Types.Release:
      const releaseState = [
        ...state.filter((pokemon: any) => pokemon.id !== action.payload.id),
      ];

      localStorage.setItem("pokemons", JSON.stringify(releaseState));

      return releaseState;
    default:
      return state;
  }
};
