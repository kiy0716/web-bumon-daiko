'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DETAIL_OPTIONS } from '@/lib/constants'
import { getCategoryDisplayName } from '@/lib/utils'

export default function DetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []

  const [selectedDetails, setSelectedDetails] = useState<string[]>([])

  const toggleDetail = (detailId: string) => {
    setSelectedDetails((prev) =>
      prev.includes(detailId)
        ? prev.filter((id) => id !== detailId)
        : [...prev, detailId]
    )
  }

  const handleNext = () => {
    if (selectedDetails.length === 0) return
    const params = new URLSearchParams(searchParams)
    params.set('selectedDetails', selectedDetails.join(','))
    router.push(`/estimate?${params.toString()}`)
  }

  if (!category) {
    router.push('/flow/category')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">STEP 3 / 5</div>
          <div className="text-sm text-primary mb-2">
            選択カテゴリ: {getCategoryDisplayName(category)}
          </div>
          <h1 className="text-3xl font-bold">該当するものを選んでください</h1>
          <p className="text-gray-600 mt-2">複数選択可</p>
        </div>

        <div className="space-y-3">
          {DETAIL_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleDetail(option.id)}
              className={`card w-full text-left transition-all ${
                selectedDetails.includes(option.id)
                  ? 'ring-2 ring-primary bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                    selectedDetails.includes(option.id)
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedDetails.includes(option.id) && (
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
            disabled={selectedDetails.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  )
}
