import type { Alignment } from './enums/Alignment';
import type { Environment } from './enums/Environment';
import type { Size } from './enums/Size';
import type { IAbilities } from './IAbilities';

export interface IBeast {
  name: string;
  description?: string | null;
  health: number;
  armorClass?: number | null;
  move: object[]; // TODO
  size: Size;
  alignment: Alignment;
  environment: Environment[];
  skills: object[]; // TODO
  passivePerception?: number | null;
  proficiencyBonus?: number | null;
  abilities: IAbilities;
  actions: object[]; // TODO
}
