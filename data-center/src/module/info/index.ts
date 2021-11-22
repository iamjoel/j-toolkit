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

interface QueryParam {
  name: string,
  classify: string,
  tag: string
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
  }: Info) :string{
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

  list ({
    name,
    classify,
    tag,
  }: Partial<QueryParam> ={}): Info[] {
    const res =  this.db.get('data').filter((item: Info)=> {
      if(
        (name ? item.name.includes(name) : true) &&
        (classify ? item.classify?.includes(classify) : true) &&
        (tag ? item.tag?.some(t => t.includes(tag)): true)
      ) {
        return true
      }
      return false
    }).value()
    return res
  }
}

export default InfoService 