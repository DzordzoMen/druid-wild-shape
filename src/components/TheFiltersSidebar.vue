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
        <label>
          Size

          <div
            v-if="isFilteringSizes"
            class="sidebar-label__clear"
            tabindex="0"
            @click="resetSelectedSizes()"
            @keypress.space="resetSelectedSizes()"
          >
            Reset
          </div>
        </label>
        <common-chip-group v-model:modelValue="selectedSizes" :items="availableSize" />
      </div>

      <div class="sidebar-label">
        <label>
          Move

          <div
            v-if="isFilteringMoves"
            class="sidebar-label__clear"
            tabindex="0"
            @click="resetSelectedMoves()"
            @keypress.space="resetSelectedMoves()"
          >
            Reset
          </div>
        </label>
        <common-chip-group v-model:modelValue="selectedMoves" :items="availableMoves" />
      </div>

      <div class="sidebar-label">
        <label>
          Environment

          <div
            v-if="isFilteringEnvs"
            class="sidebar-label__clear"
            tabindex="0"
            @click="resetSelectedEnvs()"
            @keypress.space="resetSelectedEnvs()"
          >
            Reset
          </div>
        </label>
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

const isFilteringMoves = computed(
  () => selectedMoves.value?.length !== availableMoves?.length
);

const isFilteringSizes = computed(
  () => selectedSizes.value?.length !== availableSize?.length
);

const isFilteringEnvs = computed(
  () => selectedEnvs.value?.length !== availableEnvs?.length
);

onBeforeMount(() => {
  selectedSizes.value = availableSize.map((size) => size.value) as string[];
  selectedMoves.value = availableMoves.map((move) => move.value) as string[];
  selectedEnvs.value = availableEnvs.map((env) => env.value) as string[];
});

function resetSelectedSizes(): void {
  selectedSizes.value = [...availableSize.map(({ value }) => value as string)];
}

function resetSelectedMoves(): void {
  selectedMoves.value = [...availableMoves.map(({ value }) => value as string)];
}

function resetSelectedEnvs(): void {
  selectedEnvs.value = [...availableEnvs.map(({ value }) => value as string)];
}
</script>

<style scoped lang="scss">
.sidebar-content {
  display: flex;
  flex-direction: column;
  color: var(--color-text);
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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 4px;
    justify-content: space-between;
    color: var(--color-text);
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    z-index: 2;
  }

  &__clear {
    cursor: pointer;
    color: var(--secondary-color);
    font-weight: 400;
    outline: none;
    animation: fade-in 0.24s ease-in;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
