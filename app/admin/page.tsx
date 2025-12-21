'use client'

import { useState, useEffect } from 'react'
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

export default function AdminPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('')

  useEffect(() => {
    fetchRequests()
  }, [filterStatus])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const url = filterStatus
        ? `/api/requests?status=${filterStatus}`
        : '/api/requests'
      const response = await fetch(url)
      const data = await response.json()
      setRequests(data.requests || [])
    } catch (error) {
      console.error('データ取得エラー:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchRequests()
    } catch (error) {
      console.error('ステータス更新エラー:', error)
    }
  }

  const statuses = ['new', 'contacted', 'in_progress', 'waiting', 'done', 'closed']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">管理画面</h1>
            <Link href="/" className="text-primary hover:underline">
              サイトに戻る
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* フィルター */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-medium">ステータス:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input w-auto"
          >
            <option value="">すべて</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {getStatusDisplayName(status)}
              </option>
            ))}
          </select>
          <button
            onClick={fetchRequests}
            className="btn-secondary py-2 px-4"
          >
            更新
          </button>
        </div>

        {/* 案件一覧 */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">読み込み中...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">案件がありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-lg text-primary">
                        {req.requestId}
                      </span>
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="text-sm px-3 py-1 rounded-full border-2 font-medium"
                        style={{
                          borderColor:
                            req.status === 'new'
                              ? '#ef4444'
                              : req.status === 'done'
                              ? '#10b981'
                              : '#3b82f6',
                          color:
                            req.status === 'new'
                              ? '#ef4444'
                              : req.status === 'done'
                              ? '#10b981'
                              : '#3b82f6',
                        }}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {getStatusDisplayName(status)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(req.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {formatPrice(req.estimateMin)} 〜{' '}
                      {formatPrice(req.estimateMax)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getContactMethodDisplayName(req.contactMethod)}
                      {req.contactTool && ` (${getContactToolDisplayName(req.contactTool)})`}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">カテゴリ:</span>
                    <p className="text-gray-600">
                      {getCategoryDisplayName(req.category)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">内容:</span>
                    <p className="text-gray-600">
                      {req.selectedContent.join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">詳細:</span>
                    <p className="text-gray-600">
                      {req.selectedDetails.join(', ')}
                    </p>
                  </div>
                </div>

                {req.assignedTo && (
                  <div className="mt-3 text-sm">
                    <span className="font-medium text-gray-700">担当者:</span>
                    <span className="ml-2 text-gray-600">{req.assignedTo}</span>
                  </div>
                )}

                {req.internalNotes && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded text-sm">
                    <span className="font-medium text-gray-700">メモ:</span>
                    <p className="text-gray-600 mt-1">{req.internalNotes}</p>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/${req.id}`}
                    className="btn-secondary py-1 px-4 text-sm"
                  >
                    詳細・編集
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
