import getDB from "./get-db"

describe('get db', () => {
  test('set default value', async () => {
    const db = await getDB('info')
    expect(db.get('infoList').value()).toEqual([])
  })
})