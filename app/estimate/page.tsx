'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { getCategoryDisplayName, formatPrice, getOptionLabel } from '@/lib/utils'
import {
  calculateEstimate,
  calculateCommonPriceRange,
  CONTENT_OPTIONS,
  DETAIL_OPTIONS,
  ADDITIONAL_DETAIL_OPTIONS,
} from '@/lib/constants'

export default function EstimatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []
  const selectedAdditionalDetails = searchParams.get('selectedAdditionalDetails')?.split(',') || []

  // 相談・アドバイスのみかどうか
  const isConsultationOnly = category === 'consultation-only' || category === 'general-consultation' || selectedContent.includes('consultation-advice')

  // selectedDetailsとselectedAdditionalDetailsを統合して計算
  const allDetails = [...selectedDetails, ...selectedAdditionalDetails]
  const estimate = calculateEstimate(category, selectedContent, allDetails)
  const commonRange = calculateCommonPriceRange(
    category,
    selectedContent,
    allDetails
  )

  // IDをラベルに変換
  const contentLabels = selectedContent.map((id) =>
    getOptionLabel(id, category, CONTENT_OPTIONS)
  )
  const detailLabels = selectedDetails.map((id) =>
    getOptionLabel(id, category, DETAIL_OPTIONS)
  )
  const additionalDetailLabels = selectedAdditionalDetails.map((id) =>
    getOptionLabel(id, category, ADDITIONAL_DETAIL_OPTIONS)
  )

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
          <div className="text-sm text-gray-500 mb-2">
            {isConsultationOnly ? '3️⃣ STEP 3 / 4' : '5️⃣ STEP 5 / 6'}
          </div>
          <h1 className="text-3xl font-bold">💰 {isConsultationOnly ? '料金はこちらです' : '目安の金額感はこちらです'}</h1>
        </div>

        <div className="card bg-blue-50 border-2 border-primary">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-700 mb-4">
              📊 {isConsultationOnly ? '料金' : '目安金額'}
            </div>
            {isConsultationOnly ? (
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {formatPrice(estimate.min)}
                  <span className="text-lg font-normal text-gray-600">（税込）</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">40分 / ¥4,000+税</div>
              </div>
            ) : (
              <div className="text-4xl font-bold text-primary mb-2">
                {formatPrice(estimate.min)} 〜 {formatPrice(estimate.max)}
                <span className="text-lg font-normal text-gray-600">程度</span>
              </div>
            )}

            {commonRange && (
              <div className="mt-4 mb-6 pt-4 border-t border-blue-200">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  💡 よくある料金帯
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatPrice(commonRange.min)} 〜{' '}
                  {formatPrice(commonRange.max)}
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    程度
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  多くの場合、この範囲に収まります
                </p>
              </div>
            )}

            {!commonRange && <div className="mb-6"></div>}

            {!isConsultationOnly && (
              <div className="space-y-2 text-sm text-gray-600">
                <p>※ 内容により前後します</p>
                <p>※ 相談後に正式な金額をご案内します</p>
                <p className="font-bold text-primary">
                  ※ この時点では料金は発生しません
                </p>
              </div>
            )}
            {isConsultationOnly && (
              <div className="space-y-2 text-sm text-gray-600 mt-4">
                <p className="font-bold text-primary">
                  ※ この時点では料金は発生しません
                </p>
                <p>※ オンライン会議相談（Google Meet使用）は1回40分です</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 card">
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
                {contentLabels.join(', ')}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">詳細:</span>
              <span className="ml-2 text-gray-600">
                {detailLabels.join(', ')}
              </span>
            </div>
            {selectedAdditionalDetails.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">追加詳細:</span>
                <span className="ml-2 text-gray-600">
                  {additionalDetailLabels.join(', ')}
                </span>
              </div>
            )}
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
