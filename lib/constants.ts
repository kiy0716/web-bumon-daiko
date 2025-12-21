// 定数定義
import type { CategoryOption, ContentOption, DetailOption } from './types'

// カテゴリ選択肢
export const CATEGORIES: CategoryOption[] = [
  {
    id: 'website-lp',
    label: 'Webサイト・LP',
    description: '新規制作・修正・改善など',
  },
  {
    id: 'banner-image',
    label: 'バナー・画像',
    description: 'バナー・サムネ・画像の制作・修正',
  },
  {
    id: 'video',
    label: '動画編集',
    description: 'カット・テロップ・サムネなど',
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    description: '修正・不具合対応・相談',
  },
  {
    id: 'server-domain',
    label: 'サーバー・ドメイン',
    description: '設定・移管・トラブル対応',
  },
  {
    id: 'pc-it',
    label: 'PC・IT相談',
    description: 'トラブル・設定・使い方など',
  },
  {
    id: 'unknown',
    label: 'よくわからない',
    description: 'まず相談したい',
  },
]

// カテゴリ別の内容選択肢
export const CONTENT_OPTIONS: Record<string, ContentOption[]> = {
  'website-lp': [
    { id: 'new', label: '新しく作りたい' },
    { id: 'modify', label: '修正したい' },
    { id: 'broken', label: '表示が崩れている' },
    { id: 'responsive', label: 'スマホ対応したい' },
    { id: 'slow', label: '表示が遅い' },
    { id: 'content', label: '内容を見直したい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'banner-image': [
    { id: 'new-banner', label: 'バナーを作りたい' },
    { id: 'thumbnail', label: 'サムネを作りたい' },
    { id: 'edit-image', label: '画像を修正したい' },
    { id: 'resize', label: 'サイズを変更したい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  video: [
    { id: 'cut', label: 'カット編集' },
    { id: 'telop', label: 'テロップ追加' },
    { id: 'thumbnail', label: 'サムネ制作' },
    { id: 'full-edit', label: 'フル編集' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  wordpress: [
    { id: 'minor-fix', label: '軽微な修正' },
    { id: 'display-issue', label: '表示崩れ' },
    { id: 'error', label: 'エラーが出る' },
    { id: 'consultation', label: '相談したい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'server-domain': [
    { id: 'setup', label: '設定したい' },
    { id: 'transfer', label: '移管したい' },
    { id: 'trouble', label: 'トラブル対応' },
    { id: 'consultation', label: '相談したい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'pc-it': [
    { id: 'trouble', label: 'トラブル対応' },
    { id: 'setup', label: '設定方法を知りたい' },
    { id: 'usage', label: '使い方がわからない' },
    { id: 'consultation', label: '相談したい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  unknown: [{ id: 'consultation', label: 'まず相談したい' }],
}

// 詳細選択肢
export const DETAIL_OPTIONS: DetailOption[] = [
  { id: 'one-page', label: '1ページだけ' },
  { id: 'multiple-pages', label: '複数ページ' },
  { id: 'text-only', label: '文章のみ' },
  { id: 'design-only', label: 'デザインのみ' },
  { id: 'both', label: '両方' },
  { id: 'urgent', label: '急ぎ（即日・短納期）' },
  { id: 'unknown', label: 'よくわからない' },
]

// 目安金額の計算（簡易版）
export function calculateEstimate(
  category: string,
  selectedContent: string[],
  selectedDetails: string[]
): { min: number; max: number } {
  // カテゴリベースの基本金額
  const baseEstimates: Record<string, { min: number; max: number }> = {
    'website-lp': { min: 10000, max: 150000 },
    'banner-image': { min: 3000, max: 10000 },
    video: { min: 8000, max: 30000 },
    wordpress: { min: 5000, max: 50000 },
    'server-domain': { min: 5000, max: 30000 },
    'pc-it': { min: 3000, max: 20000 },
    unknown: { min: 3000, max: 10000 },
  }

  let estimate = baseEstimates[category] || { min: 3000, max: 10000 }

  // 新規制作の場合は高めに
  if (selectedContent.includes('new')) {
    estimate = { min: 50000, max: 150000 }
  }

  // 複数ページの場合は範囲を広げる
  if (selectedDetails.includes('multiple-pages')) {
    estimate = { min: estimate.min, max: estimate.max * 1.5 }
  }

  // 急ぎの場合は高めに
  if (selectedDetails.includes('urgent')) {
    estimate = { min: estimate.min * 1.2, max: estimate.max * 1.3 }
  }

  return {
    min: Math.round(estimate.min),
    max: Math.round(estimate.max),
  }
}
