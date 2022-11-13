<template>
  <div class="common-checkbox common-checkbox__wrapper">
    <div class="common-checkbox__box">
      <input v-bind="$attrs" type="checkbox" :name="id" :id="id" />

      <div class="common-checkbox__box-element" />
    </div>
    <label :for="id">
      <slot name="label" />
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.common-checkbox {
  color: #fff;
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
          border-color: #9fa8da;
          background-color: #9fa8da;

          &::after {
            content: '';
          }
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
        border-bottom: 2px solid #262626;
        border-right: 2px solid #262626;
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
