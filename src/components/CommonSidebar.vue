<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
  left: {
    type: Boolean,
    required: false,
    default: false,
  },
  right: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div
    class="sidebar"
    v-show="show"
    :class="{
      'sidebar--left': left,
      'sidebar--right': right,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  top: 56px;
  height: calc(100vh - 56px);
  width: 240px;
  background-color: #262626;
  padding: 12px;

  &--left {
    left: 0;
  }

  &--right {
    right: 0;
  }
}
</style>
