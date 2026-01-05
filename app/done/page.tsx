'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getCategoryDisplayName, formatPrice } from '@/lib/utils'
import { CONTENT_OPTIONS, DETAIL_OPTIONS } from '@/lib/constants'
import type { ContactTool } from '@/lib/types'

export default function DonePage() {
  const searchParams = useSearchParams()
  const requestId = searchParams.get('requestId') || ''
  const contactMethod = searchParams.get('contactMethod') || ''

  const [chatData, setChatData] = useState<any>(null)
  const [bookingData, setBookingData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (contactMethod === 'chat') {
      const data = sessionStorage.getItem('chatRequestData')
      if (data) {
        setChatData(JSON.parse(data))
      }
    } else if (contactMethod === 'zoom') {
      const data = sessionStorage.getItem('bookingRequestData')
      if (data) {
        setBookingData(JSON.parse(data))
      }
    }
  }, [contactMethod])

  const getContentLabels = (category: string, contentIds: string[]) => {
    const options = CONTENT_OPTIONS[category] || []
    return contentIds.map(id => {
      const option = options.find(opt => opt.id === id)
      return option ? option.label : id
    })
  }

  const getDetailLabels = (category: string, contentIds: string[], detailIds: string[]) => {
    // category-content の組み合わせで詳細オプションを取得
    const combinedKey = `${category}-${contentIds[0]}`
    let options = DETAIL_OPTIONS[combinedKey] || DETAIL_OPTIONS[category] || []

    return detailIds.map(id => {
      const option = options.find(opt => opt.id === id)
      return option ? option.label : id
    })
  }

  const getCopyText = () => {
    if (!chatData) return ''

    const contentLabels = getContentLabels(chatData.category, chatData.selectedContent)
    const detailLabels = getDetailLabels(chatData.category, chatData.selectedContent, chatData.selectedDetails)

    return `【Web部門代行 相談】
案件ID：${chatData.requestId}

■カテゴリ
${getCategoryDisplayName(chatData.category)}

■内容
${contentLabels.join(', ')}

■詳細
${detailLabels.join(', ')}

■目安金額
${formatPrice(chatData.estimate.min)}〜${formatPrice(chatData.estimate.max)}程度

■補足（任意）
`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCopyText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getToolInfo = (tool: ContactTool) => {
    const toolMap = {
      line: {
        name: 'LINE',
        color: 'bg-green-500',
        link: process.env.NEXT_PUBLIC_LINE_URL || 'https://line.me/ti/p/' + (process.env.NEXT_PUBLIC_LINE_ID || ''),
        instruction: 'LINEアプリで開いて、ID: ' + (process.env.NEXT_PUBLIC_LINE_ID || 'kiy0716') + ' を追加してください'
      },
      chatwork: {
        name: 'Chatwork',
        color: 'bg-red-500',
        link: process.env.NEXT_PUBLIC_CHATWORK_URL || 'https://www.chatwork.com/kiy0716',
        instruction: 'Chatworkで開いて、メッセージを送信してください'
      },
      discord: {
        name: 'Discord',
        color: 'bg-indigo-500',
        link: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.com/users/' + (process.env.NEXT_PUBLIC_DISCORD_ID || 'kiy0716'),
        instruction: 'DiscordでユーザーID: ' + (process.env.NEXT_PUBLIC_DISCORD_ID || 'kiy0716') + ' にメッセージを送信してください'
      },
      email: {
        name: 'メール',
        color: 'bg-gray-500',
        link: 'mailto:' + (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@example.com'),
        instruction: 'メールアプリで開いて、上記の内容を送信してください'
      },
    }
    return toolMap[tool] || { name: tool, color: 'bg-gray-500', link: null, instruction: '' }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 成功メッセージ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">📋 案件IDを発行しました</h1>
          <p className="text-gray-600">
            {contactMethod === 'chat'
              ? '以下の手順でコピペして送信してください'
              : '以下の手順で予約を完了してください'} 🙏
          </p>
          <p className="text-sm text-red-600 font-bold mt-2">
            ※ {contactMethod === 'chat' ? '送信' : '予約'}が完了して初めて受付完了となります
          </p>
        </div>

        {/* 案件ID */}
        <div className="card bg-primary text-white text-center mb-6">
          <div className="text-sm mb-1">🆔 案件ID</div>
          <div className="text-3xl font-bold">{requestId}</div>
          <div className="text-xs mt-2 opacity-90">
            この番号を控えておいてください
          </div>
        </div>

        {/* チャット相談の場合 */}
        {contactMethod === 'chat' && chatData && (
          <>
            {/* コピー用テキスト */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">📝 コピーする内容</h2>
                <button
                  onClick={handleCopy}
                  className="btn-primary py-2 px-4 text-sm"
                >
                  {copied ? 'コピーしました！ ✓' : 'コピー'}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {getCopyText()}
                </pre>
              </div>
            </div>

            {/* 選択したツール情報 */}
            <div className="card mb-6">
              <h2 className="font-bold mb-4">
                📱 選択したチャットツール: {getToolInfo(chatData.contactTool).name}
              </h2>

              {/* SNSツールへのリンクボタン */}
              <div className="mb-6 text-center">
                <a
                  href={getToolInfo(chatData.contactTool).link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block ${getToolInfo(chatData.contactTool).color} text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {getToolInfo(chatData.contactTool).name}で相談を送信する
                </a>
                <p className="text-xs text-gray-600 mt-2">
                  {getToolInfo(chatData.contactTool).instruction}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    1
                  </span>
                  <span>上の内容をコピーしてください</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    2
                  </span>
                  <span>
                    上のボタンから{getToolInfo(chatData.contactTool).name}を開いて、コピーした内容を送信してください
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    3
                  </span>
                  <span>担当者から返信があるまでお待ちください</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* オンライン会議予約の場合 */}
        {contactMethod === 'zoom' && bookingData && (
          <>
            {/* 予約リンク */}
            <div className="card bg-blue-50 border-2 border-primary mb-6">
              <div className="text-center">
                <h2 className="font-bold text-lg mb-4">
                  📅 こちらから予約してください
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  予約ページへ移動します（新しいタブで開きます）
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  ※ Google Meet（オンライン会議ツール）を使用します
                </p>
                <a
                  href={bookingData.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-primary text-lg"
                >
                  📅 オンライン会議相談を予約する
                </a>
              </div>
            </div>

            {/* 予約の手順 */}
            <div className="card mb-6">
              <h2 className="font-bold text-lg mb-4">📝 予約の手順</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    1
                  </span>
                  <span>上のボタンから予約ページへ移動します</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    2
                  </span>
                  <span>空いている日時を選んで予約します</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    3
                  </span>
                  <span>予約確認のメールが届きます</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                    4
                  </span>
                  <span>予約日時にGoogle Meetのリンクをお送りします</span>
                </div>
              </div>
            </div>

            {/* キャンセルポリシー */}
            <div className="card bg-red-50 border border-red-200 mb-6">
              <div className="text-sm space-y-2">
                <p className="font-bold text-red-800">
                  ⚠️ キャンセルポリシー（再掲）
                </p>
                <p className="text-gray-700">
                  •{' '}
                  <strong>
                    当日キャンセルの場合、キャンセル料金として¥3,000が発生します
                  </strong>
                </p>
                <p className="text-gray-600">• 前日までのキャンセルは無料です</p>
              </div>
            </div>
          </>
        )}

        {/* 注意事項 */}
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h3 className="font-bold text-sm mb-2">ℹ️ ご確認ください</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• 案件ID「{requestId}」を控えておいてください</li>
            <li>• 正式な金額は相談後にご案内します</li>
            <li>• この時点では料金は発生していません</li>
          </ul>
        </div>

        {/* アクション */}
        <div className="text-center">
          <Link href="/" className="btn-primary">
            🏠 トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
