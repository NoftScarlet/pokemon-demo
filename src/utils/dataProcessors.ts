import { Move, PokemonProperties } from "../core/PokemonSprite";
const placeholderURL = './no-image-placeholder.png';

export interface PokemonData {
  name: string;
  stats: Array<{
    base_stat: number;
  }>;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

export function getFormattedPokemonData(pokemonData: PokemonData, move: Move): PokemonProperties {
  return {
    name: pokemonData.name,
    baseStatHp: pokemonData.stats[0].base_stat,
    frontSprite: pokemonData.sprites.front_default ?? placeholderURL,
    backSprite: pokemonData.sprites.back_default ?? pokemonData.sprites.front_default ?? placeholderURL,
    primaryType: pokemonData.types[0].type.name,
    move
  };
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function kebabToCapitalCase(string: string) {
  return string.split('-').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}