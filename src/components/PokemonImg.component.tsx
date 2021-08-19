import React from "react";

interface PokemonImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  pokemonId: number;
  artwork?: "official" | "dream-world";
}

const PokemonImg = ({
  pokemonId,
  artwork = "official",
  ...props
}: PokemonImgProps) => {
  const getSourceArtwork = () => {
    switch (artwork) {
      case "official":
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
      case "dream-world":
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
      default:
        break;
    }
  };

  return <img src={getSourceArtwork()} alt="" {...props} />;
};

export default PokemonImg;
