import Link from 'next/link'

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">🚀 相談を始めます</h1>
          <p className="text-gray-600">
            選択式なので、専門用語がわからなくても大丈夫です ✨
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-6">
            📋 まず、何について相談・依頼しますか？
          </h2>
          <p className="text-gray-600 mb-6">
            カテゴリを選んでください 👇
          </p>
          <div className="text-center">
            <Link href="/flow/category" className="btn-primary">
              📂 カテゴリを選ぶ
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
