<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

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

const emit = defineEmits(['update:show']);

const sidebarRef = ref(null);

const transitionName = computed(() => {
  const { left, right } = props;

  if (left) return 'left';
  if (right) return 'right';

  return 'left';
});

onClickOutside(sidebarRef, () => {
  emit('update:show', false);
});
</script>

<template>
  <Transition :name="transitionName">
    <div
      class="sidebar"
      v-show="show"
      ref="sidebarRef"
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
  z-index: 6;
  padding: 12px;

  &--left {
    left: 0;
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.9), 0 0px 4px rgba(0, 0, 0, 0.9);
  }

  &--right {
    right: 0;
    box-shadow: -1px 0 4px rgba(0, 0, 0, 0.9), 0 0px 4px rgba(0, 0, 0, 0.9);
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
