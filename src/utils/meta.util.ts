export const pokemonTypes: Record<any, { bg: string; emoji: string }> = {
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

export const validPokemonType = (type: string): boolean => !!pokemonTypes[type];

export const renderEmojiType = (type: string): string =>
  validPokemonType(type) ? `${pokemonTypes[type].emoji} ${type}` : type;

export const getBgColorType = (type: string) =>
  validPokemonType(type) ? pokemonTypes[type].bg : "#ffffff";
