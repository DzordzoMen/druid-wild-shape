<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import CommonSidebar from './components/CommonSidebar.vue';
import OptionsSidebar from './components/TheOptionsSidebar.vue';

const showLeftSidebar = ref(false);
const showRightSidebar = ref(true);

function test(): void {
  showLeftSidebar.value = !showLeftSidebar.value;
}
</script>

<template>
  <header>
    <button @click="test()">Left</button>
    <button @click="showRightSidebar = !showRightSidebar">Right</button>
  </header>

  <common-sidebar :show="showLeftSidebar" left />
  <options-sidebar :show="showRightSidebar" />

  <main
    :class="{
      'main-file--has-sidebar-left': showLeftSidebar,
      'main-file--has-sidebar-right': showRightSidebar,
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
  z-index: 1;
}

main {
  height: calc(100vh - 56px);
  padding: 12px;
  overflow-y: auto;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    margin-left 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    margin-right 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  &::-webkit-scrollbar {
    display: none;
  }
}

.main-file {
  &--has-sidebar-left {
    margin-left: 240px;
  }

  &--has-sidebar-right {
    margin-right: 240px;
  }
}
</style>
