<template>
  <div class="beast-info">
    <template v-if="beastInfo">
      <div class="beast-info__name">
        <h1>{{ beastInfo?.name }}</h1>
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
            <li v-if="beastEnvironments">
              <b>Environments</b>
              {{ beastEnvironments }}
            </li>
            <li>
              <b>Challenge</b>
              {{ beastInfo?.challenge }}
            </li>
          </ul>
        </div>

        <div class="beast-info-details-item">
          <div class="beast-info-details-item__title">Skills</div>
          <div class="beast-info-details-item__content">
            <ul>
              <li v-if="hasDamageVulnerabilities">
                <b
                  v-tooltip="{
                    content: getBeastTooltip('damageVulnerabilities'),
                    triggers: tooltipTriggers,
                    disabled: false,
                    html: true,
                  }"
                  tabindex="0"
                >
                  Damage Vulnerabilities
                </b>
                {{ beastInfo?.damageVulnerabilities?.join(', ') }}
              </li>
              <li v-if="hasDamageResistances">
                <b
                  v-tooltip="{
                    content: getBeastTooltip('damageResistances'),
                    triggers: tooltipTriggers,
                    disabled: false,
                    html: true,
                  }"
                  tabindex="0"
                >
                  Damage Resistances
                </b>
                {{ beastInfo?.damageResistances?.join(', ') }}
              </li>
              <li v-if="hasDamageImmunities">
                <b>Damage Immunities</b>
                {{ beastInfo?.damageImmunities?.join(', ') }}
              </li>
              <li v-if="hasConditionImmunities">
                <b>Condition Immunities</b>
                {{ beastInfo?.conditionImmunities?.join(', ') }}
              </li>

              <li v-for="(skill, index) in beastInfo?.skills" :key="index">
                <b
                  v-tooltip="{
                    content: getSensesTooltip(skill.name),
                    triggers: tooltipTriggers,
                    disabled: !hasSensesTooltip(skill.name),
                    html: true,
                  }"
                  :tabindex="hasSensesTooltip(skill.name) ? 0 : -1"
                  :aria-disabled="!hasSensesTooltip(skill.name)"
                >
                  {{ skill.name }}
                </b>
                {{ skill?.value }}
              </li>

              <li v-if="hasLanguages">
                <b>Languages</b>
                {{ beastInfo?.languages?.join(', ') }}
              </li>

              <li>
                <b>Passive perception</b>
                {{ beastInfo?.passivePerception }}
              </li>
            </ul>
          </div>
        </div>

        <div class="beast-info-details-item" v-if="beastInfo?.traits?.length">
          <div class="beast-info-details-item__title">Traits</div>
          <div class="beast-info-details-item__content">
            <ul>
              <li v-for="(trait, index) in beastInfo?.traits" :key="index">
                <b>{{ trait?.name }}</b>
                {{ trait?.description }}
              </li>
            </ul>
          </div>
        </div>

        <div class="beast-info-details-item" v-if="beastInfo?.actions?.length">
          <div class="beast-info-details-item__title">Actions</div>
          <div class="beast-info-details-item__content">
            <ul>
              <li v-for="(action, index) in beastInfo?.actions" :key="index">
                <b>{{ action?.name }}</b>
                {{ action?.description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <div class="beast-info__cant-find" v-else>
      <icon-otter :height="96" :width="96" />
      Oops, we can't find this beast

      <router-link :to="{ name: 'BeastList' }">See all beasts</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import sensesInfo from '@/assets/senses-info.json';
import tooltipsInfo from '@/assets/beast-tooltips.json';

import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useBeastsStore } from '@/stores/beasts';
import type { IBeast } from '@/types/IBeast';
import { Alignment } from '@/types/enums/Alignment';

import BeastAbilityItem from '@/components/BeastInfoAbilityItem.vue';
import IconOtter from '@/components/icons/IconOtter.vue';

type AbilityItem = {
  name: string;
  baseValue: number;
};

type TooltipInfo = {
  name: string;
  text: string;
};

const sensesTooltips = sensesInfo as TooltipInfo[];

const beastTooltips = tooltipsInfo as TooltipInfo[];

const route = useRoute();

const beastModule = useBeastsStore();

const tooltipTriggers: string[] = ['hover', 'click', 'focus', 'touch'];

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

const beastEnvironments = computed((): string | null => {
  return beastInfo.value?.environment?.join(', ') ?? null;
});

const beastSpeed = computed((): string | null => {
  return (
    beastInfo.value?.speed
      ?.map(({ name, valueInFt }) => `${name} ${valueInFt} ft.`)
      ?.join(', ') ?? null
  );
});

const hasDamageVulnerabilities = computed((): boolean => {
  return !!beastInfo?.value?.damageVulnerabilities?.length || false;
});

const hasDamageResistances = computed((): boolean => {
  return !!beastInfo?.value?.damageResistances?.length || false;
});

const hasDamageImmunities = computed((): boolean => {
  return !!beastInfo?.value?.damageImmunities?.length || false;
});

const hasConditionImmunities = computed((): boolean => {
  return !!beastInfo?.value?.conditionImmunities?.length || false;
});

const hasLanguages = computed((): boolean => {
  return !!beastInfo?.value?.languages?.length || false;
});

useTitle(`${beastInfo?.value?.name || 'Oops'} | D&D 5 - Druid wild shape`);

onMounted(() => {
  document.querySelector('main')?.scrollTo({ top: 0, left: 0 });
});

function getSensesTooltip(senseName: string): string | undefined {
  const senseTooltip = sensesTooltips?.find(
    (sense) => sense.name.toLowerCase() === senseName?.toLowerCase()
  );

  return senseTooltip?.text ?? undefined;
}

function hasSensesTooltip(senseName: string): boolean {
  return !!getSensesTooltip(senseName);
}

function getBeastTooltip(tooltipName: string): string | undefined {
  const beastTooltip = beastTooltips?.find(
    (sense) => sense.name.toLowerCase() === tooltipName?.toLowerCase()
  );

  return beastTooltip?.text ?? undefined;
}
</script>

<style scoped lang="scss">
.beast-info {
  max-width: 1020px;
  margin: auto;
  color: var(--color-text);
  display: grid;
  gap: 20px;
  grid-template-columns: auto 80px;

  &__name {
    padding: 12px;
    border-radius: 8px;
    grid-row: 1 / 2;
    background-color: #262626;
    display: flex;
    flex-direction: column;

    & > div {
      font-size: 14px;

      &:nth-child(3) {
        padding-top: 14px;
      }
    }

    & > h1 {
      font-size: 20px;
      font-weight: 600;
    }
  }

  &__abilities {
    grid-column: 2;
    grid-row: 1 / 4;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
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
      padding: 12px 4px 0 12px;
      width: fit-content;
      border-bottom-right-radius: 4px 2px;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid var(--color-text);
    }

    &__content {
      padding: 12px;

      & b {
        font-weight: 600;

        &.v-popper--has-tooltip:not([aria-disabled='true']) {
          cursor: pointer;
          border-bottom: 3px solid var(--primary-color);
        }

        &::after {
          content: ':';
        }
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

  &__cant-find {
    grid-column: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px - 24px);
    width: 100%;
    color: var(--color-text);
    flex-direction: column;
    font-size: 20px;
    text-align: center;
    padding: 40px;
    gap: 12px;

    & > a {
      color: var(--color-text);
      text-decoration: none;
      border-bottom: 2px solid var(--primary-color);
    }
  }
}
</style>
