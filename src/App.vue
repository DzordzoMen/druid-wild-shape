<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';

import FiltersSidebar from './components/TheFiltersSidebar.vue';
import OptionsSidebar from './components/TheOptionsSidebar.vue';
import IconClose from './components/icons/IconClose.vue';
import IconFilter from './components/icons/IconFilter.vue';
import iconOptions from './components/icons/IconOptions.vue';

const showLeftSidebar = ref(true);
const showRightSidebar = ref(true);

const route = useRoute();

const showFiltersSidebar = computed(() => {
  return route.name === 'BeastInfo' ? false : showLeftSidebar.value;
});

const showOptionsSidebar = computed(() => {
  return route.name === 'BeastInfo' ? false : showRightSidebar.value;
});

function toggleLeftSidebar(): void {
  showLeftSidebar.value = !showLeftSidebar.value;
}
</script>

<template>
  <header>
    <icon-filter @click="toggleLeftSidebar()" />

    <div>Wild Shape</div>

    <icon-options v-if="!showRightSidebar" @click="showRightSidebar = true" />
    <icon-close v-else @click="showRightSidebar = false" />
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

// #7668cb
// #8678d7

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
