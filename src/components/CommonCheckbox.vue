<template>
  <div class="common-checkbox common-checkbox__wrapper">
    <div class="common-checkbox__box">
      <input v-model="value" v-bind="$attrs" type="checkbox" :name="id" :id="id" />

      <div class="common-checkbox__box-element" @click="value = !value" />
    </div>
    <label :for="id">
      <slot name="label" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val);
  },
});
</script>

<style scoped lang="scss">
.common-checkbox {
  color: var(--color-text);
  background-color: inherit;

  &__wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 6px;
  }

  &__box {
    & > input {
      display: none;

      &:checked {
        & ~ .common-checkbox__box-element {
          border-color: var(--primary-color);
          background-color: var(--primary-color);

          &::after {
            content: '';
          }
        }
      }

      &:hover,
      &:focus-visible {
        & ~ .common-checkbox__box-element {
          border-color: var(--primary-color);
        }
      }
    }

    & > &-element {
      height: 14px;
      width: 14px;
      position: relative;
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: content-box;
      transition: all ease-in-out 0.2s;
      border: 2px solid rgba($color: #fff, $alpha: 0.3);

      &::after {
        position: absolute;
        content: none;
        width: 6px;
        height: 10px;
        transform: rotate(45deg);
        transform-origin: 70% 45%;
        border-bottom: 2px solid var(--color-text);
        border-right: 2px solid var(--color-text);
      }
    }
  }

  & > label {
    color: inherit;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    font-family: Arial, sans-serif;
  }
}
</style>
