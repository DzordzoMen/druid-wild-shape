import type { IBeast } from '@/types/IBeast';
import { defineStore } from 'pinia';
import getNameLink from '@/utils/getNameLink';

import { useDruidOptionsStore } from './druidOptions';

import elementals from '@/assets/books/elementals.json';
import mmBeasts from '@/assets/books/monster-manual.json';
import tomeOfFoes from '@/assets/books/tome-of-foes.json';
import voloGuideToMonsters from '@/assets/books/volos-guide-to-monsters.json';
import { Move } from '@/types/enums/Move';

interface State {
  monsterManualBeasts: IBeast[];
  tomeOfFoesBeasts: IBeast[];
  voloBeasts: IBeast[];
  elementals: IBeast[];
}

export const useBeastsStore = defineStore('beasts', {
  state: (): State => ({
    monsterManualBeasts: mmBeasts as IBeast[],
    tomeOfFoesBeasts: tomeOfFoes as IBeast[],
    voloBeasts: voloGuideToMonsters as IBeast[],
    elementals: elementals as IBeast[],
  }),
  getters: {
    allBeasts(state): IBeast[] {
      const { monsterManualBeasts, tomeOfFoesBeasts, voloBeasts, elementals } = state;

      return [...monsterManualBeasts, ...tomeOfFoesBeasts, ...voloBeasts, ...elementals];
    },
    getBeastDataByName(): (beastName: string) => IBeast | undefined {
      return (beastName: string) =>
        this.allBeasts.find(({ name }) => getNameLink(name) === beastName);
    },
    maxBeastChallenge(): number | null {
      const druidOptionsModule = useDruidOptionsStore();
      const { druidLevel, moonDruid } = druidOptionsModule;
      const level = Number(druidLevel);

      if (!level || level < 2) return null;

      if (moonDruid) {
        return Math.max(Math.floor(level / 3), 1);
      } else {
        if (level >= 2 && level < 4) {
          return 1 / 4;
        } else if (level >= 4 && level < 8) {
          return 1 / 2;
        } else {
          return 1;
        }
      }
    },
    showFlyingBeasts(): boolean {
      const druidOptionsModule = useDruidOptionsStore();
      const { druidLevel } = druidOptionsModule;
      const level = Number(druidLevel);

      return level >= 8;
    },
    showSwimmingBeasts(): boolean {
      const druidOptionsModule = useDruidOptionsStore();
      const { druidLevel } = druidOptionsModule;
      const level = Number(druidLevel);

      return level >= 4;
    },
    showElementals(): boolean {
      const druidOptionsModule = useDruidOptionsStore();
      const { druidLevel, moonDruid } = druidOptionsModule;
      const level = Number(druidLevel);

      return moonDruid && level >= 10;
    },
    availableBeastsFromSelectedBooks(state): IBeast[] {
      const { monsterManualBeasts, tomeOfFoesBeasts, voloBeasts } = state;
      const druidOptionsModule = useDruidOptionsStore();

      const usedHandbooks = druidOptionsModule.selectedBooks;
      const result: IBeast[] = [];

      if (usedHandbooks?.includes('MM')) result.push(...monsterManualBeasts);
      if (usedHandbooks?.includes('GtM')) result.push(...voloBeasts);
      if (usedHandbooks?.includes('ToF')) result.push(...tomeOfFoesBeasts);

      return result;
    },
    availableBeasts(state): IBeast[] {
      const { elementals } = state;
      const {
        availableBeastsFromSelectedBooks: beasts,
        showElementals,
        showFlyingBeasts,
        maxBeastChallenge,
        showSwimmingBeasts,
      } = this;

      if (maxBeastChallenge === null) return beasts;

      let filteredBeasts = beasts.filter(
        (beast) => eval(beast.challenge) <= maxBeastChallenge
      );

      if (!showSwimmingBeasts)
        filteredBeasts = filteredBeasts.filter(
          (beast) => !beast.speed.map(({ name }) => name).includes(Move.Swim)
        );

      if (!showFlyingBeasts)
        filteredBeasts = filteredBeasts.filter(
          (beast) => !beast.speed.map(({ name }) => name).includes(Move.Fly)
        );

      if (showElementals) filteredBeasts.push(...elementals);

      return filteredBeasts;
    },
  },
});
