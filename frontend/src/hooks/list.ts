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
  isLoading: Ref<boolean>
  getKey: (item: T) => string | number
}

function useList<T extends Record<string, any>> ({
  url,
  searchConditions: initCondition
}: Params): Return<T> {
  const searchConditions = reactive({...initCondition})
  const pagination = reactive({
    pageSize: 10
  })
  const list = ref<T[]>([]) as Ref<T[]>
  const isLoading = ref(false) as Ref<boolean>
  const fetchList = (isReset: boolean = false): void => {
    isLoading.value = true
    console.log(`搜索列表: ${url}, 条件：${JSON.stringify(searchConditions)}`)
    setTimeout(() => {
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

      isLoading.value = false
    }, 100)
  }

  const resetConditions = () => {
    Object.keys(initCondition).forEach(key => {
      searchConditions[key] = initCondition[key]
    })

    fetchList(true)
  }

  const getKey = (item: T) => item.id

  onMounted(() => {
    fetchList()
  })

  return {
    searchConditions,
    resetConditions,
    pagination,
    fetchList,
    list,
    isLoading,
    getKey
  }
}

export default useList
