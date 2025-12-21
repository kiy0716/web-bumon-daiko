'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCategoryDisplayName, formatPrice } from '@/lib/utils'
import { calculateEstimate } from '@/lib/constants'

export default function EstimatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []

  const [estimate, setEstimate] = useState({ min: 0, max: 0 })

  useEffect(() => {
    if (category) {
      const calculatedEstimate = calculateEstimate(
        category,
        selectedContent,
        selectedDetails
      )
      setEstimate(calculatedEstimate)
    }
  }, [category, selectedContent, selectedDetails])

  const handleNext = () => {
    router.push(`/contact?${searchParams.toString()}`)
  }

  if (!category) {
    router.push('/flow/category')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">STEP 4 / 5</div>
          <h1 className="text-3xl font-bold">目安の金額感はこちらです</h1>
        </div>

        <div className="card bg-blue-50 border-2 border-primary">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-700 mb-4">
              目安金額
            </div>
            <div className="text-4xl font-bold text-primary mb-6">
              {formatPrice(estimate.min)} 〜 {formatPrice(estimate.max)}
              <span className="text-lg font-normal text-gray-600">程度</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>※ 内容により前後します</p>
              <p>※ 相談後に正式な金額をご案内します</p>
              <p className="font-bold text-primary">
                ※ この時点では料金は発生しません
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 card">
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
              <span className="font-medium text-gray-700">詳細:</span>
              <span className="ml-2 text-gray-600">
                {selectedDetails.join(', ')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <button onClick={handleNext} className="btn-primary">
            次へ（方法選択） →
          </button>
        </div>
      </div>
    </div>
  )
}
