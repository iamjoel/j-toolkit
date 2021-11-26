<script setup lang="ts">
import { h } from 'vue'
// https://www.naiveui.com/zh-CN/os-theme/components/data-table#ajax-usage
import { NDataTable, NForm, NFormItem, NInput, NSpace, NTag, NButton } from 'naive-ui'
import useList from '@/hooks/list'
import { Info } from './info'

const {
  fetchList,
  state,
  searchConditions,
  arr
} = useList<Info>({
  url: '/info/list',
  searchConditions: {
    name: '',
    content: ''
  }
})

const createColumns = () => {
  return [
    {
      title: '名称',
      key: 'name'
    },
    {
      title: '内容',
      key: 'content'
    },
    {
      title: '分类',
      key: 'classify',
      render(row: Info) {
        return h('div', row.classify?.name || '-')
      }
    },
    {
      title: '标签',
      key: 'classify',
      render(row: Info) {
        if(row.tags && row.tags.length > 0) {
          const tagList = row.tags.map((t, i) => {
            return h(NTag as any, {
              type: ['primary', 'info', 'success'][i % 3],
              round: true
            }, t.name)
          })
          return h(NSpace, tagList)
        }
        return h('div', '-')
      }
    }
  ]
}

const getKey = (item: Info) => item.id

</script>

<template>
  <n-space vertical>
    <n-form
      inline
      v-model:value="searchConditions"
    >
      <n-form-item label="名称">
        <n-input v-model:value="searchConditions.name"/>
      </n-form-item>
      <n-form-item label="内容">
        <n-input v-model:value="searchConditions.content"/>
      </n-form-item>
    </n-form>
    <div class="btn-wrap">
      <n-space>
        <n-button type="primary" @click="fetchList(true)">搜索</n-button>
        <n-button type="default">重置</n-button>
      </n-space>
    </div>
    {{arr}}
    <n-data-table
      :columns="createColumns()"
      :row-key="getKey"
      :data="state.list"
      :pagination="state.pagination" />
  </n-space>
</template>

<style scoped>
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>