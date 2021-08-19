import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import MyPokemon from "..";
import { MyPokemonContext } from "../../../contexts/my-pokemon.context";

const mockedDispatch = jest.fn();

const MockMyPokemon = (values: any) => {
  return (
    <BrowserRouter>
      <MyPokemonContext.Provider
        value={{ state: values.state, dispatch: mockedDispatch }}
      >
        <MyPokemon />
      </MyPokemonContext.Provider>
    </BrowserRouter>
  );
};

describe("my pokemon", () => {
  it("should render no pokemon message when pokemon length is 0", () => {
    const values = { state: { pokemons: [] } };

    render(<MockMyPokemon {...values} />);

    const el = screen.getByText("You don't have any Pokemon!");

    expect(el).toBeVisible();
  });

  it("should render pokemon list", () => {
    const values = {
      state: {
        pokemons: [
          {
            id: 1,
            order: 1,
            pokemon_name: "bulbasaur",
            name: "saturdust",
            types: [{ type: "grass" }, { type: "poison" }],
          },
        ],
      },
    };

    render(<MockMyPokemon {...values} />);

    const el = screen.getByText("saturdust");

    expect(el).toBeVisible();
  });
});
