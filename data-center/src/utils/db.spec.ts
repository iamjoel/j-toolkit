import getDB from "./db"
import { DBStruct, defaultValue } from '../module/info' 
const db = getDB<DBStruct>('info', defaultValue)

describe('get db', () => {
  afterEach(() => {
    db.set('data', [])
    db.set('classifyList', [])
    db.set('tagList', [])
  })
  test('set default value', () => {
    expect(db.get('infoList').value()).toEqual([])
    expect(db.get('classifyList').value()).toEqual([])
    expect(db.get('tagList').value()).toEqual([])
  })
})