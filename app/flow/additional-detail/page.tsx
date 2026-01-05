'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ADDITIONAL_DETAIL_OPTIONS } from '@/lib/constants'
import { getCategoryDisplayName } from '@/lib/utils'

export default function AdditionalDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []

  const [selectedAdditionalDetails, setSelectedAdditionalDetails] = useState<string[]>([])

  // category と selectedContent の組み合わせで追加質問を取得
  const getAdditionalDetailOptions = () => {
    const combinedKey = `${category}-${selectedContent[0]}`
    if (ADDITIONAL_DETAIL_OPTIONS[combinedKey]) {
      return ADDITIONAL_DETAIL_OPTIONS[combinedKey]
    }
    return []
  }

  const additionalDetailOptions = getAdditionalDetailOptions()

  // タイトルをカテゴリに応じて変更
  const getPageTitle = () => {
    const combinedKey = `${category}-${selectedContent[0]}`
    if (combinedKey === 'website-lp-new-lp') {
      return 'LPについて詳しく教えてください'
    }
    if (combinedKey === 'website-lp-new-website') {
      return 'Webサイトについて詳しく教えてください'
    }
    if (combinedKey === 'website-lp-renewal-lp') {
      return 'LPリニューアルについて詳しく教えてください'
    }
    if (combinedKey === 'website-lp-renewal-website') {
      return 'Webサイトリニューアルについて詳しく教えてください'
    }
    if (combinedKey === 'website-lp-modify') {
      return '修正について詳しく教えてください'
    }
    if (combinedKey === 'website-lp-broken') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'website-lp-slow') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'banner-image-new-banner') {
      return '枚数と納期について教えてください'
    }
    if (combinedKey === 'banner-image-thumbnail') {
      return '枚数と納期について教えてください'
    }
    if (combinedKey === 'banner-image-edit-image') {
      return '枚数と納期について教えてください'
    }
    if (combinedKey === 'banner-image-resize') {
      return '枚数と納期について教えてください'
    }
    if (combinedKey === 'wordpress-text-image-fix') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'wordpress-plugin-issue') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'wordpress-error-fix') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'wordpress-display-broken') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'wordpress-security') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'wordpress-backup-restore') {
      return '対応の緊急度を教えてください'
    }
    if (combinedKey === 'wordpress-add-function') {
      return '対応の緊急度を教えてください'
    }
    return '詳細について教えてください'
  }

  const toggleDetail = (detailId: string) => {
    setSelectedAdditionalDetails((prev) =>
      prev.includes(detailId)
        ? prev.filter((id) => id !== detailId)
        : [...prev, detailId]
    )
  }

  const handleNext = () => {
    const params = new URLSearchParams(searchParams)
    // selectedAdditionalDetails を追加
    if (selectedAdditionalDetails.length > 0) {
      params.set('selectedAdditionalDetails', selectedAdditionalDetails.join(','))
    }
    router.push(`/estimate?${params.toString()}`)
  }

  const handleSkip = () => {
    const params = new URLSearchParams(searchParams)
    router.push(`/estimate?${params.toString()}`)
  }

  // 追加質問がない場合は自動的にestimateページへ
  if (additionalDetailOptions.length === 0) {
    handleSkip()
    return null
  }

  if (!category) {
    router.push('/flow/category')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">4️⃣ STEP 4 / 6</div>
          <div className="text-sm text-primary mb-2">
            📂 選択カテゴリ: {getCategoryDisplayName(category)}
          </div>
          <h1 className="text-3xl font-bold">📝 {getPageTitle()}</h1>
          <p className="text-gray-600 mt-2">複数選択可 ✅（スキップも可能です）</p>
        </div>

        <div className="space-y-3">
          {additionalDetailOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleDetail(option.id)}
              className={`card w-full text-left transition-all ${
                selectedAdditionalDetails.includes(option.id)
                  ? 'ring-2 ring-primary bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div
                    className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center flex-shrink-0 ${
                      selectedAdditionalDetails.includes(option.id)
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAdditionalDetails.includes(option.id) && (
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
                {option.priceRange && (
                  <div className="ml-4 text-sm flex-shrink-0 text-gray-500">
                    {option.priceRange !== '¥0' && <span className="text-xs">目安 </span>}
                    <span className="font-medium">{option.priceRange}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <div className="flex gap-3">
            <button onClick={handleSkip} className="btn-secondary">
              スキップ
            </button>
            <button onClick={handleNext} className="btn-primary">
              次へ →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
