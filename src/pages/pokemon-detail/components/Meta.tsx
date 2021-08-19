import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import PokemonImg from "../../../components/PokemonImg.component";
import { PokemonDetailQuery } from "../../../generated/graphql";
import { renderEmojiType } from "../../../utils/meta.util";
import Pokeball from "../../../assets/images/pokeball-color.png";

const throwBall = keyframes`
  0% {
    top: 150%;
    left: 20%;
    transform: scale(0.5)
  }
  35% {
    top: 40%;
    left: 41%;
    transform: scale(1.2)
  }
  40% {
    top: 37%;
    left: 42%;
    transform: scale(1.3)
  }
  42.5% {
    top: 38.5%;
    left: 42.5%;
    transform: scale(1.3)
  }
  85% {
    top: 38.5%;
    left: 42.5%;
    transform: scale(1.3)
  }
  100% {
    opacity: 1;
    top: 50%;
    left: 47.2%;
    transform: scale(1)
  }
`;

const wiggle = keyframes`
  0% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(-15deg);
  }
  20% {
    transform: rotate(15deg);
  }
  30% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(0);
  }
`;

const pokemonDisappear = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0
  }
`;

const PokemonMetaWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Name = styled.h2`
  margin: 2rem 0 0;
  font-size: 3.75rem;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const PokemonTypes = styled.div`
  display: flex;
  width: 300px;
`;

const PokemonType = styled.span`
  flex: 1;
`;

const PokemonImgWrapper = styled.div<{ throwing: boolean }>`
  position: relative;
  margin-top: 1.5rem;
  ${(props) =>
    props.throwing &&
    css`
      animation: ${pokemonDisappear} 0.5s 1;
      animation-delay: 1s;
      animation-fill-mode: forwards;
    `}

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    display: block;
    height: 30px;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2.5rem;
  width: 35%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    gap: 0.25rem;

    > span {
      font-weight: 700;
    }
  }
`;

const PokeballImgWrapper = styled.div<{ throwing: boolean }>`
  position: absolute;
  opacity: 0;
  width: 5%;
  ${(props) =>
    props.throwing &&
    css`
      animation: ${throwBall} 2s 1, ${wiggle} 1s 3 2s;
      animation-fill-mode: forwards;
    `}
`;

interface MetaProps {
  throwing: boolean;
  pokemon: PokemonDetailQuery["pokemon"][number];
}

const Meta = ({ throwing, pokemon }: MetaProps) => {
  const { types } = pokemon;

  return (
    <PokemonMetaWrapper>
      <Name>{pokemon.name}</Name>
      <PokemonTypes>
        {types.map((type) => (
          <PokemonType key={type.type?.id}>
            {renderEmojiType(type.type?.name ?? "")}
          </PokemonType>
        ))}
      </PokemonTypes>
      <PokemonImgWrapper throwing={throwing}>
        <PokemonImg pokemonId={pokemon.id} height="200px" />
      </PokemonImgWrapper>
      <Details>
        <Detail>
          <div>
            <span>{`${(pokemon.weight as number) / 10} kg`}</span>/
            <span>{`${(((pokemon.weight as number) / 10) * 2.2).toFixed(
              2
            )} lbs`}</span>
          </div>
          <span>WEIGHT</span>
        </Detail>
        <Detail>
          <div>
            <span>{`${(pokemon.height as number) / 10} m`}</span>/
            <span>{`${(((pokemon.height as number) / 10) * 3.28).toFixed(
              2
            )} ft`}</span>
          </div>
          <span>HEIGHT</span>
        </Detail>
      </Details>
      <PokeballImgWrapper throwing={throwing}>
        <img src={Pokeball} alt="" width="100%" />
      </PokeballImgWrapper>
    </PokemonMetaWrapper>
  );
};

export default Meta;
