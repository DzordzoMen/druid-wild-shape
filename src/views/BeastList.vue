<template>
  <div class="beast-list">
    <beast-list-item
      v-for="(beast, index) in list"
      :key="index"
      :beast="beast"
    />
  </div>
</template>

<script setup lang="ts">
import type { IBeast } from '@/types/IBeast';

import monsterManualBeasts from '@/assets/books/monster-manual.json';

import BeastListItem from '@/components/BeastListItem.vue';

const list = monsterManualBeasts as IBeast[];
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
