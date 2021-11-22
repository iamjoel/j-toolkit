import InfoService from './'
const service = new InfoService()
const db = service.db
resetData()

describe('info', () => {
  afterEach(resetData)

  test('create', () => {
    const normalItem = {name: 'address', content: '江苏省苏州市...'}
    let id = service.create(normalItem)
    expect(db.get('data').value()[0]).toEqual({id: 1, name: 'address', content: '江苏省苏州市...'})
    expect(id).toBe(1)

    const hasTagAndAddressItem = {name: 'address2', content: '江苏省苏州市...', tag: ['公司'], classify: '常用'}
    id = service.create(hasTagAndAddressItem)
    expect(db.get('data').value()[1]).toEqual({id: 2, name: 'address2', content: '江苏省苏州市...', tag: ['公司'], classify: '常用'})
    expect(id).toBe(2)
    expect(db.get('classifyList').value()[0].value).toBe('常用')
    expect(db.get('tagList').value()[0].value).toBe('公司')

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
      classify: 'common'
    })
    service.create({
      name: 'c',
      content: 'c content',
      classify: 'common',
      tag: ['tag1', 'tag2']
    })

    expect(service.list()).toEqual([
      {
        id: 1,
        name: 'a',
        content: 'a content'
      },
      {
        id: 2,
        name: 'a1',
        content: 'a1 content'
      },
      {
        id: 3,
        name: 'b',
        content: 'b content',
        classify: 'common'
      },
      {
        id: 4,
        name: 'c',
        content: 'c content',
        classify: 'common',
        tag: ['tag1', 'tag2']
      }
    ])

    expect(service.list({
      name: 'a'
    })).toEqual([
      {
        id: 1,
        name: 'a',
        content: 'a content'
      },
      {
        id: 2,
        name: 'a1',
        content: 'a1 content'
      }
    ])

    expect(service.list({
      classify: 'co'
    })).toEqual([
      {
        id: 3,
        name: 'b',
        content: 'b content',
        classify: 'common'
      },
      {
        id: 4,
        name: 'c',
        content: 'c content',
        classify: 'common',
        tag: ['tag1', 'tag2']
      }
    ])

    expect(service.list({
      tag: 'tag'
    })).toEqual([
      {
        id: 4,
        name: 'c',
        content: 'c content',
        classify: 'common',
        tag: ['tag1', 'tag2']
      }
    ])

    expect(service.list({
      tag: 'tag3'
    })).toEqual([])

    expect(service.list({
      name: 'b',
      classify: 'co'
    })).toEqual([
      {
        id: 3,
        name: 'b',
        content: 'b content',
        classify: 'common'
      },
    ])
  })

  test('classifyList', () => {
    service.create({
      name: 'a',
      content: 'a',
      classify: 'c1'
    })
    service.create({
      name: 'b',
      content: 'a',
      classify: 'c2'
    })
    service.create({
      name: 'c',
      content: 'a',
      classify: 'c3'
    })

    expect(service.classifyList()).toEqual([
      {
        id: 1,
        value: 'c1'
      },
      {
        id: 2,
        value: 'c2'
      },
      {
        id: 3,
        value: 'c3'
      },
    ])
  })

  test('tagList', () => {
    service.create({
      name: 'a',
      content: 'a',
      tag: ['a', 'b', 'c']
    })

    service.create({
      name: 'a1',
      content: 'a',
      tag: ['d']
    })

    expect(service.tagList()).toEqual([
      {
        id: 1,
        value: 'a'
      },
      {
        id: 2,
        value: 'b'
      },
      {
        id: 3,
        value: 'c'
      },
      {
        id: 4,
        value: 'd'
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