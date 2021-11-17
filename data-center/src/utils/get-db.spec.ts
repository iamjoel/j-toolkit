import getDB from "./get-db"

describe('get db', () => {
  test('set default value', async () => {
    const db = await getDB('info')
    await db.read()
    expect(db.data).toEqual({ // 默认
      infoList: [],
      classifyList: [],
      tagList: [],
    })
  })
})