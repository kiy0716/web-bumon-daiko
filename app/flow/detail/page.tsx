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

  // category と selectedContent の組み合わせで特化した質問を取得
  const getDetailOptions = () => {
    // まず category-content の組み合わせを試す
    const combinedKey = `${category}-${selectedContent[0]}`
    if (DETAIL_OPTIONS[combinedKey]) {
      return DETAIL_OPTIONS[combinedKey]
    }
    // なければ category のみで取得
    return DETAIL_OPTIONS[category] || []
  }

  const detailOptions = getDetailOptions()

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

    // LP新規制作・Webサイト新規制作・リニューアル・修正・表示崩れ・表示遅い・バナー画像・WordPressの場合は追加質問ページへ（相談のみは除く）
    const combinedKey = `${category}-${selectedContent[0]}`
    const hasAdditionalDetail = [
      'website-lp-new-lp',
      'website-lp-new-website',
      'website-lp-renewal-lp',
      'website-lp-renewal-website',
      'website-lp-modify',
      'website-lp-broken',
      'website-lp-slow',
      'banner-image-new-banner',
      'banner-image-thumbnail',
      'banner-image-edit-image',
      'banner-image-resize',
      'wordpress-text-image-fix',
      'wordpress-plugin-issue',
      'wordpress-error-fix',
      'wordpress-display-broken',
      'wordpress-security',
      'wordpress-backup-restore',
      'wordpress-add-function'
    ].includes(combinedKey)

    if (hasAdditionalDetail && !selectedDetails.includes('consultation-advice')) {
      router.push(`/flow/additional-detail?${params.toString()}`)
    } else {
      router.push(`/estimate?${params.toString()}`)
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
          <div className="text-sm text-gray-500 mb-2">3️⃣ STEP 3 / 6</div>
          <div className="text-sm text-primary mb-2">
            📂 選択カテゴリ: {getCategoryDisplayName(category)}
          </div>
          <h1 className="text-3xl font-bold">📝 該当するものを選んでください</h1>
          <p className="text-gray-600 mt-2">複数選択可 ✅</p>
        </div>

        <div className="space-y-3">
          {detailOptions.map((option) => (
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
