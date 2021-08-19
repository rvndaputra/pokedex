import React, { createContext, useReducer } from "react";
import {
  MyPokemonActions,
  myPokemonReducer,
  MyPokemonType,
} from "../reducers/my-pokemon.reducer";

type InitialStateType = {
  pokemons: MyPokemonType[];
};

const initialState: InitialStateType = {
  pokemons: JSON.parse(localStorage.getItem("pokemons") ?? "[]"),
};

const mainReducer = (
  { pokemons }: InitialStateType,
  action: MyPokemonActions
) => ({
  pokemons: myPokemonReducer(pokemons, action),
});

export const MyPokemonContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<MyPokemonActions>;
}>({ state: initialState, dispatch: () => null });

export const MyPokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MyPokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </MyPokemonContext.Provider>
  );
};
