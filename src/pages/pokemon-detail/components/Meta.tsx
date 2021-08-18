/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import PokemonImg from "../../../components/PokemonImg";
import { PokemonDetailQuery } from "../../../generated/graphql";
import { renderEmojiType } from "../../../utils/meta.util";

const PokemonMetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100%;
  max-width: 300px;
`;

const Name = styled.h2`
  margin: 2rem 0 0;
  font-size: 3.75rem;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const Types = styled.div`
  display: flex;
  width: 300px;
`;

const Type = styled.span`
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem;
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  > div {
    display: flex;
    gap: 0.25rem;

    > span {
      font-weight: 700;
    }
  }
`;

interface MetaProps {
  pokemon: PokemonDetailQuery["pokemon"][number];
}

const Meta = ({ pokemon }: MetaProps) => {
  const { types } = pokemon;

  return (
    <PokemonMetaWrapper>
      <Name>{pokemon.name}</Name>
      <Types>
        {types.map((type) => (
          <Type key={type.type?.name}>
            {renderEmojiType(type.type?.name ?? "")}
          </Type>
        ))}
      </Types>
      <div
        css={css`
          flex: 1;
          position: relative;
          margin-top: 1.5rem;

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
        `}
      >
        <PokemonImg pokemonId={pokemon.id} height="175px" />
      </div>
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
    </PokemonMetaWrapper>
  );
};

export default Meta;
