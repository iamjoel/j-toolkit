import { onMounted, reactive, ref } from 'vue'
export interface Params {
  url: string
  searchConditions: Record<string, any>
}

function useList<T extends Record<string, any>>({
  url,
  searchConditions: initCondition
}: Params) {
  const list = ref<T[]>([])
  const searchConditions = reactive(initCondition)
  const pagination = reactive({
    pageSize: 10
  })
  const fetchList = (isReset: boolean = false) => {
    console.log(`搜索列表: ${url}, 条件：${JSON.stringify(searchConditions)}`)
    list.value = [
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
        id: 2,
        name: 'bb',
        content: 'ccc',
      },
      {
        id: 3,
        name: 'bb2',
        content: 'ccc',
      },
    ] as any

    if(Math.random() > .5) {
      list.value = []
    }
  }

  onMounted(() => {
    fetchList()
  })

    return {
    searchConditions,
    pagination,
    fetchList,
    list,
  }
}

export default useList