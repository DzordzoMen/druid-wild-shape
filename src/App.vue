<script setup lang="ts">
import { ref, computed, watch, defineExpose } from 'vue';
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

const userIsOnBeastPage = computed((): boolean => {
  return route.name === 'BeastInfo';
});

const showFiltersSidebar = computed(() => {
  return userIsOnBeastPage.value ? false : showLeftSidebar.value;
});

const showOptionsSidebar = computed(() => {
  return userIsOnBeastPage.value ? false : showRightSidebar.value;
});

const showIcons = computed((): boolean => {
  return breakpoints.smallerOrEqual('tablet').value;
});

function toggleLeftSidebar(value: boolean): void {
  showLeftSidebar.value = value;
}

function toggleRightSidebar(value: boolean): void {
  showRightSidebar.value = value;
}

watch(
  showIcons,
  (value: boolean) => {
    toggleLeftSidebar(!value);
    toggleRightSidebar(!value);
  },
  { immediate: true }
);

defineExpose({
  showLeftSidebar,
  showRightSidebar,
  breakpoints,
  toggleLeftSidebar,
  toggleRightSidebar,
});
</script>

<template>
  <header>
    <template v-if="showIcons && !userIsOnBeastPage">
      <icon-filter v-if="!showLeftSidebar" @click="toggleLeftSidebar(true)" />
      <icon-close v-else @click="toggleLeftSidebar(false)" />
    </template>

    <router-link
      :disabled="!userIsOnBeastPage"
      :aria-disabled="!userIsOnBeastPage"
      :to="{ name: 'BeastList' }"
    >
      Wild Shape
    </router-link>

    <template v-if="showIcons && !userIsOnBeastPage">
      <icon-options v-if="!showRightSidebar" @click="toggleRightSidebar(true)" />
      <icon-close v-else @click="toggleRightSidebar(false)" />
    </template>
  </header>

  <main
    :class="{
      'main-file--has-sidebar-left': showFiltersSidebar,
      'main-file--has-sidebar-right': showOptionsSidebar,
      'main-file--hide-sidebars': userIsOnBeastPage,
    }"
  >
    <RouterView />
  </main>

  <filters-sidebar
    :show="showFiltersSidebar"
    @update:show="(val) => (showLeftSidebar = val)"
  />

  <options-sidebar
    :show="showOptionsSidebar"
    @update:show="(val) => (showRightSidebar = val)"
  />
</template>

<style scoped lang="scss">
header {
  height: 56px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0px 2px rgba(0, 0, 0, 0.9) !important;
  background-color: #18181b;
  padding: 12px;
  color: var(--color-text);
  z-index: 8;
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 10px;

  & > svg {
    cursor: pointer;
  }

  & > a {
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    font-size: 24px;
    font-weight: 600;

    &[disabled='true'] {
      cursor: default;
    }
  }
}

main {
  min-height: calc(100vh - 56px);
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

.main-file {
  &--hide-sidebars ~ .sidebar {
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
