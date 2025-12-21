'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoryDisplayName,
  getStatusDisplayName,
  getContactMethodDisplayName,
  getContactToolDisplayName,
  formatDate,
  formatPrice,
} from '@/lib/utils'

interface Request {
  id: string
  requestId: string
  createdAt: string
  category: string
  selectedContent: string[]
  selectedDetails: string[]
  estimateMin: number
  estimateMax: number
  contactMethod: string
  contactTool: string | null
  status: string
  assignedTo: string | null
  internalNotes: string | null
}

export default function AdminDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)
  const [assignedTo, setAssignedTo] = useState('')
  const [internalNotes, setInternalNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchRequest()
  }, [params.id])

  const fetchRequest = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/requests/${params.id}`)
      const data = await response.json()
      setRequest(data.request)
      setAssignedTo(data.request.assignedTo || '')
      setInternalNotes(data.request.internalNotes || '')
    } catch (error) {
      console.error('データ取得エラー:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch(`/api/requests/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo, internalNotes }),
      })
      alert('保存しました')
      fetchRequest()
    } catch (error) {
      console.error('保存エラー:', error)
      alert('エラーが発生しました')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">案件が見つかりません</p>
          <Link href="/admin" className="btn-primary">
            管理画面に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">案件詳細</h1>
            <Link href="/admin" className="btn-secondary py-2 px-4">
              ← 一覧に戻る
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 基本情報 */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">基本情報</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">案件ID</label>
              <p className="font-mono font-bold text-lg text-primary">
                {request.requestId}
              </p>
            </div>
            <div>
              <label className="label">作成日時</label>
              <p>{formatDate(request.createdAt)}</p>
            </div>
            <div>
              <label className="label">ステータス</label>
              <p>{getStatusDisplayName(request.status)}</p>
            </div>
            <div>
              <label className="label">相談方法</label>
              <p>
                {getContactMethodDisplayName(request.contactMethod)}
                {request.contactTool && ` (${getContactToolDisplayName(request.contactTool)})`}
              </p>
            </div>
          </div>
        </div>

        {/* 相談内容 */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">相談内容</h2>
          <div className="space-y-4">
            <div>
              <label className="label">カテゴリ</label>
              <p>{getCategoryDisplayName(request.category)}</p>
            </div>
            <div>
              <label className="label">内容</label>
              <p>{request.selectedContent.join(', ')}</p>
            </div>
            <div>
              <label className="label">詳細</label>
              <p>{request.selectedDetails.join(', ')}</p>
            </div>
            <div>
              <label className="label">目安金額</label>
              <p className="text-lg font-bold text-primary">
                {formatPrice(request.estimateMin)} 〜{' '}
                {formatPrice(request.estimateMax)}
              </p>
            </div>
          </div>
        </div>

        {/* 管理情報 */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">管理情報</h2>
          <div className="space-y-4">
            <div>
              <label className="label">担当者</label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="input"
                placeholder="担当者名を入力"
              />
            </div>
            <div>
              <label className="label">内部メモ</label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="input"
                rows={5}
                placeholder="内部メモを入力"
              />
            </div>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </main>
    </div>
  )
}
