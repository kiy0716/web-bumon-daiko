'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CONTENT_OPTIONS } from '@/lib/constants'
import { getCategoryDisplayName } from '@/lib/utils'

export default function ContentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''

  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const contentOptions = CONTENT_OPTIONS[category] || []

  const toggleContent = (contentId: string) => {
    setSelectedContent((prev) =>
      prev.includes(contentId)
        ? prev.filter((id) => id !== contentId)
        : [...prev, contentId]
    )
  }

  const handleNext = () => {
    if (selectedContent.length === 0) return
    const params = new URLSearchParams(searchParams)
    params.set('selectedContent', selectedContent.join(','))
    router.push(`/flow/detail?${params.toString()}`)
  }

  if (!category) {
    router.push('/flow/category')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">STEP 2 / 5</div>
          <div className="text-sm text-primary mb-2">
            選択カテゴリ: {getCategoryDisplayName(category)}
          </div>
          <h1 className="text-3xl font-bold">どんなことで困っていますか？</h1>
          <p className="text-gray-600 mt-2">
            該当するものを選んでください（複数選択可）
          </p>
        </div>

        <div className="space-y-3">
          {contentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleContent(option.id)}
              className={`card w-full text-left transition-all ${
                selectedContent.includes(option.id)
                  ? 'ring-2 ring-primary bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                    selectedContent.includes(option.id)
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedContent.includes(option.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
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
