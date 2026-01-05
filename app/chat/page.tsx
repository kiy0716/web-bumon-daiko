'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { generateRequestId } from '@/lib/utils'
import { calculateEstimate } from '@/lib/constants'
import type { ContactTool } from '@/lib/types'

function ChatPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []

  const [requestId, setRequestId] = useState('')
  const [selectedTool, setSelectedTool] = useState<ContactTool | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const estimate = calculateEstimate(category, selectedContent, selectedDetails)

  useEffect(() => {
    setRequestId(generateRequestId())
  }, [])

  const handleSubmit = async () => {
    if (!selectedTool || !termsAccepted) return

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
          contactMethod: 'chat',
          contactTool: selectedTool,
        }),
      })

      if (response.ok) {
        // セッションストレージに情報を保存
        sessionStorage.setItem(
          'chatRequestData',
          JSON.stringify({
            requestId,
            category,
            selectedContent,
            selectedDetails,
            contactTool: selectedTool,
            estimate,
          })
        )
        router.push(`/done?requestId=${requestId}&contactMethod=chat`)
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
          <h1 className="text-3xl font-bold mb-4">
            💬 チャットで相談を開始します
          </h1>
          <p className="text-gray-600">
            どのチャットツールで相談しますか？選択して「次へ」ボタンを押してください 📋
          </p>
        </div>

        {/* チャットツール選択 */}
        <div className="card mb-6">
          <h2 className="font-bold mb-4">
            📱 どのツールで相談しますか？（選択してください）
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'line' as ContactTool, label: 'LINE', color: 'bg-green-500' },
              {
                id: 'chatwork' as ContactTool,
                label: 'Chatwork',
                color: 'bg-red-500',
              },
              {
                id: 'discord' as ContactTool,
                label: 'Discord',
                color: 'bg-indigo-500',
              },
              {
                id: 'email' as ContactTool,
                label: 'メール',
                color: 'bg-gray-500',
              },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-4 rounded-lg text-white font-bold transition-all ${
                  selectedTool === tool.id
                    ? `${tool.color} ring-2 ring-offset-2 ring-gray-400`
                    : `${tool.color} opacity-60 hover:opacity-100`
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>
              • 次のページで、コピー用の相談内容が表示されます
            </p>
            <p>• そちらを選んだツールに送信してください</p>
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
            disabled={!selectedTool || !termsAccepted || submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '処理中...' : '次へ（相談内容の送信） →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">読み込み中...</div>}>
      <ChatPageContent />
    </Suspense>
  )
}
