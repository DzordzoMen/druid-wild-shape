import type { IBeast } from '@/types/IBeast';
import { defineStore } from 'pinia';

import { useDruidOptionsStore } from './druidOptions';

import mmBeasts from '@/assets/books/monster-manual.json';
import tomeOfFoes from '@/assets/books/tome-of-foes.json';
import voloGuideToMonsters from '@/assets/books/volos-guide-to-monsters.json';

interface State {
  monsterManualBeasts: IBeast[];
  tomeOfFoesBeasts: IBeast[];
  voloBeasts: IBeast[];
}

export const useBeastsStore = defineStore('beasts', {
  state: (): State => ({
    monsterManualBeasts: mmBeasts as IBeast[],
    tomeOfFoesBeasts: tomeOfFoes as IBeast[],
    voloBeasts: voloGuideToMonsters as IBeast[],
  }),
  getters: {
    maxBeastChallenge(): number | null {
      const druidOptionsModule = useDruidOptionsStore();
      const { druidLevel, moonDruid } = druidOptionsModule;
      const level = Number(druidLevel);

      if (!level || level < 2) return null;

      if (moonDruid) {
        return Math.max(Math.floor(level / 3), 1);
      } else {
        switch (level) {
          case 2:
            return 1 / 4;
          case 4:
            return 1 / 2;
          default:
            return 1;
        }
      }
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
    // TODO filter
    availableBeasts(): IBeast[] {
      return this.availableBeastsFromSelectedBooks;
    },
  },
});
