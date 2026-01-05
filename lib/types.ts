// 型定義

export type Category =
  | 'general-consultation'
  | 'website-lp'
  | 'banner-image'
  | 'video'
  | 'wordpress'
  | 'server-domain'
  | 'pc-it'
  | 'consultation-only'
  | 'unknown'
  | 'advisory'

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
  comingSoon?: boolean // 準備中フラグ
}

export interface ContentOption {
  id: string
  label: string
}

export interface DetailOption {
  id: string
  label: string
  priceRange?: string // 目安金額（例: "+¥20,000〜¥50,000" or "¥0"）
}
