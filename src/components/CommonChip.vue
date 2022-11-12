<template>
  <div
    class="common-chip"
    :class="{ 'common-chip--selected': selected }"
    tabindex="0"
    @keypress="clickHandler()"
    @click="clickHandler()"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const selected = ref(false);

const emit = defineEmits<{
  (e: 'selected', value: boolean): void;
}>();

function clickHandler(): void {
  selected.value = !selected.value;
  emit('selected', selected.value);
}
</script>

<style scoped lang="scss">
.common-chip {
  border-radius: 4px;
  padding: 8px 12px;
  flex: 0 1 auto;
  width: fit-content;
  font-size: 14px;
  font-weight: 400;
  font-family: Arial, sans-serif;
  background-color: rgba($color: #fff, $alpha: 0.12);
  transition: all ease-in-out 0.2s;
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: #9fa8da;
  }

  &--selected {
    background-color: #9fa8da;
    color: #262626;

    &:hover,
    &:focus-visible {
      border-color: rgba($color: #fff, $alpha: 0.7);
    }
  }
}
</style>
