import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Pokeball from "../../assets/images/pokeball.png";
import PokemonImg from "../../components/PokemonImg.component";
import { MyPokemonContext } from "../../contexts/my-pokemon.context";
import { PokemonFragment } from "../../generated/graphql";
import { getBgColorType, renderEmojiType } from "../../utils/meta.util";

export const PokemonWrapper = styled.li<{ color: string }>`
  flex: 1;
  position: relative;
  box-shadow: 0 0 175px 5px ${(props) => props.color};
  border-radius: 15px;

  > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 125px;
  }
`;

export const Number = styled.span`
  margin: 1rem 1.25rem 0;
  color: #000000;
  font-weight: 700;
`;

export const Name = styled.h3`
  flex: 1;
  margin: 0.25rem 1.25rem;
  color: #ffffff;
  font-size: 1.5rem;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  text-transform: capitalize;
`;

const Owned = styled.span`
  margin: 0.5rem 1.25rem;
`;

export const PokemonTypes = styled.div`
  display: flex;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
`;

export const PokemonType = styled.span<{ color: string }>`
  flex: 1;
  padding: 0.125rem 1.25rem;
  background-color: ${(props) => props.color};
  text-align: center;
`;

export const StyledPokemonImg = styled(PokemonImg)`
  position: absolute;
  right: 5px;
  bottom: 25px;
  height: 125px;
  z-index: 2;
`;

export const PokeballImgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
`;

export const PokeballImg = styled.img`
  position: absolute;
  right: -100px;
  bottom: -25px;
  height: 200px;
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
  const { state } = useContext(MyPokemonContext);
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
        <Name>{pokemon.name}</Name>
        <Owned>{`Owned: ${
          state.pokemons.filter((x) => x.pokemon_id === pokemon.id).length
        }`}</Owned>
        <PokemonTypes>
          {types.map((type) => (
            <PokemonType
              key={type.type?.id}
              className={type.type?.name}
              color={getBgColorType(type.type?.name ?? "")}
            >
              {renderEmojiType(type.type?.name ?? "")}
            </PokemonType>
          ))}
        </PokemonTypes>
      </Link>
    </PokemonWrapper>
  );
};

export default Pokemon;
