export type IDName = {
  id: number,
  name: string
}

export interface Info {
  id: number
  name: string
  content: string
  classify?: IDName
  tags?: IDName[]
  type?: 'text' | 'link'
}