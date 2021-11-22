import low from 'lowdb'
import getDB, { getId } from "../../utils/db"

type StringValue = {
  id: number,
  value: string
}
export interface DBStruct {
  data: Info[]
  classifyList: StringValue[],
  tagList: StringValue[]
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
  }: Info) :number{
    try {
      const db = this.db

      const isNameExist = db.get('data').some((item: Info) => item.name === name).value()
      if(isNameExist) {
        throw `name: ${name} exist!`
      }
      const id = getId(db, 'data')
      const data = {
        id,
        classify,
        tag,
        name,
        ...restInfo
      }

      if(classify) {
        const isNew = !db.get('classifyList').value().map(item => item.value).includes(classify)
        if(isNew) {
          db.get('classifyList').push({
            id: getId(db, 'classifyList'),
            value: classify
          }).write()
        }
      } else {
        delete data.classify
      }
  
      if(tag.length > 0) {
        tag.forEach(t => {
          const isNew = !db.get('tagList').value().map(item => item.value).includes(t)
          if(isNew) {
            db.get('tagList').push({
              id: getId(db, 'tagList'),
              value: t
            }).write()
          }
        })
      } else {
        delete data.tag
      }
  
      db.get('data').push(data).write()

      return id
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

  classifyList(): StringValue[] {
    return this.db.get('classifyList').value()
  }

  tagList(): StringValue[] {
    return this.db.get('tagList').value()
  }
}

export default InfoService 