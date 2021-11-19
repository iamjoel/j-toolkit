import low from 'lowdb'
import getDB from "../../utils/get-db"
export interface DBStruct {
  data: Info[]
  classifyList: string[],
  tagList: string[]
}

export const defaultValue: DBStruct = { // 默认
  data: [],
  classifyList: [],
  tagList: [],
}
export interface Info {
  name: string
  content: string
  classify?: string
  tag?: string[]
  type?: 'string' | 'link'
}

class InfoService {
  db: low.LowdbSync<DBStruct>
  constructor() {
    this.db = getDB<DBStruct>('info', defaultValue)
  }

  create ({
    classify = '',
    tag = [],
    name,
    ...restInfo
  }: Info) {
    try {
      const db = this.db

      const isNameExist = db.get('data').some((item: Info) => item.name === name).value()
      if(isNameExist) {
        throw `name: ${name} exist!`
      }

      const data = {
        classify,
        tag,
        name,
        ...restInfo
      }
      if(classify) {
        const isNew = !db.get('classifyList').includes(classify).value()
        if(isNew) {
          db.get('classifyList').push(classify).write()
        }
      } else {
        delete data.classify
      }
  
      if(tag.length > 0) {
        tag.forEach(t => {
          const isNew = !db.get('tagList').includes(t).value()
          if(isNew) {
            db.get('tagList').push(t).write()
          }
        })
      } else {
        delete data.tag
      }
  
      db.get('data').push(data).write()
      return data.name
    } catch(e) {
      throw e
    }
  }
}

export default InfoService 