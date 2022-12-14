<template>
  <div class="beast-info-ability">
    <div>{{ name.slice(0, 3) }}</div>
    <div>{{ value }}</div>
    <div class="beast-info-ability__modifier">{{ abilityModifier }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String, // Enum
    required: false,
    default: null,
  },
  value: {
    type: Number,
    required: false,
    default: 0,
  },
});
// TODO refactor
const abilityModifier = computed((): string => {
  const { value } = props;

  const isValueBetween = (min: number, max: number, value: number) =>
    value >= min && value <= max;

  if (value === 1) return '- 5';
  if (isValueBetween(2, 3, value)) return '- 4';
  if (isValueBetween(4, 5, value)) return '- 3';
  if (isValueBetween(6, 7, value)) return '- 2';
  if (isValueBetween(8, 9, value)) return '- 1';
  if (isValueBetween(10, 11, value)) return '+ 0';
  if (isValueBetween(12, 13, value)) return '+ 1';
  if (isValueBetween(14, 15, value)) return '+ 2';
  if (isValueBetween(16, 17, value)) return '+ 3';
  if (isValueBetween(18, 19, value)) return '+ 4';
  if (isValueBetween(20, 21, value)) return '+ 5';
  if (isValueBetween(22, 23, value)) return '+ 6';
  if (isValueBetween(24, 25, value)) return '+ 7';
  if (isValueBetween(26, 27, value)) return '+ 8';
  if (isValueBetween(28, 29, value)) return '+ 9';
  return '+ 10';
});
</script>

<style scoped lang="scss">
.beast-info-ability {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px 8px 0 8px;
  gap: 4px;
  height: fit-content;
  flex: 0 1 80px;
  color: var(--color-text);
  background-color: #262626;
  text-transform: uppercase;

  & > div {
    &:nth-child(-n + 2) {
      font-size: 16px;
    }

    &:first-child {
      font-weight: 600;
    }
  }

  &__modifier {
    padding: 4px;
    min-width: 48px;
    text-align: center;
    font-size: 14px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: var(--primary-color);
  }
}
</style>
