import { onMounted, reactive, ref } from 'vue'
export interface Params {
  url: string
  searchConditions: Record<string, any>
}

function useList<T extends Record<string, any>>({
  url,
  searchConditions: initCondition
}: Params) {
  const state = reactive({
    list: [],
    pagination: {
      pageSize: 10
    }
  })
  const searchConditions = reactive(initCondition)
  const arr = ref([])
  const fetchList = (isReset: boolean = false) => {
    console.log(`搜索列表: ${url}, 条件：${searchConditions}`)
    arr.value = [Math.random()]
    state.list = [
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
    ] as any
  }

  onMounted(() => {
    fetchList()
  })

  return {
    fetchList,
    searchConditions,
    state,
    arr
  }
}

export default useList