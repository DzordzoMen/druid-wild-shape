<template>
  <common-sidebar v-bind="$attrs" left>
    <div class="sidebar-content">
      <common-input
        v-model:modelValue="search"
        id="search"
        placeholder="Name, Move, Attack..."
      >
        <template #label> Search </template>
      </common-input>

      <div class="sidebar-label">
        <label>Size</label>
        <common-chip-group v-model:modelValue="selectedSizes" :items="availableSize" />
      </div>

      <div class="sidebar-label">
        <label>Move</label>
        <common-chip-group v-model:modelValue="selectedMoves" :items="availableMoves" />
      </div>

      <div class="sidebar-label">
        <label>Environment</label>
        <common-chip-group v-model:modelValue="selectedEnvs" :items="availableEnvs" />
      </div>
    </div>
  </common-sidebar>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useFiltersStore } from '@/stores/filters';
import { Move } from '@/types/enums/Move';
import { Size } from '@/types/enums/Size';
import { Environment } from '@/types/enums/Environment';
import type { IChipGroupItem } from '@/types/IChipGroupItem';

import CommonInput from './CommonInput.vue';
import CommonSidebar from './CommonSidebar.vue';
import CommonChipGroup from './CommonChipGroup.vue';

const availableMoves: IChipGroupItem[] = Object.keys(Move).map(
  (value): IChipGroupItem => ({ text: value, value })
);

const availableSize: IChipGroupItem[] = Object.keys(Size).map(
  (value): IChipGroupItem => ({ text: value, value })
);

const availableEnvs: IChipGroupItem[] = Object.keys(Environment).map(
  (value): IChipGroupItem => ({ text: value, value })
);

const filtersModule = useFiltersStore();

const search = computed({
  get: () => filtersModule.search,
  set: (val: string) => filtersModule.setSearch(val),
});

const selectedMoves = computed({
  get: () => filtersModule.selectedMoves,
  set: (val: string[]) => filtersModule.setSelectedMoves(val),
});

const selectedSizes = computed({
  get: () => filtersModule.selectedSizes,
  set: (val: string[]) => filtersModule.setSelectedSizes(val),
});

const selectedEnvs = computed({
  get: () => filtersModule.selectedEnvs,
  set: (val: string[]) => filtersModule.setSelectedEnvs(val),
});

onBeforeMount(() => {
  selectedSizes.value = availableSize.map((size) => size.value) as string[];
  selectedMoves.value = availableMoves.map((move) => move.value) as string[];
  selectedEnvs.value = availableEnvs.map((env) => env.value) as string[];
});
</script>

<style scoped lang="scss">
.sidebar-content {
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 20px;

  & :deep(.common-chip-group) {
    & > .common-chip {
      flex: 1 1 auto;
    }
  }
}

.sidebar-label {
  display: flex;
  flex-direction: column;
  gap: 6px;

  & > label {
    color: #fff;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
