import path from 'path'
import low from 'lowdb' // 2.x 的 db 有 ts 的问题。
import FileSync from 'lowdb/adapters/FileSync.js'
import fs from 'fs-extra'
import appRoot from 'app-root-path' // 保证路径总是在

const MODULE_PATH = path.join(appRoot.path , './src/module')

const getDB = <T>(name: string, defaultValue: T): low.LowdbSync<T> => {
  if(['info'].includes(name)) {
    const isTest = global.__test__ // Jest 做单元测试中注入的
    const dbPath = `${MODULE_PATH}/${name}/db/${!isTest ? 'db' : 'db-test'}.json`
    fs.ensureFileSync(dbPath) // 确保文件一定存在
    const db = low(new FileSync(dbPath))
    db.defaults(defaultValue).write()
    return db
  }
  throw `no support name: ${name}`
}

export default getDB