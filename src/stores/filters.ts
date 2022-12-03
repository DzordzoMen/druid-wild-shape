import { defineStore } from 'pinia';

interface State {
  search: string;
  selectedMoves: string[];
  selectedSizes: string[];
  selectedEnvs: string[];
}

export const useFiltersStore = defineStore('filters', {
  state: (): State => ({
    search: '',
    selectedEnvs: [],
    selectedMoves: [],
    selectedSizes: [],
  }),
  actions: {
    setSearch(value: string): void {
      this.search = value;
    },
    setSelectedEnvs(value: string[]): void {
      this.selectedEnvs = value;
    },
    setSelectedSizes(value: string[]): void {
      this.selectedSizes = value;
    },
    setSelectedMoves(value: string[]): void {
      this.selectedMoves = value;
    },
  },
});
