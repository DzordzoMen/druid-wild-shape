<template>
  <common-sidebar v-bind="$attrs" right>
    <div class="sidebar-content">
      <common-input id="druid-level" placeholder="0" type="number">
        <template #label>Druid level</template>
      </common-input>

      <common-chip-group
        v-model:modelValue="selectedItems"
        :items="items"
        :column="true"
      />

      <common-checkbox id="moon-druid">
        <template #label>Moon druid</template>
      </common-checkbox>
    </div>
  </common-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IChipGroupItem } from '../types/IChipGroupItem';

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

const selectedItems = ref(['MM', 'GtM', 'ToF']);
</script>

<style scoped lang="scss">
.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
