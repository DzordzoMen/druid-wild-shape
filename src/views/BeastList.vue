<template>
  <div class="beast-list">
    <beast-list-group
      v-for="(group, index) in beastModule.groupedBeasts"
      :key="index"
      :beast-group="group"
    />

    <div class="beast-list__empty" v-if="!beastModule.groupedBeasts.length">
      <!-- sad icon -->
      Can't find anything matching your filters
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBeastsStore } from '@/stores/beasts';

import BeastListGroup from '@/components/BeastListGroup.vue';

const beastModule = useBeastsStore();
</script>

<style scoped lang="scss">
.beast-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  margin: auto;
  max-width: 1020px;

  &__empty {
    color: var(--color-text);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 56px - 24px);
  }
}
</style>
