<template>
  <router-link
    :to="{ name: 'BeastInfo', params: { beastName: beastLink } }"
    class="beast-list-item"
  >
    <div class="beast-list-item__row">
      <div>{{ beast.name }}</div>
      <div>CR: {{ beast.challenge }}</div>
    </div>
    <div class="beast-list-item__row">
      <div>HP: {{ beast.hitPoints }}</div>
      <div>AC: {{ beast.armorClass }}</div>
      <div>Move: {{ moveTypes }}</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { IBeast } from '@/types/IBeast';

import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import getNameLink from '@/utils/getNameLink';

const props = defineProps<{
  beast: IBeast;
}>();

const moveTypes = computed(() => {
  return props.beast.speed.map((item) => item.name).join(', ');
});

const beastLink = computed(() => {
  return getNameLink(props.beast.name);
});
</script>

<style scoped lang="scss">
.beast-list-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 1 460px;
  background-color: #262626;
  text-decoration: none;
  border-radius: 4px;
  padding: 12px;
  color: #fff;
  border: 1px solid transparent;
  transition: border-color ease-in-out 0.36s;

  &:hover {
    border-color: rgb(159 168 218 / 60%);
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex: 1 1;
    gap: 14px;

    & > div {
      display: flex;
      flex: 1 1;
    }

    &:first-child {
      & > div:last-child {
        flex: 0 1;
        white-space: nowrap;
      }
    }

    &:last-child {
      & > div {
        &:nth-child(-n + 2) {
          flex: 0 1;
          white-space: nowrap;
        }

        &:last-child {
          justify-content: flex-end;
        }
      }
    }
  }
}

@media (max-width: 820px) {
  .beast-list-item {
    flex: 0 1 360px;
  }
}

@media (max-width: 420px) {
  .beast-list-item {
    flex-grow: 1;
  }
}
</style>
