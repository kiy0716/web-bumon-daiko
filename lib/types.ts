// 型定義

export type Category =
  | 'website-lp'
  | 'banner-image'
  | 'video'
  | 'wordpress'
  | 'server-domain'
  | 'pc-it'
  | 'unknown'

export type ContactMethod = 'chat' | 'zoom'

export type ContactTool = 'line' | 'chatwork' | 'discord' | 'email'

export interface FlowData {
  category?: Category
  selectedContent?: string[]
  selectedDetails?: string[]
  estimateMin?: number
  estimateMax?: number
  contactMethod?: ContactMethod
  contactTool?: ContactTool
}

export interface CategoryOption {
  id: Category
  label: string
  description: string
}

export interface ContentOption {
  id: string
  label: string
}

export interface DetailOption {
  id: string
  label: string
}
