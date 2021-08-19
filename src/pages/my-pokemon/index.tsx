/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Pokeball from "../../assets/images/pokeball.png";
import NavigationBar from "../../components/NavigationBar.component";
import { MyPokemonContext } from "../../contexts/my-pokemon.context";
import { Types } from "../../reducers/my-pokemon.reducer";
import { getBgColorType, renderEmojiType } from "../../utils/meta.util";
import { PokemonsWrapper } from "../pokemon-list";
import {
  Name,
  Number,
  PokeballImg,
  PokeballImgWrapper,
  PokemonType,
  PokemonTypes,
  PokemonWrapper,
  StyledPokemonImg,
} from "../pokemon-list/Pokemon";

const ReleaseButton = styled.div`
  padding: 0.75rem;
  background-color: #000000;
  color: #ffffff;
  border-radius: 15px;
  text-align: center;
  text-orientation: mixed;
  writing-mode: vertical-rl;
  z-index: 99;
  cursor: pointer;
`;

interface MyPokemonProps {}

const MyPokemon = (props: MyPokemonProps) => {
  const { state, dispatch } = useContext(MyPokemonContext);

  const releasePokemon = (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("Are you sure want to release your Pokemon?");

    if (confirmed) {
      alert("Pokemon has been released...");

      dispatch({ type: Types.Release, payload: { id } });
    }
  };

  return (
    <div>
      {state.pokemons.length === 0 && <div>You don't have any Pokemon</div>}
      <PokemonsWrapper>
        {state.pokemons.map((pokemon) => {
          const { types } = pokemon;

          const mainType = types[0].type?.name ?? "";

          return (
            <div
              css={css`
                display: flex;
                gap: 0.5rem;
                max-height: 125px;
              `}
            >
              <PokemonWrapper
                className={mainType}
                color={getBgColorType(mainType)}
              >
                <Link to={`/${pokemon.pokemon_name}`}>
                  <StyledPokemonImg pokemonId={pokemon.pokemon_id} alt="" />
                  <PokeballImgWrapper>
                    <PokeballImg src={Pokeball} alt="" />
                  </PokeballImgWrapper>
                  <Number>{`#${pokemon.order}`}</Number>
                  <Name>{pokemon.name}</Name>
                  <PokemonTypes>
                    {types.map((type) => (
                      <PokemonType
                        key={type.type?.id}
                        color={getBgColorType(type.type?.name ?? "")}
                      >
                        {renderEmojiType(type.type?.name ?? "")}
                      </PokemonType>
                    ))}
                  </PokemonTypes>
                </Link>
              </PokemonWrapper>
              <ReleaseButton onClick={() => releasePokemon(pokemon.id)}>
                Release
              </ReleaseButton>
            </div>
          );
        })}
      </PokemonsWrapper>
      <NavigationBar />
    </div>
  );
};

export default MyPokemon;
