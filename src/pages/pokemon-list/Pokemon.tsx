import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import Pokeball from "../../assets/images/pokeball.png";
import PokemonImg from "../../components/PokemonImg";
import { PokemonFragment } from "../../generated/graphql";
import { getBgColorType, renderEmojiType } from "../../utils/meta.util";
import { uppercaseFirstLetterEachWord } from "../../utils/transform.util";

const PokemonWrapper = styled.li<{ color: string }>`
  position: relative;
  box-shadow: 0 0 200px 5px ${(props) => props.color};
  border-radius: 15px;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 125px;
  }
`;

const Number = styled.span`
  margin: 1rem 1.25rem 0;
  color: #000000;
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
  border-radius: 0 0 15px 15px;
  overflow: hidden;
`;

const Type = styled.span`
  flex: 1;
  padding: 0.125rem 1.25rem;
  text-align: center;
`;

const StyledPokemonImg = styled(PokemonImg)`
  position: absolute;
  right: 5px;
  bottom: 25px;
  height: 125px;
  transition: transform 2s;
  z-index: 2;
`;

const PokeballImgWrapper = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  width: 50%;
  border-radius: 15px;
  overflow: hidden;
`;

const PokeballImg = styled.img`
  position: absolute;
  right: -100px;
  bottom: -25px;
  height: 200px;
  transition: transform 2s;
  filter: invert(100%);
  mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.75) 0%,
    transparent 75%
  );
`;

interface PokemonProps {
  pokemon: PokemonFragment;
}

const Pokemon = ({ pokemon }: PokemonProps) => {
  const { types } = pokemon;

  const mainType = types[0].type?.name ?? "";

  return (
    <PokemonWrapper className={mainType} color={getBgColorType(mainType)}>
      <Link to={`/${pokemon.name}#meta`}>
        <StyledPokemonImg pokemonId={pokemon.id} alt="" />
        <PokeballImgWrapper>
          <PokeballImg src={Pokeball} alt="" />
        </PokeballImgWrapper>
        <Number>{`#${pokemon.order}`}</Number>
        <Name>{uppercaseFirstLetterEachWord(pokemon.name)}</Name>
        <Owned>Owned: 0</Owned>
        <Types>
          {types.map((pokemontype) => (
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
