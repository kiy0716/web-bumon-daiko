'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  getCategoryDisplayName,
  formatPrice,
  generateRequestId,
} from '@/lib/utils'
import { calculateEstimate } from '@/lib/constants'

export default function BookPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []

  const [requestId, setRequestId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const estimate = calculateEstimate(category, selectedContent, selectedDetails)
  const googleCalendarUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL || '#'

  useEffect(() => {
    setRequestId(generateRequestId())
  }, [])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          category,
          selectedContent,
          selectedDetails,
          estimateMin: estimate.min,
          estimateMax: estimate.max,
          contactMethod: 'zoom',
          contactTool: null,
        }),
      })

      if (response.ok) {
        router.push(`/done?requestId=${requestId}&contactMethod=zoom`)
      } else {
        alert('エラーが発生しました。もう一度お試しください。')
      }
    } catch (error) {
      alert('エラーが発生しました。もう一度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  if (!category) {
    router.push('/flow/category')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Zoom相談の予約</h1>
          <p className="text-gray-600">
            空いている時間から選ぶだけで予約できます
          </p>
        </div>

        {/* 案件ID */}
        <div className="card bg-primary text-white text-center mb-6">
          <div className="text-sm mb-1">案件ID</div>
          <div className="text-2xl font-bold">{requestId}</div>
          <div className="text-xs mt-2 opacity-90">
            予約時にこのIDをメモしておいてください
          </div>
        </div>

        {/* 選択内容の確認 */}
        <div className="card mb-6">
          <h2 className="font-bold text-lg mb-4">選択内容の確認</h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">カテゴリ:</span>
              <span className="ml-2 text-gray-600">
                {getCategoryDisplayName(category)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">内容:</span>
              <span className="ml-2 text-gray-600">
                {selectedContent.join(', ')}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">目安金額:</span>
              <span className="ml-2 text-gray-600">
                {formatPrice(estimate.min)}〜{formatPrice(estimate.max)}程度
              </span>
            </div>
          </div>
        </div>

        {/* 予約手順 */}
        <div className="card mb-6">
          <h2 className="font-bold text-lg mb-4">予約の手順</h2>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                1
              </span>
              <span>下のボタンから予約ページへ移動します</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                2
              </span>
              <span>空いている日時を選んで予約します</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                3
              </span>
              <span>
                予約後、このページに戻って「完了」ボタンを押してください
              </span>
            </li>
          </ol>
        </div>

        {/* 予約ボタン */}
        <div className="card bg-blue-50 border-2 border-primary mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              予約ページへ移動します（新しいタブで開きます）
            </p>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg"
            >
              Zoom相談を予約する
            </a>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="card bg-yellow-50 border border-yellow-200 mb-6">
          <div className="text-sm space-y-2">
            <p className="font-bold text-yellow-800">
              予約後、必要に応じてこちらから連絡します
            </p>
            <p className="text-gray-600">
              • 予約確認のメールが届きます
            </p>
            <p className="text-gray-600">
              • 案件ID「{requestId}」を控えておいてください
            </p>
          </div>
        </div>

        {/* アクション */}
        <div className="flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '送信中...' : '予約完了'}
          </button>
        </div>
      </div>
    </div>
  )
}
