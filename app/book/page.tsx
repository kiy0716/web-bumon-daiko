'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoryDisplayName,
  formatPrice,
  generateRequestId,
} from '@/lib/utils'
import { calculateEstimate } from '@/lib/constants'

function BookPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []

  const [requestId, setRequestId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const estimate = calculateEstimate(category, selectedContent, selectedDetails)
  const googleCalendarUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL || '#'

  useEffect(() => {
    setRequestId(generateRequestId())
  }, [])

  const handleSubmit = async () => {
    if (!termsAccepted) return

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
        // セッションストレージに情報を保存
        sessionStorage.setItem(
          'bookingRequestData',
          JSON.stringify({
            requestId,
            category,
            selectedContent,
            selectedDetails,
            estimate,
            googleCalendarUrl,
          })
        )
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
          <h1 className="text-3xl font-bold mb-4">🎥 オンライン会議相談の予約</h1>
          <p className="text-gray-600">
            次のページで、空いている時間から選んで予約できます 📅
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ※ Google Meet（オンライン会議ツール）を使用します
          </p>
        </div>

        {/* 選択内容の確認 */}
        <div className="card mb-6">
          <h2 className="font-bold text-lg mb-4">✅ 選択内容の確認</h2>
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

        {/* 予約の流れ */}
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <div className="text-sm space-y-2">
            <p className="font-bold text-blue-800">
              📋 この後の流れ
            </p>
            <p className="text-gray-700">
              • 次のページで予約カレンダーへのリンクが表示されます
            </p>
            <p className="text-gray-700">
              • 空いている日時を選んで予約してください
            </p>
            <p className="text-gray-700">
              • 予約確認のメールが届きます
            </p>
          </div>
        </div>

        {/* キャンセルポリシー */}
        <div className="card bg-red-50 border border-red-200 mb-6">
          <div className="text-sm space-y-2">
            <p className="font-bold text-red-800">
              ⚠️ キャンセルポリシー
            </p>
            <p className="text-gray-700">
              • <strong>当日キャンセルの場合、キャンセル料金として¥3,000が発生します</strong>
            </p>
            <p className="text-gray-600">
              • 前日までのキャンセルは無料です
            </p>
            <p className="text-gray-600">
              • キャンセルや日時変更は、予約確認メールから行えます
            </p>
          </div>
        </div>

        {/* 利用規約への同意 */}
        <div className="card mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              <Link
                href="/terms"
                target="_blank"
                className="text-primary hover:underline font-medium"
              >
                📋 利用規約・免責事項
              </Link>
              に同意します
            </span>
          </label>
        </div>

        {/* アクション */}
        <div className="flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <button
            onClick={handleSubmit}
            disabled={!termsAccepted || submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '処理中...' : '次へ（予約ページへ） →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">読み込み中...</div>}>
      <BookPageContent />
    </Suspense>
  )
}
