import { fireEvent, render, screen } from "@testing-library/react";
import React, { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import MyPokemon from "..";
import { MyPokemonContext } from "../../../contexts/my-pokemon.context";
import { myPokemonReducer } from "../../../reducers/my-pokemon.reducer";

const MockMyPokemon = (values: any) => {
  const [pokemons, dispatch] = useReducer(myPokemonReducer, values.pokemons);

  return (
    <BrowserRouter>
      <MyPokemonContext.Provider value={{ state: { pokemons }, dispatch }}>
        <MyPokemon />
      </MyPokemonContext.Provider>
    </BrowserRouter>
  );
};

describe("my pokemon", () => {
  it("should render no pokemon message when pokemon length is 0", () => {
    const values = { pokemons: [] };

    render(<MockMyPokemon {...values} />);

    const el = screen.getByText("You don't have any Pokemon!");

    expect(el).toBeVisible();
  });

  it("should render pokemon list", () => {
    const values = {
      pokemons: [
        {
          id: 1,
          order: 1,
          pokemon_name: "bulbasaur",
          name: "saturdust",
          types: [{ type: "grass" }, { type: "poison" }],
        },
      ],
    };

    render(<MockMyPokemon {...values} />);

    const el = screen.getByText("saturdust");

    expect(el).toBeVisible();
  });

  it("should remove pokemon from list", async () => {
    const values = {
      pokemons: [
        {
          id: 1,
          order: 1,
          pokemon_name: "bulbasaur",
          name: "saturdust",
          types: [{ type: "grass" }, { type: "poison" }],
        },
        {
          id: 2,
          order: 1,
          pokemon_name: "ivysaur",
          name: "celcius",
          types: [{ type: "grass" }, { type: "poison" }],
        },
      ],
    };

    render(<MockMyPokemon {...values} />);

    const el = screen.getByText("saturdust");

    const releaseBtnEl = screen.queryAllByText("Release");

    window.confirm = jest.fn(() => true);
    window.alert = jest.fn(() => true);

    fireEvent.click(releaseBtnEl[0]);

    expect(el).not.toBeInTheDocument();
  });
});
