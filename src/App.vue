<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import { useBreakpoints } from '@vueuse/core';

import FiltersSidebar from './components/TheFiltersSidebar.vue';
import OptionsSidebar from './components/TheOptionsSidebar.vue';
import IconClose from './components/icons/IconClose.vue';
import IconFilter from './components/icons/IconFilter.vue';
import iconOptions from './components/icons/IconOptions.vue';

const showLeftSidebar = ref(true);
const showRightSidebar = ref(true);

const route = useRoute();

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
});

const showFiltersSidebar = computed(() => {
  return route.name === 'BeastInfo' ? false : showLeftSidebar.value;
});

const showOptionsSidebar = computed(() => {
  return route.name === 'BeastInfo' ? false : showRightSidebar.value;
});

const showIcons = computed((): boolean => {
  return breakpoints.smallerOrEqual('tablet').value;
});

function toggleLeftSidebar(): void {
  showLeftSidebar.value = !showLeftSidebar.value;
}
</script>

<template>
  <header>
    <template v-if="showIcons">
      <icon-filter @click="toggleLeftSidebar()" />
    </template>

    <div>Wild Shape</div>

    <template v-if="showIcons">
      <icon-options v-if="!showRightSidebar" @click="showRightSidebar = true" />
      <icon-close v-else @click="showRightSidebar = false" />
    </template>
  </header>

  <filters-sidebar
    :show="showFiltersSidebar"
    @update:show="(val) => (showLeftSidebar = val)"
  />

  <options-sidebar
    :show="showOptionsSidebar"
    @update:show="(val) => (showRightSidebar = val)"
  />

  <main
    :class="{
      'main-file--has-sidebar-left': showFiltersSidebar,
      'main-file--has-sidebar-right': showOptionsSidebar,
    }"
  >
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
header {
  height: 56px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0px 2px rgba(0, 0, 0, 0.9) !important;
  background-color: #18181b;
  padding: 12px;
  z-index: 8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 10px;

  & > svg {
    cursor: pointer;
  }

  & > div {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
  }
}
// background: linear-gradient(to bottom, #000000 0%, #390967 20%, #574595 100%) !important
// #7668cb
// #8678d7

// background: rgba(112, 87, 255, 0.18);
// background: rgba(112, 87, 255, 0.24);

main {
  height: calc(100vh - 56px);
  padding: 12px;
  overflow-y: auto;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    margin-left 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    margin-right 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1), width 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  &::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 1000px) {
  .main-file {
    &--has-sidebar-left {
      margin-left: 240px;
    }

    &--has-sidebar-right {
      margin-right: 240px;
    }
  }
}
</style>
