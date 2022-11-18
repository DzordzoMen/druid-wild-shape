<template>
  <div class="beast-list">
    <beast-list-item
      v-for="(beast, index) in beastModule.availableBeasts"
      :key="index"
      :beast="beast"
    />
  </div>
</template>

<script setup lang="ts">
import { useBeastsStore } from '@/stores/beasts';

import BeastListItem from '@/components/BeastListItem.vue';

const beastModule = useBeastsStore();
</script>

<style scoped lang="scss">
.beast-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: auto;
  max-width: 1020px;
}
</style>
