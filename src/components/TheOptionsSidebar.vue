<template>
  <common-sidebar v-bind="$attrs" right>
    <div class="sidebar-content">
      <common-input
        v-model:modelValue.number="druidLevel"
        id="druid-level"
        placeholder="0"
        type="number"
      >
        <template #label>Druid level</template>
      </common-input>

      <common-checkbox v-model:modelValue="moonDruid" id="moon-druid">
        <template #label>Moon druid</template>
      </common-checkbox>

      <div class="sidebar-label">
        <label>Used Handbooks</label>
        <common-chip-group
          v-model:modelValue="selectedItems"
          :items="items"
          :column="true"
        />
      </div>
    </div>
  </common-sidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IChipGroupItem } from '../types/IChipGroupItem';
import { useDruidOptionsStore } from '@/stores/druidOptions';

import CommonSidebar from './CommonSidebar.vue';
import CommonInput from './CommonInput.vue';
import CommonCheckbox from './CommonCheckbox.vue';
import CommonChipGroup from './CommonChipGroup.vue';

const items: IChipGroupItem[] = [
  {
    text: 'Monster Manual',
    value: 'MM',
  },
  {
    text: `Volo's Guide to Monsters`,
    value: 'GtM',
  },
  {
    text: `Mordenkainen's Tome of Foes`,
    value: 'ToF',
  },
];

const druidOptionsModule = useDruidOptionsStore();

const druidLevel = computed({
  get: () => druidOptionsModule.druidLevel,
  set: (val: string | number) => druidOptionsModule.setDruidLevel(val),
});

const selectedItems = computed({
  get: () => druidOptionsModule.selectedBooks,
  set: (val: string[]) => druidOptionsModule.setSelectedBooks(val),
});

const moonDruid = computed({
  get: () => druidOptionsModule.moonDruid,
  set: (val: boolean) => druidOptionsModule.setMoonDruid(val),
});
</script>

<style scoped lang="scss">
.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-label {
  display: flex;
  flex-direction: column;
  gap: 6px;

  & > label {
    color: var(--color-text);
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
