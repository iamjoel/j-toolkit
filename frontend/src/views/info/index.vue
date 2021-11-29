<script setup lang="ts">
import { h } from 'vue'
// https://www.naiveui.com/zh-CN/os-theme/components/data-table#ajax-usage
import { NDataTable, NSpace, NTag, NButton, NPopconfirm } from 'naive-ui'
import SearchCondition from '@/components/list/SearchConditions.vue'
import useList from '@/hooks/list'
import { Info } from './info'

const {
  searchConditions,
  resetConditions,
  pagination,
  fetchList,
  list,
  isLoading,
  getKey
} = useList<Info>({
  url: '/info/list',
  searchConditions: {
    name: '',
    content: '',
    classify: null,
    tag: []
  }
})

const onConfirmDelete = (id: number) => {
  console.log(`delete ${id}`)
}

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
    },
    {
      title: '操作',
      key: 'action',
      render(row: Info) {
        const editBtn = h(NButton, {
          type: 'primary',
          onClick: () => {
            console.log(row.name)
          }
        }, '编辑')

        
        const deleteBtn = h(
          NPopconfirm,
          {
            onPositiveClick: "onConfirmDelete(item.id)"
          },
          [
            h('template', {
              slot: 'trigger'
            }, h(NButton, {
              type: 'error',
            }, '删除')),
            h('template', {
              slot: 'default'
            }, '确定删除？')
          ]
          
        )
        return h(NSpace, [editBtn, deleteBtn])
      }
    }
  ]
}

</script>

<template>
  <n-space vertical>
    <SearchCondition
      :data="searchConditions"
      :list="[
        {
          key: 'name',
          name: '名称'
        },
        {
          key: 'content',
          name: '内容'
        },
        {
          key: 'classify',
          name: '分类',
          type: 'select',
          options: [
            {
              label: '分类1',
              value: 1
            },
            {
              label: '分类2',
              value: 2
            },
          ]
        },
        {
          key: 'tag',
          name: '标签',
          type: 'select',
          multiple: true,
          options: [
            {
              label: '标签1',
              value: 1
            },
            {
              label: '标签2',
              value: 2
            },
          ]
        }
      ]"
      @search="fetchList(true)"
      @reset="resetConditions"
    />
    
    <n-data-table
      :columns="createColumns()"
      :row-key="getKey"
      :data="list"
      :loading="isLoading"
      :pagination="pagination"
    />
  </n-space>
</template>