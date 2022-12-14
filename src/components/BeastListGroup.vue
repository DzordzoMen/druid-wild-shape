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
  gap: 20px;
  width: 100%;
  display: grid;
  grid-template-rows: 30px 1fr;
  grid-template-columns: repeat(2, 1fr);

  &__title {
    color: var(--color-text);
    flex: 1 1 100%;
    display: flex;
    font-size: 18px;
    letter-spacing: 4px;
    gap: 10px;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    grid-column: span 2;

    &::after,
    &::before {
      content: '';
      border-top: 2px solid var(--color-text);
      width: 100px;
    }
  }
}

@media (max-width: 420px) {
  .beast-list-group {
    grid-template-columns: repeat(1, 1fr);

    &__title {
      grid-column: span 1;
    }
  }
}
</style>
