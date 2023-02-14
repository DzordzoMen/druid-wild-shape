<template>
  <div
    class="common-chip"
    :class="{ 'common-chip--selected': selected }"
    tabindex="0"
    role="button"
    @keypress="$emit('update:selected', !selected)"
    @click="$emit('update:selected', !selected)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
});

defineEmits<{
  (e: 'update:selected', value: boolean): void;
}>();
</script>

<style scoped lang="scss">
.common-chip {
  border-radius: 4px;
  padding: 8px 12px;
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  font-family: Arial, sans-serif;
  background-color: rgba($color: #fff, $alpha: 0.12);
  transition: all ease-in-out 0.2s;
  border: 1px solid transparent;
  color: var(--color-text);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: var(--primary-color);
  }

  &--selected {
    background-color: var(--primary-color);
    color: var(--color-text);

    &:hover,
    &:focus-visible {
      border-color: rgb(159 168 218 / 60%);
    }
  }
}
</style>
