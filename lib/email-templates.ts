// メールテンプレート

import { formatPrice, getCategoryDisplayName, getContactMethodDisplayName, getContactToolDisplayName } from './utils'

interface RequestEmailData {
  requestId: string
  category: string
  selectedContent: string[]
  selectedDetails: string[]
  estimateMin: number
  estimateMax: number
  contactMethod: string
  contactTool: string | null
}

/**
 * 受付控えメール（ユーザー向け）
 */
export function generateUserReceiptEmail(data: RequestEmailData): {
  subject: string
  html: string
  text: string
} {
  const subject = `【Web部門代行】ご相談を受付しました（案件ID: ${data.requestId}）`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9fafb; }
    .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Web部門代行</h1>
      <p>ご相談ありがとうございます</p>
    </div>

    <div class="content">
      <h2>受付完了のお知らせ</h2>
      <p>以下の内容でご相談を受付しました。</p>

      <div class="info-box">
        <strong>案件ID:</strong> ${data.requestId}<br>
        <small>この番号を控えておいてください</small>
      </div>

      <div class="info-box">
        <strong>カテゴリ:</strong> ${getCategoryDisplayName(data.category)}<br>
        <strong>内容:</strong> ${data.selectedContent.join(', ')}<br>
        <strong>詳細:</strong> ${data.selectedDetails.join(', ')}<br>
        <strong>目安金額:</strong> ${formatPrice(data.estimateMin)}〜${formatPrice(data.estimateMax)}程度<br>
        <strong>相談方法:</strong> ${getContactMethodDisplayName(data.contactMethod)}${data.contactTool ? ` (${getContactToolDisplayName(data.contactTool)})` : ''}
      </div>

      <h3>この後の流れ</h3>
      ${data.contactMethod === 'chat' ? `
        <ol>
          <li>選んだチャットツールに相談内容を送信してください</li>
          <li>担当者から返信があるまでお待ちください</li>
          <li>内容を確認し、正式な金額をご案内します</li>
        </ol>
      ` : `
        <ol>
          <li>予約確認のメールが届きます</li>
          <li>予約日時にZoomのリンクをお送りします</li>
          <li>Zoom相談で内容を確認し、正式な金額をご案内します</li>
        </ol>
      `}

      <div class="info-box" style="background: #eff6ff;">
        <strong>ご注意:</strong><br>
        • 表示している金額は目安です<br>
        • 正式な金額は、内容を確認した上でご案内します<br>
        • この時点では料金は発生していません
      </div>
    </div>

    <div class="footer">
      <p>&copy; 2025 Web部門代行. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
Web部門代行 - ご相談受付完了

ご相談ありがとうございます。
以下の内容でご相談を受付しました。

【案件ID】
${data.requestId}
※この番号を控えておいてください

【ご相談内容】
カテゴリ: ${getCategoryDisplayName(data.category)}
内容: ${data.selectedContent.join(', ')}
詳細: ${data.selectedDetails.join(', ')}
目安金額: ${formatPrice(data.estimateMin)}〜${formatPrice(data.estimateMax)}程度
相談方法: ${getContactMethodDisplayName(data.contactMethod)}${data.contactTool ? ` (${getContactToolDisplayName(data.contactTool)})` : ''}

【この後の流れ】
${data.contactMethod === 'chat' ? `
1. 選んだチャットツールに相談内容を送信してください
2. 担当者から返信があるまでお待ちください
3. 内容を確認し、正式な金額をご案内します
` : `
1. 予約確認のメールが届きます
2. 予約日時にZoomのリンクをお送りします
3. Zoom相談で内容を確認し、正式な金額をご案内します
`}

【ご注意】
• 表示している金額は目安です
• 正式な金額は、内容を確認した上でご案内します
• この時点では料金は発生していません

---
Web部門代行
  `

  return { subject, html, text }
}

/**
 * 管理者通知メール
 */
export function generateAdminNotificationEmail(data: RequestEmailData): {
  subject: string
  html: string
  text: string
} {
  const subject = `【新規相談】${data.requestId} - ${getCategoryDisplayName(data.category)}`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: monospace; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .info { background: #f3f4f6; padding: 15px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>新規相談が受付されました</h2>

    <div class="info">
      <strong>案件ID:</strong> ${data.requestId}<br>
      <strong>カテゴリ:</strong> ${getCategoryDisplayName(data.category)}<br>
      <strong>内容:</strong> ${data.selectedContent.join(', ')}<br>
      <strong>詳細:</strong> ${data.selectedDetails.join(', ')}<br>
      <strong>目安金額:</strong> ${formatPrice(data.estimateMin)}〜${formatPrice(data.estimateMax)}<br>
      <strong>相談方法:</strong> ${getContactMethodDisplayName(data.contactMethod)}${data.contactTool ? ` (${getContactToolDisplayName(data.contactTool)})` : ''}
    </div>

    <p><strong>対応が必要です。</strong></p>
  </div>
</body>
</html>
  `

  const text = `
【新規相談】${data.requestId}

案件ID: ${data.requestId}
カテゴリ: ${getCategoryDisplayName(data.category)}
内容: ${data.selectedContent.join(', ')}
詳細: ${data.selectedDetails.join(', ')}
目安金額: ${formatPrice(data.estimateMin)}〜${formatPrice(data.estimateMax)}
相談方法: ${getContactMethodDisplayName(data.contactMethod)}${data.contactTool ? ` (${getContactToolDisplayName(data.contactTool)})` : ''}

対応が必要です。
  `

  return { subject, html, text }
}
