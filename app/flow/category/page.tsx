'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/constants'
import type { Category } from '@/lib/types'

export default function CategoryPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  const handleNext = () => {
    if (!selectedCategory) return
    router.push(`/flow/content?category=${selectedCategory}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">1️⃣ STEP 1 / 6</div>
          <h1 className="text-3xl font-bold">📋 何について相談・依頼しますか？</h1>
        </div>

        {/* すべてのカテゴリ - 2列で表示 */}
        <div className="grid md:grid-cols-2 gap-4">
          {CATEGORIES.map((category) => (
            category.comingSoon ? (
              <div
                key={category.id}
                className="card text-left bg-gray-100 opacity-60 cursor-not-allowed relative"
              >
                <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
                  準備中
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-500">{category.label}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            ) : (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`card text-left transition-all ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-primary bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <h3 className="font-bold text-lg mb-2">{category.label}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </button>
            )
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.back()}
            className="btn-secondary"
          >
            ← 戻る
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedCategory}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  )
}
