import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading.component";

const Pokemons = React.lazy(() => import("./pages/pokemon-list"));
const PokemonDetail = React.lazy(() => import("./pages/pokemon-detail"));
const MyPokemon = React.lazy(() => import("./pages/my-pokemon"));

function App() {
  return (
    <Switch>
      <Suspense fallback={<Loading />}>
        <Route path="/mypokemon" component={MyPokemon} />
        <Route path="/:pokemonName" component={PokemonDetail} />
        <Route path="/" component={Pokemons} />
      </Suspense>
    </Switch>
  );
}

export default App;
