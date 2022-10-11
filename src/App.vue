<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header></header>

  <div class="sidebar sidebar--left"></div>
  <div class="sidebar sidebar--right"></div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
header {
  height: 56px;
  box-shadow: 0 1px 2px var(rgba(0, 0, 0, 0.9)),
    0 0px 2px var(rgba(0, 0, 0, 0.9)) !important;
  background-color: #18181b;
}

main {
  height: calc(100vh - 56px);
}

.sidebar {
  position: absolute;
  top: 56px;
  height: calc(100vh - 56px);
  width: 240px;

  &--left {
    left: 0;
  }

  &--right {
    right: 0;
  }
}
</style>
