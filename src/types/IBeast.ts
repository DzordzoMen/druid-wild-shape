import type { Alignment } from './enums/Alignment';
import type { Environment } from './enums/Environment';
import type { Size } from './enums/Size';
import type { IAbilities } from './IAbilities';
import type { ISpeed } from './ISpeed';

export interface IBeast {
  name: string;
  description?: string | null;
  hitPoints: number;
  hitPointsInfo: string;
  armorClass?: number | null;
  challenge: number;
  speed: ISpeed[];
  size: Size;
  alignment: Alignment;
  environment: Environment[];
  skills: object[]; // TODO
  passivePerception?: number | null;
  proficiencyBonus?: number | null;
  abilities: IAbilities;
  traits: object[]; // like pack tactics
  actions: object[]; // TODO
}
