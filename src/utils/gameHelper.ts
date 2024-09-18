import { getEntityCount, getEntityProperties, Entity, getEntityName } from "../apis/apiInterface";
import PokemonSprite, { Move } from "../core/PokemonSprite";
import { getFormattedPokemonData, getRandomInt, PokemonData } from "./dataProcessors";

let totalPokemonCountCache: number | null = null;
let totalMoveCountCache: number | null = null;

async function getRandomMoveName(): Promise<string> {
  if (totalMoveCountCache === null) {
    totalMoveCountCache = await getEntityCount(Entity.MOVE);
  }
  const randomInt = getRandomInt(0, totalMoveCountCache - 1);
  return await getEntityName(randomInt, Entity.MOVE);
}

async function pickRandomMove(moves: Array<{ move: { name: string; }; }>): Promise<Move> {
  const moveName = moves.length > 0
    ? moves[getRandomInt(0, moves.length - 1)].move.name
    : await getRandomMoveName();

  const moveProperties = await getEntityProperties<Move>(moveName, Entity.MOVE);
  return {
    name: moveProperties.name,
    power: moveProperties.power,
  };
}

export async function createRandomPokemonInstance(): Promise<PokemonSprite> {
  if (totalPokemonCountCache === null) {
    totalPokemonCountCache = await getEntityCount(Entity.POKEMON);
  }
  const randomInt = getRandomInt(0, totalPokemonCountCache - 1);
  const pokemonName = await getEntityName(randomInt, Entity.POKEMON);
  const pokemonData = await getEntityProperties<PokemonData>(pokemonName, Entity.POKEMON);
  const move = await pickRandomMove(pokemonData.moves);
  const formattedData = getFormattedPokemonData(pokemonData, move);
  return new PokemonSprite(formattedData);
}

export const battleResultLogMap = {
  DRAW: 'Draw!',
  HAS_WINNER: (pokemonInstances: PokemonSprite[]) => {
    pokemonInstances.sort((a, b) => b.getMovePower() - a.getMovePower());
    return `${pokemonInstances[0].name} lands a decisive blow with ${pokemonInstances[0].getMoveName()} knocking out ${pokemonInstances[1].name}!`;
  },
};