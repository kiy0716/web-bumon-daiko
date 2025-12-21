import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ファーストビュー */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Web部門代行
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Web担当者がいない会社のための、Webの総合窓口
          </p>
          <p className="text-lg text-gray-600 mb-10">
            相談・修正・制作・動画編集まで。必要な分だけ、すぐ頼めます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="btn-primary text-lg px-8 py-4">
              今すぐ相談する
            </Link>
            <a href="#services" className="btn-secondary text-lg px-8 py-4">
              できることを見る
            </a>
          </div>
        </div>
      </section>

      {/* 共感セクション */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Webのことで、こんなことで困っていませんか？
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            Web部門代行とは？
          </h2>
          <div className="card text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Web部門代行は、Webサイト・LP・バナー・動画編集・WordPress・IT相談など、
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
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">できること</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Webサイト・LP',
                items: ['新規制作', '修正・改善', 'スマホ対応', '表示崩れ対応'],
              },
              {
                title: 'デザイン',
                items: ['バナー制作', 'サムネ制作', '画像修正'],
              },
              {
                title: '動画',
                items: ['カット編集', 'テロップ追加', 'サムネ制作'],
              },
              {
                title: 'その他',
                items: ['WordPress相談', 'サーバー・ドメイン', 'PC・ITトラブル'],
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            使い方はとても簡単です
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 'STEP1',
                title: '何をしたいか選ぶ',
                description: '選択式なので、専門用語がわからなくても大丈夫です',
              },
              {
                step: 'STEP2',
                title: '内容と方法を選ぶ',
                description: 'チャットで相談 または Zoom相談を選べます',
              },
              {
                step: 'STEP3',
                title: '金額を確認して支払う',
                description: '目安金額を事前に確認できます',
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
            会員登録は不要です。
          </p>
        </div>
      </section>

      {/* 料金 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            料金は事前に目安がわかります
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
                  { content: 'チャット相談', price: '¥3,000〜' },
                  { content: 'Zoom相談（30分）', price: '¥8,000〜' },
                  { content: 'バナー1枚', price: '¥5,000〜' },
                  { content: 'WordPress修正', price: '¥5,000〜' },
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            よくある不安
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
            まずは気軽に相談してください
          </h2>
          <p className="text-lg mb-10">
            Webのことを一人で悩まなくていい状態をつくります
          </p>
          <Link
            href="/start"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            今すぐ相談する
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p>&copy; 2025 Web部門代行. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
