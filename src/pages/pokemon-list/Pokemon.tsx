import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { PokemonFragment } from "../../generated/graphql";
import { uppercaseFirstLetterEachWord } from "../../utils/transform.util";

interface PokemonProps {
  pokemon: PokemonFragment;
}

const pokemonEffect = keyframes`
  0% {
    right: -25px;
    transform: scale(0.975);
  }
}`;

const PokemonWrapper = styled.li<{ color: string }>`
  position: relative;
  box-shadow: 0 0 200px 5px ${(props) => props.color};

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 125px;

    &:hover {
      img {
        transform: scale(1.25);
      }
    }
  }
`;

const Number = styled.span`
  margin: 1rem 1.25rem 0.25rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Name = styled.h3`
  flex: 1;
  margin: 0.25rem 1.25rem;
  color: #ffffff;
  font-size: 1.5rem;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const Owned = styled.span`
  margin: 0.5rem 1.25rem;
`;

const Types = styled.div`
  display: flex;
`;

const Type = styled.span`
  flex: 1;
  padding: 0.125rem 1.25rem;
  text-align: center;
`;

const PokemonImg = styled.img`
  position: absolute;
  right: -15px;
  bottom: 25px;
  height: 100px;
  padding: 1.25rem;
  text-align: center;
  animation: ${pokemonEffect} 1.5s ease infinite alternate-reverse;
  transition: transform 2s;

  @media (max-width: 576px) {
    right: -15px;
    bottom: 5px;
    height: 125px;
  }
`;

const pokemonTypes: Record<any, { bg: string; emoji: string }> = {
  normal: { bg: "#ffffff", emoji: "" },
  fighting: { bg: "#e9573f", emoji: "🥊" },
  flying: { bg: "#4fc1e9", emoji: "🌪" },
  poison: { bg: "#967adc", emoji: "☣️" },
  ground: { bg: "#f6bb42", emoji: "⛰️" },
  rock: { bg: "#fc6e51", emoji: "🪨" },
  bug: { bg: "#37bc9b", emoji: "🐞" },
  ghost: { bg: "#ac92ec", emoji: "👻" },
  steel: { bg: "#aab2bd", emoji: "🤖" },
  fire: { bg: "#da4453", emoji: "🔥" },
  water: { bg: "#3bafda", emoji: "💦" },
  grass: { bg: "#a0d468", emoji: "🌿" },
  electric: { bg: "#ffce54", emoji: "⚡️" },
  psychic: { bg: "#d770ad", emoji: "🔮" },
  ice: { bg: "#4fc1e9", emoji: "❄️" },
  dragon: { bg: "#4a89dc", emoji: "🐉" },
  dark: { bg: "#aaaaaa", emoji: "🖤" },
  fairy: { bg: "#ec87c0", emoji: "🧚" },
  unknown: { bg: "brown", emoji: "🃏" },
  shadow: { bg: "brown", emoji: "🕷️" },
};

const Pokemon = ({ pokemon }: PokemonProps) => {
  const validPokemonType = (type: string) => pokemonTypes[type];

  const renderEmojiType = (type: string) =>
    validPokemonType(type) ? `${pokemonTypes[type].emoji} ${type}` : type;

  const { pokemontypes } = pokemon;

  const mainType = pokemontypes[0].type?.name ?? "";

  return (
    <PokemonWrapper
      className={mainType}
      color={validPokemonType(mainType) ? pokemonTypes[mainType].bg : "#ffffff"}
    >
      <Link to={`/pokedex/${pokemon.name}`}>
        <PokemonImg
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt=""
        />
        <Number>{`#${pokemon.order}`}</Number>
        <Name>{uppercaseFirstLetterEachWord(pokemon.name)}</Name>
        <Owned>Owned: 0</Owned>
        <Types>
          {pokemontypes.map((pokemontype) => (
            <Type
              key={pokemontype.type?.name}
              className={pokemontype.type?.name}
              style={{
                backgroundColor: `var(--${pokemontype.type?.name})`,
              }}
            >
              {renderEmojiType(pokemontype.type?.name ?? "")}
            </Type>
          ))}
        </Types>
      </Link>
    </PokemonWrapper>
  );
};

export default Pokemon;
