<template>
  <div class="beast-info">
    <div>{{ beastInfo?.name }}</div>
    <br />
    <div>{{ beastInfo }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBeastsStore } from '@/stores/beasts';

const route = useRoute();
const beastModule = useBeastsStore();

const beastName: string = route.params.beastName as string;

const beastInfo = computed(() => {
  return beastModule.getBeastDataByName(beastName);
});
</script>

<style scoped lang="scss">
.beast-info {
  max-width: 1020px;
  margin: auto;
  color: #fff;
}
</style>
