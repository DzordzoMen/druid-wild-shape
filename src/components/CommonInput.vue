<template>
  <div class="common-input common-input__wrapper">
    <label :for="id">
      <slot name="label" />
    </label>
    <input
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :id="id"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val: string | number | null) => {
    emit('update:modelValue', val);
  },
});
</script>

<style lang="scss" scoped>
.common-input {
  color: #fff;
  background-color: inherit;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  & > label {
    color: inherit;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
  }

  & > input {
    color: inherit;
    background-color: inherit;
    border: 1px solid rgba($color: #fff, $alpha: 0.3);
    border-radius: 4px;
    font-size: 1rem;
    padding: 8px 12px;
    transition: all ease-in 0.2s;

    &:focus,
    &:hover {
      border-color: var(--primary-color);
      outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
    }
  }
}
</style>
