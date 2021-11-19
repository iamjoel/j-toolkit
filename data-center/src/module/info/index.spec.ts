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
})

function resetData () {
  db.set('data', [])
  .set('classifyList', [])
  .set('tagList', [])
  .write()
}