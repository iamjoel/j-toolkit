import { onMounted, reactive, ref, Ref } from 'vue'
export interface Params {
  url: string
  searchConditions: Record<string, any>
}

interface Return<T> {
  searchConditions: Record<string, any>
  resetConditions: () => void
  pagination: Record<string, any>
  fetchList: (isReset: boolean) => void
  list: Ref<T[]>
}

function useList<T extends Record<string, any>> ({
  url,
  searchConditions: initCondition
}: Params): Return<T> {
  const list = ref<T[]>([]) as Ref<T[]>
  const searchConditions = reactive({...initCondition})
  const pagination = reactive({
    pageSize: 10
  })
  const fetchList = (isReset: boolean = false): void => {
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
        content: 'ccc'
      },
      {
        id: 3,
        name: 'bb2',
        content: 'ccc'
      }
    ] as any

    if (Math.random() > 0.5) {
      list.value = []
    }
  }

  const resetConditions = () => {
    Object.keys(initCondition).forEach(key => {
      searchConditions[key] = initCondition[key]
    })

    fetchList(true)
  } 

  onMounted(() => {
    fetchList()
  })

  return {
    searchConditions,
    resetConditions,
    pagination,
    fetchList,
    list
  }
}

export default useList
