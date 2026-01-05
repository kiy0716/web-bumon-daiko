// ユーティリティ関数

/**
 * 案件IDを生成
 * 形式: WB-YYYY-XXXXXX (例: WB-2025-A3B4C5)
 */
export function generateRequestId(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `WB-${year}-${random}`
}

/**
 * カテゴリの表示名を取得
 */
export function getCategoryDisplayName(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'general-consultation': 'まずは色々相談したい',
    'website-lp': 'Webサイト・LP',
    'banner-image': 'バナー・画像',
    'video': '動画編集',
    'wordpress': 'WordPress',
    'server-domain': 'サーバー・ドメイン',
    'pc-it': 'PC・IT相談',
    'consultation-only': '制作ではなく相談・アドバイスが欲しい',
    'advisory': '顧問契約を頼みたい',
  }
  return categoryMap[category] || category
}

/**
 * ステータスの表示名を取得
 */
export function getStatusDisplayName(status: string): string {
  const statusMap: { [key: string]: string } = {
    new: '新規',
    contacted: '初回連絡済',
    in_progress: '対応中',
    waiting: '待機中',
    done: '完了',
    closed: 'クローズ',
  }
  return statusMap[status] || status
}

/**
 * 連絡方法の表示名を取得
 */
export function getContactMethodDisplayName(method: string): string {
  const methodMap: { [key: string]: string } = {
    chat: 'チャット相談',
    zoom: 'Zoom相談',
  }
  return methodMap[method] || method
}

/**
 * 連絡ツールの表示名を取得
 */
export function getContactToolDisplayName(tool: string | null): string {
  if (!tool) return '-'
  const toolMap: { [key: string]: string } = {
    line: 'LINE',
    chatwork: 'Chatwork',
    discord: 'Discord',
    email: 'メール',
  }
  return toolMap[tool] || tool
}

/**
 * 金額をフォーマット
 */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`
}

/**
 * 日付をフォーマット
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * 選択肢IDからラベルを取得
 */
export function getOptionLabel(
  optionId: string,
  category: string,
  optionsMap: any
): string {
  // カテゴリに紐づく選択肢から検索
  if (optionsMap[category]) {
    const option = optionsMap[category].find((opt: any) => opt.id === optionId)
    if (option) return option.label
  }

  // category-content の組み合わせで検索（DETAIL_OPTIONS用）
  for (const key in optionsMap) {
    if (key.startsWith(category)) {
      const option = optionsMap[key].find((opt: any) => opt.id === optionId)
      if (option) return option.label
    }
  }

  return optionId
}
