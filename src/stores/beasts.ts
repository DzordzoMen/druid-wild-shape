import { defineStore } from 'pinia';
import { Move } from '@/types/enums/Move';
import type { IBeast } from '@/types/IBeast';
import type { IGroupedBeasts } from '@/types/IGroupedBeasts';

import { useDruidOptionsStore } from './druidOptions';
import { useFiltersStore } from './filters';
import getNameLink from '@/utils/getNameLink';

import elementals from '@/assets/books/elementals.json';
import mmBeasts from '@/assets/books/monster-manual.json';
import monstersOfTheMultiverse from '@/assets/books/monsters-of-the-multiverse.json';
import voloGuideToMonsters from '@/assets/books/volos-guide-to-monsters.json';

interface State {
  monsterManualBeasts: IBeast[];
  monstersOfTheMultiverseBeasts: IBeast[];
  voloBeasts: IBeast[];
  elementals: IBeast[];
}

export const useBeastsStore = defineStore('beasts', {
  state: (): State => ({
    monsterManualBeasts: mmBeasts as IBeast[],
    monstersOfTheMultiverseBeasts: monstersOfTheMultiverse as IBeast[],
    voloBeasts: voloGuideToMonsters as IBeast[],
    elementals: elementals as IBeast[],
  }),
  getters: {
    allBeasts(state): IBeast[] {
      const {
        monsterManualBeasts,
        monstersOfTheMultiverseBeasts,
        voloBeasts,
        elementals,
      } = state;

      return [
        ...monsterManualBeasts,
        ...monstersOfTheMultiverseBeasts,
        ...voloBeasts,
        ...elementals,
      ];
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
      const { monsterManualBeasts, monstersOfTheMultiverseBeasts, voloBeasts } = state;
      const druidOptionsModule = useDruidOptionsStore();

      const usedHandbooks = druidOptionsModule.selectedBooks;
      const result: IBeast[] = [];

      if (usedHandbooks?.includes('MM')) result.push(...monsterManualBeasts);
      if (usedHandbooks?.includes('GtM')) result.push(...voloBeasts);
      if (usedHandbooks?.includes('MotM')) result.push(...monstersOfTheMultiverseBeasts);

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
    filteredBeasts(): IBeast[] {
      const filtersModule = useFiltersStore();
      const { selectedSizes, selectedMoves, selectedEnvs, search } = filtersModule;
      let filteredBeasts = this.availableBeasts;

      filteredBeasts = filteredBeasts.filter(({ size }) => selectedSizes.includes(size));

      filteredBeasts = filteredBeasts.filter(({ speed }) =>
        speed.map((item) => item.name).some((val) => selectedMoves.includes(val))
      );

      filteredBeasts = filteredBeasts.filter(({ environment }) =>
        environment.some((val) => selectedEnvs.includes(val))
      );

      const searchArray: string[] =
        search
          ?.replace(/ /g, '')
          ?.split(',')
          ?.filter((item) => item) ?? [];

      const regexPattern = `${searchArray.map((word) => `(?=.*?\\b${word})`).join('')}.*`;

      const searchRegex = new RegExp(regexPattern, 'i');

      filteredBeasts = filteredBeasts.filter((beast) =>
        searchRegex.test(JSON.stringify(beast))
      );

      return filteredBeasts;
    },
    groupedBeasts(): IGroupedBeasts[] {
      const { filteredBeasts } = this;
      const groupedBeasts: IGroupedBeasts[] = [];

      filteredBeasts.forEach((beast) => {
        const beastChallenge = beast.challenge;
        const challengeIndex = groupedBeasts.findIndex(
          (group) => group.challenge === beastChallenge
        );

        if (challengeIndex === -1) {
          groupedBeasts.push({
            challenge: beastChallenge,
            beasts: [beast],
          });
        } else {
          groupedBeasts[challengeIndex].beasts.push(beast);
        }
      });

      return groupedBeasts.sort((a, b) => eval(a.challenge) - eval(b.challenge));
    },
  },
});
