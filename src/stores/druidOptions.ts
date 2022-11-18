import { useStorage, type RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';

interface State {
  druidLevel: RemovableRef<string | number>;
  selectedBooks: RemovableRef<string[]>;
  moonDruid: RemovableRef<boolean>;
}

export const useDruidOptionsStore = defineStore('druid-options', {
  state: (): State => ({
    druidLevel: useStorage('druid-level', ''),
    selectedBooks: useStorage('used-handbooks', ['MM', 'GtM', 'ToF']),
    moonDruid: useStorage('moon-druid', true),
  }),
  actions: {
    setDruidLevel(value: string | number): void {
      this.druidLevel = value;
    },
    setSelectedBooks(value: string[]): void {
      this.selectedBooks = value;
    },
    setMoonDruid(value: boolean): void {
      this.moonDruid = value;
    },
  },
});
