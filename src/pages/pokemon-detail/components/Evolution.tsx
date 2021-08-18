/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import PokemonImg from "../../../components/PokemonImg";
import { PokemonSpecyFragment } from "../../../generated/graphql";

const EvolutionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: auto;
  height: 100%;
  width: 85vw;
`;

const Specy = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface EvolutionProps {
  pokemonspecy: PokemonSpecyFragment["specy"];
}

const Evolution = ({ pokemonspecy }: EvolutionProps) => {
  return (
    <EvolutionWrapper>
      {pokemonspecy?.evolutionchain?.species.map((specy, idx, species) => (
        <Specy key={specy.id}>
          <div>
            <div>{specy.name}</div>
            <PokemonImg
              pokemonId={specy.id}
              css={css`
                width: 100%;
              `}
            />
          </div>
          {idx < species.length - 1 && <div>➡️</div>}
        </Specy>
      ))}
    </EvolutionWrapper>
  );
};

export default Evolution;
