'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function DonePage() {
  const searchParams = useSearchParams()
  const requestId = searchParams.get('requestId') || ''
  const contactMethod = searchParams.get('contactMethod') || ''

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 成功メッセージ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">受付完了しました</h1>
          <p className="text-gray-600">
            ご相談ありがとうございます
          </p>
        </div>

        {/* 案件ID */}
        <div className="card bg-primary text-white text-center mb-6">
          <div className="text-sm mb-1">案件ID</div>
          <div className="text-3xl font-bold">{requestId}</div>
          <div className="text-xs mt-2 opacity-90">
            この番号を控えておいてください
          </div>
        </div>

        {/* 次のステップ */}
        <div className="card mb-6">
          <h2 className="font-bold text-lg mb-4">この後の流れ</h2>
          {contactMethod === 'chat' ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                  1
                </span>
                <span>
                  選んだチャットツールに、コピーした内容を送信してください
                </span>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                  2
                </span>
                <span>担当者から返信があるまでお待ちください</span>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                  3
                </span>
                <span>内容を確認し、正式な金額をご案内します</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                  1
                </span>
                <span>予約確認のメールが届きます</span>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                  2
                </span>
                <span>予約日時にZoomのリンクをお送りします</span>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full mr-3 flex-shrink-0 text-xs">
                  3
                </span>
                <span>Zoom相談で内容を確認し、正式な金額をご案内します</span>
              </div>
            </div>
          )}
        </div>

        {/* 注意事項 */}
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h3 className="font-bold text-sm mb-2">ご確認ください</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• 受付控えメールが届きます</li>
            <li>• 案件ID「{requestId}」を控えておいてください</li>
            <li>• 正式な金額は相談後にご案内します</li>
            <li>• この時点では料金は発生していません</li>
          </ul>
        </div>

        {/* アクション */}
        <div className="text-center">
          <Link href="/" className="btn-primary">
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
