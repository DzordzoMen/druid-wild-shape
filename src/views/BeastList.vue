<template>
  <div class="beast-list">
    <beast-list-group
      v-for="(group, index) in beastModule.groupedBeasts"
      :key="index"
      :beast-group="group"
    />

    <div class="beast-list__empty" v-if="!beastModule.groupedBeasts.length">
      <icon-otter :height="96" :width="96" />
      Can't find anything matching your filters
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { useBeastsStore } from '@/stores/beasts';

import BeastListGroup from '@/components/BeastListGroup.vue';
import IconOtter from '@/components/icons/IconOtter.vue';

const beastModule = useBeastsStore();

useTitle(`D&D 5 - Druid wild shape`);
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    padding: 40px;
    width: 100%;
    gap: 12px;
    height: calc(100vh - 56px - 24px);
  }
}
</style>
