<template>
  <common-sidebar v-bind="$attrs" right>
    <div class="sidebar-content">
      <common-input id="test" placeholder="0" type="number">
        <template #label>Test</template>
      </common-input>

      <common-checkbox id="tt">
        <template #label>Test checkbox</template>
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
  gap: 10px;
}
</style>
