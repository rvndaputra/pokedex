/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import PokemonImg from "../../../components/PokemonImg";
import { PokemonDetailQuery } from "../../../generated/graphql";

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100%;
  height: 100%;
`;

const Stats = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  width: 75px;
  background-color: #ffffff;
  border-radius: 15px;

  > span {
    &:nth-of-type(2) {
      text-transform: capitalize;
    }

    &:last-child {
      font-weight: 700;
      font-size: 1.25rem;
    }
  }
`;

const Moves = styled.ul`
  columns: 3;
  margin-top: 0;
  text-align: left;
  list-style-position: inside;
`;

interface AboutProps {
  pokemon: PokemonDetailQuery["pokemon"][number];
}

const About = ({ pokemon }: AboutProps) => {
  const { specy, moves, stats } = pokemon;

  const whitelistStat = ["attack", "defense", "hp", "speed"];
  const emoji: Record<string, string> = {
    attack: "⚡️",
    defense: "🛡️",
    hp: "❤️",
    speed: "🍃",
  };

  return (
    <AboutWrapper>
      <PokemonImg
        pokemonId={pokemon.id}
        css={css`
          width: 12.5%;
          max-width: 300px;
        `}
      />
      <Stats>
        {stats.map(
          (stat) =>
            !!stat.stat &&
            whitelistStat.includes(stat.stat.name) && (
              <Box key={stat.stat.id}>
                <span>{emoji[stat.stat.name]}</span>
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </Box>
            )
        )}
      </Stats>
      <Box
        css={css`
          width: 100%;
          max-width: 300px;
          padding: 1rem;
          margin: 1rem;
        `}
      >
        <span>🎲</span>
        <span>Chance to catch</span>
        <span>{`${specy?.capture_rate}%`}</span>
      </Box>
      <h4
        css={css`
          margin: 0 0 0.5rem;
          text-align: left;
        `}
      >
        Moves:
      </h4>
      <Moves>
        {moves.slice(0, 6).map((move) => (
          <li key={move.id}>{move.move?.name}</li>
        ))}
      </Moves>
    </AboutWrapper>
  );
};

export default About;
