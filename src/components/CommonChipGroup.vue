<template>
  <div class="common-chip-group" :class="{ 'common-chip-group--column': column }">
    <common-chip
      @update:selected="clickHandler(item)"
      :selected="isChipSelected(item)"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item.text }}
    </common-chip>
  </div>
</template>

<script setup lang="ts">
import type { IChipGroupItem } from '../types/IChipGroupItem';

import CommonChip from './CommonChip.vue';

const props = withDefaults(
  defineProps<{
    modelValue: Array<string | number | null>;
    items: IChipGroupItem[];
    column?: boolean;
  }>(),
  {
    column: false,
  }
);

const emit = defineEmits(['update:modelValue']);

function isChipSelected(item: IChipGroupItem): boolean {
  const { modelValue } = props;
  const itemValue = item?.value ?? item?.text;

  return modelValue.includes(itemValue);
}

function clickHandler(item: IChipGroupItem): void {
  const currModelValue = [...props.modelValue];

  const itemValue = item?.value ?? item?.text;
  const indexInModelValue = currModelValue.findIndex((i) => i === itemValue);

  if (indexInModelValue === -1) {
    currModelValue.push(itemValue);
  } else {
    currModelValue.splice(indexInModelValue, 1);
  }

  emit('update:modelValue', currModelValue);
}
</script>

<style scoped lang="scss">
.common-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &--column {
    flex-direction: column;
  }
}
</style>
