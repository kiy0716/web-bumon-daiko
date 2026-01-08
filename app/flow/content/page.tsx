'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CONTENT_OPTIONS } from '@/lib/constants'
import { getCategoryDisplayName } from '@/lib/utils'

function ContentPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''

  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const contentOptions = CONTENT_OPTIONS[category] || []
  const isConsultationOnly = category === 'consultation-only' || category === 'general-consultation' || category === 'youtube-consultation' || selectedContent.includes('consultation-advice')

  const selectContent = (contentId: string) => {
    // 単一選択：選択した項目のみを配列に設定
    setSelectedContent([contentId])
  }

  const handleNext = () => {
    if (selectedContent.length === 0) return
    const params = new URLSearchParams(searchParams)
    params.set('selectedContent', selectedContent.join(','))

    // 相談・アドバイスのみの場合はSTEP 3をスキップして直接見積もりへ
    // ただし、顧問契約カテゴリの場合は詳細選択ページへ進む
    if ((category === 'consultation-only' || category === 'general-consultation' || category === 'youtube-consultation' || selectedContent.includes('consultation-advice')) && category !== 'advisory') {
      router.push(`/estimate?${params.toString()}`)
    } else {
      router.push(`/flow/detail?${params.toString()}`)
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
          <div className="text-sm text-gray-500 mb-2">
            {category === 'consultation-only' ? '2️⃣ STEP 2 / 4' : '2️⃣ STEP 2 / 6'}
          </div>
          <div className="text-sm text-primary mb-2">
            📂 選択カテゴリ: {getCategoryDisplayName(category)}
          </div>
          <h1 className="text-3xl font-bold">🤔 どんなことで困っていますか？</h1>
          <p className="text-gray-600 mt-2">
            該当するものを選んでください
          </p>
        </div>

        <div className="space-y-3">
          {contentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => selectContent(option.id)}
              className={`card w-full text-left transition-all ${
                selectedContent.includes(option.id)
                  ? 'ring-2 ring-primary bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                    selectedContent.includes(option.id)
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedContent.includes(option.id) && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <button
            onClick={handleNext}
            disabled={selectedContent.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ContentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">読み込み中...</div>}>
      <ContentPageContent />
    </Suspense>
  )
}
