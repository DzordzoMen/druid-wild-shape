<template>
  <common-sidebar v-bind="$attrs" right>
    <div class="sidebar-content">
      <common-input id="druid-level" placeholder="0" type="number">
        <template #label>Druid level</template>
      </common-input>

      <common-checkbox id="moon-druid">
        <template #label>Moon druid</template>
      </common-checkbox>
    </div>
  </common-sidebar>
</template>

<script setup lang="ts">
import CommonSidebar from './CommonSidebar.vue';
import CommonInput from './CommonInput.vue';
import CommonCheckbox from './CommonCheckbox.vue';
</script>

<style scoped lang="scss">
.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
