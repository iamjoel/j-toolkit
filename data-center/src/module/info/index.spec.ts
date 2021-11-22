import InfoService, { Info } from './'
const service = new InfoService()
const db = service.db
resetData()

describe('info', () => {
  afterEach(resetData)

  test('create', () => {
    const normalItem = {name: 'address', content: '江苏省苏州市...'}
    let id = service.create(normalItem)
    expect(db.get('data').value()[0]).toEqual({id: 1, name: 'address', content: '江苏省苏州市...', type: 'text'})
    expect(id).toBe(1)

    const hasTagAndAddressItem: Info = {name: 'address2', content: '江苏省苏州市...', tagNames: ['公司'], classifyName: '常用', type: 'link'}
    id = service.create(hasTagAndAddressItem)
    expect(db.get('data').value()[1]).toEqual({
      id: 2, name: 'address2', content: '江苏省苏州市...',
      classifyId: 1,
      tagIds: [1],
      type: 'link'
    })
    expect(id).toBe(2)
    expect(db.get('classifyList').value()[0].name).toBe('常用')
    expect(db.get('tagList').value()[0].name).toBe('公司')

    // name 不能重名
    expect(() => service.create({
      name: 'address', content: '江苏省苏州市...'
    })).toThrow()
  })

  test('list', () => {
    service.create({
      name: 'a',
      content: 'a content'
    })
    service.create({
      name: 'a1',
      content: 'a1 content'
    })
    service.create({
      name: 'b',
      content: 'b content',
      classifyName: 'common'
    })
    service.create({
      name: 'c',
      content: 'c content',
      classifyName: 'common',
      tagNames: ['tag1', 'tag2']
    })

    const allInfo = [
      {
        id: 1,
        name: 'a',
        content: 'a content',
        type: 'text'
      },
      {
        id: 2,
        name: 'a1',
        content: 'a1 content',
        type: 'text'
      },
      {
        id: 3,
        name: 'b',
        content: 'b content',
        classify: {
          id: 1,
          name: 'common'
        },
        type: 'text'
      },
      {
        id: 4,
        name: 'c',
        content: 'c content',
        classify: {
          id: 1,
          name: 'common'
        },
        tags: [
          {
            id: 1,
            name: 'tag1'
          },
          {
            id: 2,
            name: 'tag2'
          },
        ],
        type: 'text'
      }
    ]

    expect(service.list()).toEqual(allInfo)

    expect(service.list({
      name: 'a'
    })).toEqual([allInfo[0],allInfo[1]])

    expect(service.list({
      classifyName: 'co'
    })).toEqual(([allInfo[2],allInfo[3]]))

    expect(service.list({
      tagName: 'tag'
    })).toEqual([allInfo[3]])

    expect(service.list({
      tagName: 'tag3'
    })).toEqual([])

    expect(service.list({
      name: 'b',
      classifyName: 'co'
    })).toEqual([allInfo[2]])
  })

  test('classifyList', () => {
    service.create({
      name: 'a',
      content: 'a',
      classifyName: 'c1'
    })
    service.create({
      name: 'b',
      content: 'a',
      classifyName: 'c2'
    })
    service.create({
      name: 'c',
      content: 'a',
      classifyName: 'c3'
    })

    expect(service.classifyList()).toEqual([
      {
        id: 1,
        name: 'c1'
      },
      {
        id: 2,
        name: 'c2'
      },
      {
        id: 3,
        name: 'c3'
      },
    ])
  })

  test('tagList', () => {
    service.create({
      name: 'a',
      content: 'a',
      tagNames: ['a', 'b', 'c']
    })

    service.create({
      name: 'a1',
      content: 'a',
      tagNames: ['d']
    })

    expect(service.tagList()).toEqual([
      {
        id: 1,
        name: 'a'
      },
      {
        id: 2,
        name: 'b'
      },
      {
        id: 3,
        name: 'c'
      },
      {
        id: 4,
        name: 'd'
      },
    ])
  })
})

function resetData () {
  db.set('data', [])
  .set('classifyList', [])
  .set('tagList', [])
  .write()
}