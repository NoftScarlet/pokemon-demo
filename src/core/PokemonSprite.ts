import { kebabToCapitalCase } from "../utils/dataProcessors";

export interface Move {
  power: number,
  name: string;
}

export interface PokemonProperties {
  name: string;
  baseStatHp: number;
  frontSprite: string;
  backSprite: string;
  primaryType: string;
  move: Move;
}

class PokemonSprite {
  public name!: string;
  public baseStatHp!: number;
  public frontSprite!: string;
  public backSprite!: string;
  public primaryType!: string;
  public move!: Move;

  constructor(properties: PokemonProperties) {
    Object.assign(this, properties);
    this.name = kebabToCapitalCase(this.name);
    this.move.name = kebabToCapitalCase(this.move.name);
    this.move.power = this.move.power ?? 0;
  }

  getMovePower(): number {
    return this.move.power;
  }

  getMoveName(): string {
    return this.move.name;
  }
}

export default PokemonSprite;