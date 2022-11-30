<template>
  <div class="beast-list-item">
    <div class="beast-list-item__row">
      <div>{{ beast.name }}</div>
      <div>CR: {{ beast.challenge }}</div>
    </div>
    <div class="beast-list-item__row">
      <div>HP: {{ beast.hitPoints }}</div>
      <div>AC: {{ beast.armorClass }}</div>
      <div>Move: {{ moveTypes }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBeast } from '@/types/IBeast';

import { computed } from 'vue';

const props = defineProps<{
  beast: IBeast;
}>();

const moveTypes = computed(() => {
  return props.beast.speed.map((item) => item.name).join(', ');
});
</script>

<style scoped lang="scss">
.beast-list-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 1 460px;
  background-color: #262626;
  border-radius: 4px;
  padding: 12px;
  color: #fff;

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex: 1 1;
    gap: 14px;

    & > div {
      display: flex;
      flex: 1 1;
    }

    &:first-child {
      & > div:last-child {
        flex: 0 1;
        white-space: nowrap;
      }
    }

    &:last-child {
      & > div {
        &:nth-child(-n + 2) {
          flex: 0 1;
          white-space: nowrap;
        }

        &:last-child {
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
