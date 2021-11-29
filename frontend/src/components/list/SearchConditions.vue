<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import {  NForm, NFormItem, NInput, NSpace, NButton, NSelect } from 'naive-ui'
interface Item {
  key: string
  name: string
  type?: 'input' | 'select',
  multiple?: boolean
  options?: {
    label: string
    value: string | number
  }[]
}
interface Props {
  data: Record<string, any>
  list: Item[]
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'search'): void
  (e: 'reset'): void
}>()
</script>

<template>
<div class="search-conditions">
  <n-form
    inline
    v-model:value="data"
  >
    <n-form-item 
      v-for="item in list"
      :key="item.key"
      :label="item.name"
      class="form-item"
    >
      <n-input
        v-if="!item.type || item.type === 'input'"
        v-model:value="data[item.key]"
        :placeholder="'请输入' + item.name"
      />

      <n-select
        v-if="item.type === 'select'"
        v-model:value="data[item.key]"
        placeholder="请选择"
        clearable
        :options="(item.options || []) as any"
        :multiple="item.multiple"
      />
    </n-form-item>
  </n-form>
  <div class="btn-wrap">
    <n-space>
      <n-button type="primary" @click="emit('search')">搜索</n-button>
      <n-button type="default" @click="emit('reset')">重置</n-button>
    </n-space>
  </div>
</div>
</template>

<style scoped>
/* 覆盖默认样式 */
.n-form.n-form--inline .form-item {
  width: 200px ;
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>