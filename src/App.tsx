import React from "react";
import { Route, Switch } from "react-router-dom";
import Pokemons from "./pages/pokemon-list";

function App() {
  return (
    <Switch>
      <Route path="/" component={Pokemons} />
    </Switch>
  );
}

export default App;
