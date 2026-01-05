import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ファーストビュー */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            💼 Web部門代行
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Web担当者がいない会社のための、Webの総合窓口 🌐
          </p>
          <p className="text-lg text-gray-600">
            Webサイト・LP・バナー・動画・WordPress・サーバーまで。必要な分だけ、すぐ相談できます。✨
          </p>
        </div>
      </section>

      {/* カテゴリ選択 */}
      <section id="category-select" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            📋 何について相談・依頼しますか？
          </h2>
          <p className="text-center text-gray-600 mb-12">
            カテゴリを選んで、相談を始めましょう
          </p>

          {/* まずはざっくり相談したい方へ */}
          <div className="mb-12">
            <p className="text-gray-700 font-medium mb-3">まずはざっくり相談したい方へ</p>
            <div className="max-w-3xl mx-auto">
              {CATEGORIES.filter(cat => cat.id === 'general-consultation').map((category) => (
                <Link
                  key={category.id}
                  href={`/flow/content?category=${category.id}`}
                  className="block card text-center hover:bg-blue-50 hover:ring-2 hover:ring-primary transition-all bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
                >
                  <h3 className="font-bold text-2xl mb-2">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* 制作・修正を依頼したい方へ */}
          <div className="mb-12">
            <p className="text-gray-700 font-medium mb-3">制作・修正を依頼したい方へ</p>
            <div className="grid md:grid-cols-2 gap-4">
              {CATEGORIES.filter(cat =>
                ['website-lp', 'banner-image', 'video', 'wordpress', 'server-domain', 'pc-it'].includes(cat.id)
              ).map((category) => (
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
                  <Link
                    key={category.id}
                    href={`/flow/content?category=${category.id}`}
                    className="card text-left hover:bg-blue-50 hover:ring-2 hover:ring-primary transition-all"
                  >
                    <h3 className="font-bold text-lg mb-2">{category.label}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* 制作前に相談だけしたい方へ */}
          <div className="mb-12">
            <p className="text-gray-700 font-medium mb-3">制作前に相談だけしたい方へ</p>
            <div className="grid md:grid-cols-2 gap-4">
              {CATEGORIES.filter(cat => cat.id === 'consultation-only').map((category) => (
                <Link
                  key={category.id}
                  href={`/flow/content?category=${category.id}`}
                  className="card text-left hover:bg-blue-50 hover:ring-2 hover:ring-primary transition-all"
                >
                  <h3 className="font-bold text-lg mb-2">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* 継続的なサポートをご希望の方へ */}
          <div className="mb-12">
            <p className="text-gray-700 font-medium mb-3">継続的なサポートをご希望の方へ</p>
            <div className="grid md:grid-cols-2 gap-4">
              {CATEGORIES.filter(cat => cat.id === 'advisory').map((category) => (
                <Link
                  key={category.id}
                  href={`/flow/content?category=${category.id}`}
                  className="card text-left hover:bg-blue-50 hover:ring-2 hover:ring-primary transition-all"
                >
                  <h3 className="font-bold text-lg mb-2">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* その他 */}
          <div>
            <p className="text-gray-700 font-medium mb-3">その他</p>
            <div className="grid md:grid-cols-2 gap-4">
              {CATEGORIES.filter(cat => cat.id === 'unknown').map((category) => (
                <Link
                  key={category.id}
                  href={`/flow/content?category=${category.id}`}
                  className="card text-left hover:bg-blue-50 hover:ring-2 hover:ring-primary transition-all"
                >
                  <h3 className="font-bold text-lg mb-2">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 共感セクション */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            😓 Webのことで、こんなことで困っていませんか？
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '誰に何を頼めばいいかわからない',
              '見積もりが妥当なのか判断できない',
              'ちょっと聞きたいだけなのに大げさになる',
              'フリーランスは当たり外れがある',
              '制作会社は高くて重い',
            ].map((problem, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-light rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <p className="text-gray-700">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サービス定義 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            🤔 Web部門代行とは？
          </h2>
          <div className="card text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Web部門代行は、Webサイト・LP・バナー・動画編集・WordPress・サーバー・ドメイン・IT相談・顧問契約など、
              <br />
              <strong>Webに関することを一括で相談・依頼できるサービス</strong>です。
            </p>
            <p className="text-gray-600">
              制作会社でも、フリーランスでもありません。
              <br />
              Web部門が存在しない会社の「代わり」になる窓口です。
            </p>
          </div>
        </div>
      </section>

      {/* できること一覧 */}
      <section id="services" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">✅ できること</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '🌐 Webサイト・LP',
                items: ['新規制作', '修正・改善', 'リニューアル', '表示崩れ・遅い対応'],
              },
              {
                title: '🎨 バナー・画像',
                items: ['バナー制作', 'サムネ制作', '画像修正・リサイズ'],
              },
              {
                title: '🎬 動画編集',
                items: ['カット編集', 'テロップ追加', 'サムネ制作', 'フル編集'],
              },
              {
                title: '📝 WordPress',
                items: ['修正・不具合対応', 'プラグイン設定', 'セキュリティ対応', '機能追加'],
              },
              {
                title: '🖥️ サーバー・ドメイン',
                items: ['設定・移管', 'トラブル対応', 'SSL証明書', 'メール設定'],
              },
              {
                title: '💻 PC・IT相談',
                items: ['トラブル対応', '設定方法', '使い方サポート'],
              },
              {
                title: '💡 相談・アドバイス',
                items: ['オンライン会議相談（40分）', '制作前の相談', '方針相談'],
              },
              {
                title: '🤝 顧問契約',
                items: ['月額サポート', 'スポット顧問', '継続的な相談'],
              },
            ].map((service, index) => (
              <div key={index} className="card">
                <h3 className="font-bold text-lg mb-3 text-primary">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            📝 使い方はとても簡単です
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1️⃣ STEP1',
                title: 'カテゴリと内容を選ぶ',
                description: '選択式で進むので、専門用語がわからなくても大丈夫です',
              },
              {
                step: '2️⃣ STEP2',
                title: '目安金額を確認',
                description: '選んだ内容に応じた目安金額が表示されます（この時点では料金は発生しません）',
              },
              {
                step: '3️⃣ STEP3',
                title: '相談方法を選ぶ',
                description: 'チャットまたはオンライン会議相談を選んで、依頼内容を確定します',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">
            会員登録は不要です。お支払いは相談・依頼後となります。
          </p>
        </div>
      </section>

      {/* 料金 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            💰 料金は事前に目安がわかります
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    内容
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    料金
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { content: 'オンライン会議相談（40分）', price: '¥4,400（税込）' },
                  { content: 'LP新規制作', price: '¥50,000〜¥120,000' },
                  { content: 'Webサイト新規制作', price: '¥60,000〜¥180,000' },
                  { content: 'バナー制作（1枚）', price: '¥3,000〜¥12,000' },
                  { content: 'WordPress修正', price: '¥3,000〜¥30,000' },
                  { content: '動画編集', price: '¥8,000〜¥30,000' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-3">
                      {item.content}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            見積もりだけのやり取りはありません。必要な分だけ選んで利用できます。
          </p>
        </div>
      </section>

      {/* よくある不安 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            ❓ よくある不安
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'どこまで相談していいですか？',
                answer:
                  'Webに関することなら、どんな内容でも構いません。',
              },
              {
                question: '会員登録は必要ですか？',
                answer: '必要ありません。すぐ利用できます。',
              },
              {
                question: '継続利用はできますか？',
                answer: '可能です。必要なときだけ使えます。',
              },
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-bold text-lg mb-2">Q. {faq.question}</h3>
                <p className="text-gray-600">A. {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            👋 まずは気軽に相談してください
          </h2>
          <p className="text-lg mb-10">
            Webのことを一人で悩まなくていい状態をつくります 🤝
          </p>
          <a
            href="#category-select"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            💬 今すぐ相談する
          </a>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <div className="mb-3">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              📋 利用規約・免責事項
            </Link>
          </div>
          <p>&copy; 2025 Web部門代行. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
