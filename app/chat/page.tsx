'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  getCategoryDisplayName,
  formatPrice,
  generateRequestId,
} from '@/lib/utils'
import { calculateEstimate } from '@/lib/constants'
import type { ContactTool } from '@/lib/types'

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''
  const selectedContent = searchParams.get('selectedContent')?.split(',') || []
  const selectedDetails = searchParams.get('selectedDetails')?.split(',') || []

  const [requestId, setRequestId] = useState('')
  const [selectedTool, setSelectedTool] = useState<ContactTool | null>(null)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const estimate = calculateEstimate(category, selectedContent, selectedDetails)

  useEffect(() => {
    setRequestId(generateRequestId())
  }, [])

  const copyText = `【Web部門代行 相談】
案件ID：${requestId}

■カテゴリ
${getCategoryDisplayName(category)}

■内容
${selectedContent.join(', ')}

■詳細
${selectedDetails.join(', ')}

■目安金額
${formatPrice(estimate.min)}〜${formatPrice(estimate.max)}程度

■補足（任意）
`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    if (!selectedTool) return

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
            チャットで相談を開始します
          </h1>
          <p className="text-gray-600">
            下の内容をコピーして、選んだチャットに貼り付けて送ってください
          </p>
        </div>

        {/* 案件ID */}
        <div className="card bg-primary text-white text-center mb-6">
          <div className="text-sm mb-1">案件ID</div>
          <div className="text-2xl font-bold">{requestId}</div>
        </div>

        {/* コピー用テキスト */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">コピーする内容</h2>
            <button
              onClick={handleCopy}
              className="btn-primary py-2 px-4 text-sm"
            >
              {copied ? 'コピーしました！' : 'コピー'}
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {copyText}
            </pre>
          </div>
        </div>

        {/* チャットツール選択 */}
        <div className="card mb-6">
          <h2 className="font-bold mb-4">
            どのツールで送りますか？（選択してください）
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
              • コピーした内容を、選んだツールに貼り付けて送信してください
            </p>
            <p>• 送信後、下の「完了」ボタンを押してください</p>
          </div>
        </div>

        {/* アクション */}
        <div className="flex justify-between">
          <button onClick={() => router.back()} className="btn-secondary">
            ← 戻る
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedTool || submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '送信中...' : '完了'}
          </button>
        </div>
      </div>
    </div>
  )
}
