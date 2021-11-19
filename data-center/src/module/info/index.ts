import getDB from "../../utils/get-db"
interface Info {
  name: string
  content: string
  classify?: string
  tag?: string[]
  type?: 'string' | 'link'
}

class InfoService {
  db: any
  constructor() {
    this.db = getDB('info')
  }

  create (info: Info) {

  }
}

export default InfoService 