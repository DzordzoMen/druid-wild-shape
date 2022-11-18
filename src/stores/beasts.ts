// import { computed } from 'vue';
import { defineStore } from 'pinia';
import type { IBeast } from '@/types/IBeast';

import mmBeasts from '@/assets/books/monster-manual.json';
import tomeOfFoes from '@/assets/books/tome-of-foes.json';
import voloGuideToMonsters from '@/assets/books/volos-guide-to-monsters.json';

export const useCounterStore = defineStore('beasts', () => {
  const monsterManualBeasts = mmBeasts as IBeast[];
  const tomeOfFoesBeasts = tomeOfFoes as IBeast[];
  const voloBeasts = voloGuideToMonsters as IBeast[];

  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  return { monsterManualBeasts, tomeOfFoesBeasts, voloBeasts };
});
