<template>
  <div class="beast-list">
    <beast-list-group
      v-for="(group, index) in beastModule.groupedBeasts"
      :key="index"
      :beast-group="group"
    />
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
}
</style>
