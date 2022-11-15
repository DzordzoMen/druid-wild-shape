<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
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

const transitionName = computed(() => {
  const { left, right } = props;

  if (left) return 'left';
  if (right) return 'right';

  return 'left';
});
</script>

<template>
  <Transition :name="transitionName">
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
  </Transition>
</template>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  top: 56px;
  height: calc(100vh - 56px);
  width: 240px;
  background-color: #262626;
  z-index: 6; // on mobile device
  padding: 12px;

  &--left {
    left: 0;
  }

  &--right {
    right: 0;
  }
}

.left {
  &-enter-active,
  &-leave-active {
    transition: all 0.46s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-240px);
  }
}

.right {
  &-enter-active,
  &-leave-active {
    transition: all 0.46s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(240px);
  }
}
</style>
