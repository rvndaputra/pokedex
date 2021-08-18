import React from "react";

interface PokemonImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  pokemonId: number;
}

const PokemonImg = ({ pokemonId, ...props }: PokemonImgProps) => {
  return (
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
      alt=""
      {...props}
    />
  );
};

export default PokemonImg;
