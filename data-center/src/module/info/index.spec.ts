import InfoService from './'
const service = new InfoService()
const db = service.db
resetData()

describe('info', () => {
  afterEach(resetData)

  test('create', () => {
    const normalItem = {name: 'address', content: '江苏省苏州市...'}
    let res = service.create(normalItem)
    expect(db.get('data').value()[0]).toEqual({name: 'address', content: '江苏省苏州市...'})
    expect(res).toBe('address')

    const hasTagAndAddressItem = {name: 'address2', content: '江苏省苏州市...', tag: ['公司'], classify: '常用'}
    res = service.create(hasTagAndAddressItem)
    expect(db.get('data').value()[1]).toEqual({name: 'address2', content: '江苏省苏州市...', tag: ['公司'], classify: '常用'})
    expect(res).toBe('address2')
    expect(db.get('classifyList').value()).toEqual(['常用'])
    expect(db.get('tagList').value()).toEqual(['公司'])

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
        name: 'a',
        content: 'a content'
      },
      {
        name: 'a1',
        content: 'a1 content'
      },
      {
        name: 'b',
        content: 'b content',
        classify: 'common'
      },
      {
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
        name: 'a',
        content: 'a content'
      },
      {
        name: 'a1',
        content: 'a1 content'
      }
    ])

    expect(service.list({
      classify: 'co'
    })).toEqual([
      {
        name: 'b',
        content: 'b content',
        classify: 'common'
      },
      {
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
        name: 'b',
        content: 'b content',
        classify: 'common'
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