<template>
  <div class="beast-info">
    <div class="beast-info__name">
      <div>{{ beastInfo?.name }}</div>
      <div>{{ beastSizeAndAlignment }}</div>
      <div v-if="beastDescription">{{ beastDescription }}</div>
    </div>

    <div class="beast-info__abilities">
      <beast-ability-item
        v-for="(ability, index) in beastAbilities"
        :key="index"
        :name="ability.name"
        :value="ability.baseValue"
      />
    </div>

    <div class="beast-info__details">
      <div class="beast-info-details-item beast-info-details-item__content">
        <ul>
          <li>
            <b>Armor class</b>
            {{ beastInfo?.armorClass }}
          </li>
          <li>
            <b>Hit points</b>
            {{ beastInfo?.hitPoints }}
            ({{ beastInfo?.hitPointsInfo }})
          </li>
          <li>
            <b>Speed</b>
            {{ beastSpeed }}
          </li>
        </ul>
      </div>
      {{ beastInfo }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBeastsStore } from '@/stores/beasts';
import type { IBeast } from '@/types/IBeast';
import { Alignment } from '@/types/enums/Alignment';

import BeastAbilityItem from '@/components/BeastInfoAbilityItem.vue';

type AbilityItem = {
  name: string;
  baseValue: number;
};

const route = useRoute();
const beastModule = useBeastsStore();

const beastName: string = route.params.beastName as string;

const beastInfo = computed((): IBeast | undefined => {
  return beastModule.getBeastDataByName(beastName);
});

const beastSizeAndAlignment = computed((): string => {
  const alignment = beastInfo?.value?.alignment as Alignment;
  const index = Object.keys(Alignment).indexOf(alignment);
  const beastAlignment = Object.values(Alignment)[index];

  return [beastInfo?.value?.size, beastAlignment].join(', ');
});

const beastAbilities = computed((): AbilityItem[] => {
  const abilities = beastInfo?.value?.abilities ?? [];

  return Object.entries(abilities).map(([key, value]) => ({
    name: key,
    baseValue: value,
  }));
});

const beastDescription = computed((): string | undefined => {
  return beastInfo?.value?.description ?? undefined;
});

const beastSpeed = computed((): string | null => {
  return (
    beastInfo.value?.speed
      ?.map(({ name, valueInFt }) => `${name} ${valueInFt} ft.`)
      ?.join(', ') ?? null
  );
});
</script>

<style scoped lang="scss">
.beast-info {
  max-width: 1020px;
  margin: auto;
  color: #fff;
  display: grid;
  gap: 20px;
  grid-template-columns: auto 80px;

  &__name {
    padding: 12px;
    border-radius: 8px;
    background-color: #262626;
    display: flex;
    flex-direction: column;

    & > div {
      font-size: 14px;

      &:first-child {
        font-size: 20px;
        font-weight: 600;
      }

      &:nth-child(3) {
        padding-top: 14px;
      }
    }
  }

  &__abilities {
    grid-column: 2;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-details-item {
    border-radius: 8px;
    background-color: #262626;

    &__title {
      padding-top: 12px;
      width: fit-content;
      border-bottom: 2px solid #fff;
    }

    &__content {
      padding: 12px;

      & b {
        font-weight: 600;
      }

      & ul {
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    }
  }
}
</style>
