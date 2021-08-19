/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Error from "../../components/Error.component";
import Loading from "../../components/Loading.component";
import { MyPokemonContext } from "../../contexts/my-pokemon.context";
import {
  Order_By,
  PokemonDetailQuery,
  usePokemonDetailQuery,
} from "../../generated/graphql";
import { Types } from "../../reducers/my-pokemon.reducer";
import { getBgColorType } from "../../utils/meta.util";
import { uppercaseFirstLetterEachWord } from "../../utils/transform.util";
import About from "./components/About";
import Evolution from "./components/Evolution";
import Header from "./components/Header";
import Meta from "./components/Meta";

const buttonWave = keyframes`
  0% {
    height: calc(100% + 10px);
    width: calc(100% + 10px);
}`;

const PokemonDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: 100vh;
  color: #000000;
  text-align: center;
  text-transform: capitalize;
  overflow: hidden;
`;

const Button = styled.a`
  padding: 1rem 1.25rem;
  background-color: #000000;
  font-weight: 700;
  border-radius: 1rem;
  cursor: pointer;
`;

const AddButton = styled(Button)`
  order: 2;
  position: relative;
  padding: 0;
  height: 50px;
  width: 50px;
  background-image: linear-gradient(to top, yellow 0%, white 150%);
  font-size: 1.25rem;
  line-height: 50px;

  @media (max-width: 320px) {
    order: 0;
    flex: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    height: calc(100% + 15px);
    width: calc(100% + 15px);
    background-color: #ffffff;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    opacity: 0.25;
    animation: ${buttonWave} 0.75s ease infinite alternate-reverse;
  }
`;

interface PokemonDetailProps {}

const PokemonDetail = (props: PokemonDetailProps) => {
  const params = useParams<{ pokemonName: string }>();
  const { state, dispatch } = useContext(MyPokemonContext);
  const { data, loading, error } = usePokemonDetailQuery({
    variables: {
      PokemonWhere: { name: { _eq: params.pokemonName } },
      PokemonSpeciesOrderBy: { order: Order_By.Asc },
      PokemonsLimit: 1,
      PokemonMovesWhere: { order: { _eq: 1 }, version_group_id: { _eq: 16 } },
    },
  });

  const divMetaRef = useRef<HTMLDivElement>(null);

  const capture = (n: number) => !!n && Math.random() <= n;

  const catchPokemon = async (
    pokemon: PokemonDetailQuery["pokemon"][number]
  ) => {
    // const captured = capture(
    //   (pokemon.specy?.capture_rate as number) / 100
    // );
    const captured = capture(50 / 100);

    if (!captured) {
      return alert(
        `OH NOOO! ${uppercaseFirstLetterEachWord(
          pokemon.name
        )} cannot be caught. Don't be discouraged by it. TRY AGAIN! AND GOOD LUCK!`
      );
    }

    alert(`GOTCHA! ${pokemon.name.toUpperCase()} WAS CAUGHT! 🥳`);

    let name = prompt("Name your pokemon 🥰");

    const isPokemonNameExist = () =>
      state.pokemons.some((x) => x.name.toLowerCase() === name);

    while (isPokemonNameExist()) {
      alert("Pokemon names already exist. try another name!");

      name = prompt("Name your pokemon 🥰");
    }

    if (!name) {
      return alert(
        "Pokemon has been released because you didn't give it a name 🙁"
      );
    }

    alert("Pokemon has been added 😃");

    dispatch({
      type: Types.Catch,
      payload: {
        id: uuidv4(),
        order: pokemon.order as number,
        pokemon_id: pokemon.id,
        pokemon_name: pokemon.name,
        pokemon_img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        name: name,
        types: pokemon.types,
      },
    });
  };

  useEffect(() => {
    if (data) {
      divMetaRef.current?.scrollIntoView();
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  if (!data || data.pokemon.length === 0)
    return <Error title={false} error="Pokemon not found!" />;

  const pokemon = data.pokemon[0];

  const { types, specy } = pokemon;

  const mainType = types[0].type?.name ?? "";

  return (
    <PokemonDetailWrapper
      css={css`
        background-color: ${getBgColorType(mainType)};
      `}
    >
      <Header />
      <div
        css={css`
          flex: 1;
          display: flex;
          overflow-x: auto;
          scroll-snap-type: both mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            width: 0;
            background-color: transparent;
          }

          > div {
            flex-shrink: 0;
            margin: auto;
            height: 75%;
            width: 100%;
            scroll-snap-align: center;
          }
        `}
      >
        <div id="about">
          <About pokemon={pokemon} />
        </div>
        <div id="meta" ref={divMetaRef}>
          <Meta pokemon={pokemon} />
        </div>
        <div id="evolution">
          <Evolution pokemonspecy={specy} />
        </div>
      </div>
      <div
        css={css`
          position: sticky;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.25rem;
          width: 95%;
          max-width: 400px;
        `}
      >
        <Button
          css={css`
            flex: 1;
            order: 1;
            color: #ffffff;
          `}
          href="#about"
        >
          About
        </Button>
        <AddButton
          onClick={() => {
            divMetaRef.current?.scrollIntoView();

            setTimeout(() => {
              catchPokemon(pokemon);
            }, 1000);
          }}
        >
          +
        </AddButton>
        <Button
          css={css`
            flex: 1;
            order: 3;
            color: ${getBgColorType(mainType)};
          `}
          href="#evolution"
        >
          Evolution
        </Button>
      </div>
    </PokemonDetailWrapper>
  );
};

export default PokemonDetail;
