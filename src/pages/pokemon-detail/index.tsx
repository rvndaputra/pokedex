/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Order_By, usePokemonDetailQuery } from "../../generated/graphql";
import { getBgColorType } from "../../utils/meta.util";
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
  color: #000;
  box-sizing: border-box;
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
  background-image: linear-gradient(to top, yellow 0%, white 150%);
  padding: 0;
  height: 50px;
  width: 50px;
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

  const { data, loading, error } = usePokemonDetailQuery({
    variables: {
      PokemonWhere: { name: { _eq: params.pokemonName } },
      PokemonSpeciesOrderBy: { order: Order_By.Asc },
      PokemonsLimit: 1,
      // PokemonMovesOrderBy: { level: Order_By.Asc },
      PokemonMovesWhere: { order: { _eq: 1 }, version_group_id: { _eq: 16 } },
    },
  });
  const divMetaRef = useRef<HTMLDivElement>(null);
  const capture = (n: number) => {
    return !!n && Math.random() <= n;
  };

  useEffect(() => {
    if (data) {
      divMetaRef.current?.scrollIntoView();
    }
  }, [data]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  if (!data) return null;

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
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;

          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            width: 0;
            background-color: transparent;
          }

          > div {
            flex-shrink: 0;
            height: 75%;
            margin: auto;
            width: 100%;
            scroll-snap-align: start;
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
          href="#meta"
          onClick={() => {
            const captured = capture(50 / 100);
          }}
        >
          +
        </AddButton>
        <Button
          css={css`
            flex: 1;
            order: 3;
            color: var(--${pokemon.types[0].type?.name});
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
