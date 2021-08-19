import styled from "@emotion/styled";
import React from "react";
import PokemonImg from "../../../components/PokemonImg.component";
import { PokemonSpecyFragment } from "../../../generated/graphql";
import { renderEmojiType } from "../../../utils/meta.util";

const EvolutionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  margin: auto;
  height: 100%;
  width: 85vw;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const Specy = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;

    img {
      max-width: 250px;
    }

    > span {
      margin: auto;
      transform: rotate(90deg);
    }
  }
`;

const PokemonTypes = styled.div`
  display: flex;
`;

const PokemonType = styled.span`
  flex: 1;
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
            <h3>{specy.name}</h3>
            <PokemonImg pokemonId={specy.id} width="100%" />
            <PokemonTypes>
              {specy.pokemon.map((pokemon) =>
                pokemon.types.map((type) => (
                  <PokemonType key={type.type?.id}>
                    {renderEmojiType(type.type?.name ?? "")}
                  </PokemonType>
                ))
              )}
            </PokemonTypes>
          </div>
          {idx < species.length - 1 && <span>➡️</span>}
        </Specy>
      ))}
    </EvolutionWrapper>
  );
};

export default Evolution;
