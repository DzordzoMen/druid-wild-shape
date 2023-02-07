<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside, useBreakpoints, usePointerSwipe } from '@vueuse/core';
import { SwipeDirection } from '@vueuse/core';

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
});

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

const sidebarRef = ref<HTMLElement | null>(null);

const transitionName = computed(() => {
  const { left, right } = props;

  if (left) return 'left';
  if (right) return 'right';

  return 'left';
});

const containerWidth = computed(() => sidebarRef.value?.offsetWidth ?? 0);

onClickOutside(sidebarRef, () => {
  if (breakpoints.smallerOrEqual('tablet').value) emit('update:show', false);
});

const { distanceX } = usePointerSwipe(sidebarRef, {
  onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
    if (props.left && distanceX.value < 0) return;
    if (props.right && distanceX.value > 0) return;
    if (breakpoints.greaterOrEqual('desktop').value) return;

    if (props.show && Math.abs(distanceX.value) / containerWidth.value >= 0.5) {
      if (
        (props.left && direction === SwipeDirection.LEFT) ||
        (props.right && direction === SwipeDirection.RIGHT)
      ) {
        emit('update:show', false);
      }
    }
  },
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
      <div class="sidebar__panel">
        <slot />
      </div>
      <div class="sidebar__overlay" @click="emit('update:show', false)" />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 56px;
  height: calc(100vh - 56px);
  width: 100vw;
  z-index: 6;

  &__overlay {
    width: inherit;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.04);
    z-index: -1;

    animation-duration: 0.3s;
    animation-name: overlay-enter;
    animation-delay: 0.4s;
    animation-fill-mode: backwards;
  }

  &__panel {
    width: 240px;
    height: 100%;
    background-color: #262626;
    padding: 12px;
  }

  &--left {
    left: 0;

    & > .sidebar__panel {
      box-shadow: 1px 0 4px rgba(0, 0, 0, 0.9), 0 0px 4px rgba(0, 0, 0, 0.9);
      margin-right: auto;
    }
  }

  &--right {
    right: 0;
    & > .sidebar__panel {
      box-shadow: -1px 0 4px rgba(0, 0, 0, 0.9), 0 0px 4px rgba(0, 0, 0, 0.9);
      margin-left: auto;
    }
  }

  @media (min-width: 640px) {
    & {
      width: 240px;
    }
  }
}

.left {
  &-enter-active,
  &-leave-active {
    transition: all 0.46s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);
  }
}

.right {
  &-enter-active,
  &-leave-active {
    transition: all 0.46s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
  }
}

@keyframes overlay-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
