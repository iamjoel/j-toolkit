import low from 'lowdb'
import getDB, { getId } from "../../utils/db"

type IDName = {
  id: number,
  name: string
}
export interface DBStruct {
  data: Info[]
  classifyList: IDName[],
  tagList: IDName[]
}

export const defaultValue: DBStruct = { // 默认
  data: [],
  classifyList: [],
  tagList: [],
}
export interface Info {
  name: string
  content: string

  classifyId?: number
  classifyName?: string
  classify?: IDName

  tagIds?: number[]
  tagNames?: string[]
  tags?: IDName[]

  type?: 'string' | 'link'
}

interface QueryParam {
  name: string,
  classifyName: string,
  classifyId: number,
  tagName: string,
  tagId: number
}

class InfoService {
  db: low.LowdbSync<DBStruct>
  constructor() {
    this.db = getDB<DBStruct>('info', defaultValue)
  }

  create ({
    classifyName = '',
    tagNames = [],
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
        name,
        ...restInfo
      }

      if(classifyName) {
        let classifyId: number
        const isNew = !db.get('classifyList').value().map(item => item.name).includes(classifyName)
        if(isNew) {
          classifyId = getId(db, 'classifyList')
          db.get('classifyList').push({
            id: classifyId,
            name: classifyName
          }).write()

        } else {
          classifyId = db.get('classifyList').find(item => item.name === classifyName).value().id
        }
        data.classifyId = classifyId
      }
  
      if(tagNames.length > 0) {
        const tagIds: number[] = []

        tagNames.forEach(tagName => {
          let tagId: number
          const isNew = !db.get('tagList').value().map(item => item.name).includes(tagName)
          if(isNew) {
            tagId = getId(db, 'tagList')
            db.get('tagList').push({
              id: tagId,
              name: tagName
            }).write()
          } else {
            tagId = db.get('tagList').find(item => item.name === tagName).value().id
          }

          tagIds.push(tagId)
        })
        data.tagIds = tagIds
      }
  
      db.get('data').push(data).write()

      return id
    } catch(e) {
      throw e
    }
  }

  list ({
    name,
    classifyName,
    classifyId,
    tagName,
    tagId
  }: Partial<QueryParam> ={}): Info[] {
    const allClassifyList: IDName[] = this.classifyList()
    const allTagList: IDName[] = this.tagList()

    const res =  this.db.get('data')
      .filter((item: Info)=> {
        if(
          (name ? item.name.includes(name) : true) &&
          (classifyId ? InfoService.getItemClassify(allClassifyList, item)?.id === classifyId : true) &&
          (classifyName ? InfoService.itemHasClassifyName(allClassifyList, classifyName, item): true) &&
          (tagId ? InfoService.getItemTags(allClassifyList, item).map(item => item.id).includes(tagId) : true) &&
          (tagName ? InfoService.itemHasTagName(allTagList, tagName, item): true)
        ) {
          return true
        }
        return false
      })
      .map(item => {
        const res = {...item}
        if(item.classifyId) {
          res.classify = InfoService.getItemClassify(allClassifyList, item)
        }
        if(item.tagIds && item.tagIds.length > 0) {
          res.tags = InfoService.getItemTags(allTagList, item)
        }
        delete res.classifyId
        delete res.tagIds
        return res
      })
      .value()
    return res
  }

  classifyList(): IDName[] {
    return this.db.get('classifyList').value()
  }

  tagList(): IDName[] {
    return this.db.get('tagList').value()
  }
  static itemHasClassifyName(classifyList: IDName[], classifyName: string, item: Info) :boolean{
    const itemClassifyName = InfoService.getItemClassify(classifyList, item)?.name
    if(itemClassifyName) {
      return itemClassifyName.includes(classifyName)
    }
    return false
  }

  static getItemClassify(allClassifyList: IDName[], item: Info) : IDName | null{
    if(!item.classifyId) {
      return null
    }
    return allClassifyList.find(c => c.id === item.classifyId)
  }

  static itemHasTagName(tagList: IDName[], tagName: string, item: Info) :boolean{
    const itemTagNames = InfoService.getItemTags(tagList, item).map(item => item.name)
    if(itemTagNames) {
      return itemTagNames.some(item => item.includes(tagName))
    }
    return false
  }

  static getItemTags(allTagList: IDName[], item: Info) : IDName[] {
    if(!item.tagIds || item.tagIds.length === 0) {
      return []
    }
    return allTagList.filter(c => item.tagIds.includes(c.id))
  }
}

export default InfoService 