<template>
  <div class="beast-list-group">
    <div class="beast-list-group__title">{{ beastGroup.challenge }}</div>

    <beast-list-item
      v-for="(beast, index) in beastGroup.beasts"
      :key="index"
      :beast="beast"
    />
  </div>
</template>

<script setup lang="ts">
import type { IGroupedBeasts } from '@/types/IGroupedBeasts';

import BeastListItem from '@/components/BeastListItem.vue';

defineProps<{
  beastGroup: IGroupedBeasts;
}>();
</script>

<style scoped lang="scss">
.beast-list-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  &__title {
    color: #fff;
    flex: 1 1 100%;
    display: flex;
    font-size: 18px;
    letter-spacing: 4px;
    gap: 10px;
    font-weight: 600;
    justify-content: center;
    align-items: center;

    &::after,
    &::before {
      content: '';
      border-top: 2px solid #fff;
      width: 100px;
    }
  }
}
</style>
