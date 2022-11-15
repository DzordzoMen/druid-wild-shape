import type { Environment } from './enums/Environment';
import type { Alignment } from './enums/Alignment';
import type { IAbilities } from './IAbilities';
import type { Size } from './enums/Size';
import type { IAction } from './IAction';
import type { ISkill } from './ISkill';
import type { ISpeed } from './ISpeed';
import type { ITrait } from './ITrait';

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
  skills: ISkill[]; // like Darkvision
  passivePerception?: number | null;
  proficiencyBonus?: number | null;
  abilities: IAbilities;
  traits: ITrait[]; // like pack tactics
  actions: IAction[]; // like bite
}
