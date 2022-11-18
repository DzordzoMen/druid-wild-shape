import type { IBeast } from '@/types/IBeast';
import { defineStore } from 'pinia';

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
    availableBeastsFromSelectedBooks(state): IBeast[] {
      const { monsterManualBeasts, tomeOfFoesBeasts, voloBeasts } = state;
      const usedHandbooks = localStorage.getItem('used-handbooks');
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
