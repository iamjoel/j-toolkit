<script setup lang="ts">
import { h, reactive } from 'vue'
// https://www.naiveui.com/zh-CN/os-theme/components/data-table#ajax-usage
import { NDataTable, NForm, NFormItem, NInput, NSpace, NTag, NButton } from 'naive-ui'
import { Info } from './info'

const searchConditions = reactive({
  name: '',
  content: ''
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

const pagination = {
  pageSize: 10
}

const list: Info[] = [
  {
    id: 1,
    name: 'n',
    content: 't',
    classify: {
      id: 1,
      name: 'cn'
    },
    tags: [
      {
        id: 1,
        name: 't1'
      },
      {
        id: 2,
        name: 't2'
      },
      {
        id: 3,
        name: 't3'
      },
      {
        id: 4,
        name: 't4'
      }
    ]
  },
  {
    id: 1,
    name: 'bb',
    content: 'ccc',
  }
]
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
        <n-button type="primary">搜索</n-button>
        <n-button type="default">重置</n-button>
      </n-space>
    </div>
    <n-data-table
      :columns="createColumns()"
      :row-key="getKey"
      :data="list"
      :pagination="pagination" />
  </n-space>
</template>

<style scoped>
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>