import React from "react";
import { Route, Switch } from "react-router-dom";
import PokemonDetail from "./pages/pokemon-detail";
import Pokemons from "./pages/pokemon-list";

function App() {
  return (
    <Switch>
      <Route path="/:pokemonName" component={PokemonDetail} />
      <Route path="/" component={Pokemons} />
    </Switch>
  );
}

export default App;
