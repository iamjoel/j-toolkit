import path from 'path'
import { Low, JSONFile } from 'lowdb'
// import fs from 'fs-extra'
import appRoot from 'app-root-path' // 保证路径总是在

const MODULE_PATH = path.join(appRoot.path , './src/module')

const getDB = async (name: string): Promise<Low> => {
  if(['info'].includes(name)) {
    // const db = new Low(new JSONFile(`${MODULE_PATH}/${name}/db.json`))
    // await db.read()
    // db.data ||= { // 默认
    //   infoList: [],
    //   classifyList: [],
    //   tagList: [],
    // }
    // await db.write()
    console.log(555)
    return
  }
  throw `no support name: ${name}`
}

export default getDB