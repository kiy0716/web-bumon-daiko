'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ContactMethod } from '@/lib/types'

function ContactPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const isConsultationOnly = category === 'consultation-only' || category === 'general-consultation' || selectedContent.includes('consultation-advice')
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(
    null
  )

  // 相談・アドバイスのみの場合は自動的にGoogle Meetに遷移
  useEffect(() => {
    if (isConsultationOnly) {
      const params = new URLSearchParams(searchParams)
      params.set('contactMethod', 'zoom')
      router.push(`/book?${params.toString()}`)
    }
  }, [isConsultationOnly, searchParams, router])

  const handleNext = () => {
    if (!selectedMethod) return
    const params = new URLSearchParams(searchParams)
    params.set('contactMethod', selectedMethod)

    if (selectedMethod === 'chat') {
      router.push(`/chat?${params.toString()}`)
    } else {
      router.push(`/book?${params.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            {isConsultationOnly ? '4️⃣ STEP 4 / 4' : '6️⃣ STEP 6 / 6'}
          </div>
          <h1 className="text-3xl font-bold">📞 どの方法で進めますか？</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* チャット相談 */}
          <button
            onClick={() => setSelectedMethod('chat')}
            className={`card text-left transition-all ${
              selectedMethod === 'chat'
                ? 'ring-2 ring-primary bg-blue-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold">💬 チャットで相談する</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✅ 今すぐ聞きたい</p>
              <p>✅ 文章でやり取りしたい</p>
              <p>✅ 軽い相談・判断</p>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              → 次画面で「コピペして送る」案内を出します
            </div>
          </button>

          {/* Google Meet相談 */}
          <button
            onClick={() => setSelectedMethod('zoom')}
            className={`card text-left transition-all ${
              selectedMethod === 'zoom'
                ? 'ring-2 ring-primary bg-blue-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold">🎥 オンライン会議で相談する</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✅ 話した方が早い</p>
              <p>✅ 内容を整理したい</p>
              <p>✅ 作業を確定したい</p>
              <p className="text-xs text-gray-500 mt-2">※ Google Meetを使用します</p>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              → 次画面で日時選択へ
            </div>
          </button>
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedMethod}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">読み込み中...</div>}>
      <ContactPageContent />
    </Suspense>
  )
}
