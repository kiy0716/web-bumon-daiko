import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">📋 利用規約・免責事項</h1>
          <p className="text-gray-600">
            Web部門代行（以下「本サービス」）を利用する際の、最低限のルールと免責事項を定めたものです。
          </p>
        </div>

        <div className="card bg-blue-50 border-2 border-primary mb-6">
          <p className="font-bold text-primary mb-2">📌 本規約の位置づけ</p>
          <p className="text-sm text-gray-700">
            本サービスを利用された時点で、本規約に同意したものとみなします。
          </p>
        </div>

        <div className="space-y-6">
          {/* 第1条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第1条（本サービスの内容）
            </h2>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                本サービスは、Webサイト制作、LP制作、バナー制作、動画編集、WordPress対応、IT相談等に関する
                <strong>相談・依頼の受付および業務支援を行う窓口サービス</strong>
                です。
              </p>
              <p>本サービスは、特定の成果や効果を保証するものではありません。</p>
            </div>
          </div>

          {/* 第2条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第2条（相談・依頼について）
            </h2>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>本サービスで受け付ける内容は、相談・助言・制作・作業代行等を含みます。</li>
              <li>
                具体的な作業内容・金額・納期は、チャットまたはオンライン会議相談（Google Meet使用）後に確定します。
              </li>
              <li>本サービス利用時点では、料金は発生しません。</li>
            </ul>
          </div>

          {/* 第3条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第3条（料金・支払いについて）
            </h2>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>料金は、相談後に個別にご案内します。</li>
              <li>作業内容が確定した後に、費用が発生します。</li>
              <li>支払い方法・支払い時期については、案件ごとに別途ご案内します。</li>
            </ul>
          </div>

          {/* 第4条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第4条（連絡手段・正本について）
            </h2>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>
                本サービスでは、
                <strong>メールおよびチャットでのやり取りを正本</strong>
                とします。
              </li>
              <li>
                システム上に保存される情報は、運営管理のための最小限の台帳情報のみです。
              </li>
              <li>
                相談内容の全文や詳細は、システム上に保存されない場合があります。
              </li>
            </ul>
          </div>

          {/* 第5条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第5条（免責事項）
            </h2>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>
                本サービスを通じて提供される情報・助言・制作物について、その完全性・正確性・有用性・成果を保証するものではありません。
              </li>
              <li>
                本サービス利用により生じた損害について、運営者は故意または重過失がある場合を除き、責任を負いません。
              </li>
              <li>
                外部サービス（Google Meet、LINE、Chatwork、Discord、Google等）の不具合・停止により生じた損害について、運営者は責任を負いません。
              </li>
            </ul>
          </div>

          {/* 第6条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第6条（キャンセル・変更について）
            </h2>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>
                作業開始前であれば、キャンセルや内容変更が可能な場合があります。
              </li>
              <li>
                作業開始後のキャンセル・大幅な変更については、進行状況に応じて費用が発生する場合があります。
              </li>
              <li>詳細は、案件ごとに協議のうえ決定します。</li>
            </ul>
          </div>

          {/* 第7条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第7条（禁止事項）
            </h2>
            <p className="text-sm text-gray-700 mb-2">以下の行為を禁止します。</p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>虚偽の情報を提供する行為</li>
              <li>法令または公序良俗に反する依頼</li>
              <li>第三者の権利を侵害する内容の依頼</li>
              <li>運営の業務を著しく妨げる行為</li>
            </ul>
          </div>

          {/* 第8条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第8条（規約の変更）
            </h2>
            <p className="text-sm text-gray-700">
              本規約は、必要に応じて内容を変更することがあります。変更後の規約は、本サービス上に掲載した時点で効力を持つものとします。
            </p>
          </div>

          {/* 第9条 */}
          <div className="card">
            <h2 className="font-bold text-lg mb-3 text-primary">
              第9条（準拠法）
            </h2>
            <p className="text-sm text-gray-700">
              本規約は、日本法を準拠法とします。
            </p>
          </div>

          {/* お問い合わせ */}
          <div className="card bg-gray-100">
            <h2 className="font-bold text-lg mb-3">📧 お問い合わせ</h2>
            <p className="text-sm text-gray-700">
              本サービスに関するお問い合わせは、チャットまたは指定の連絡手段よりご連絡ください。
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="btn-secondary inline-block">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
