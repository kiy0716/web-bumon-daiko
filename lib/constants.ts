// 定数定義
import type { CategoryOption, ContentOption, DetailOption } from './types'

// カテゴリ選択肢
export const CATEGORIES: CategoryOption[] = [
  {
    id: 'general-consultation',
    label: '💬 まずは色々相談したい',
    description: 'オンライン会議で気軽に相談（40分 / ¥4,000+税）',
  },
  {
    id: 'youtube-consultation',
    label: '🎥 YouTubeの内容について詳しく知りたい',
    description: 'チャンネルで紹介した内容の質問・相談（40分 / ¥4,000+税）',
  },
  {
    id: 'website-lp',
    label: '🌐 Webサイト・LP',
    description: '新規制作・修正・改善など',
  },
  {
    id: 'banner-image',
    label: '🎨 バナー・画像',
    description: 'バナー・サムネ・画像の制作・修正',
  },
  {
    id: 'video',
    label: '🎬 動画編集',
    description: 'カット・テロップ・サムネなど',
    comingSoon: true,
  },
  {
    id: 'wordpress',
    label: '📝 WordPress',
    description: '修正・不具合対応・相談',
  },
  {
    id: 'server-domain',
    label: '🖥️ サーバー・ドメイン',
    description: '設定・移管・トラブル対応',
  },
  {
    id: 'pc-it',
    label: '💻 PC・IT相談',
    description: 'トラブル・設定・使い方など',
    comingSoon: true,
  },
  {
    id: 'consultation-only',
    label: '💡 制作ではなく相談・アドバイスが欲しい',
    description: 'オンライン会議で相談したい方はこちら',
  },
  {
    id: 'advisory',
    label: '🤝 顧問契約を頼みたい',
    description: '継続的なサポート・相談',
  },
]

// カテゴリ別の内容選択肢
export const CONTENT_OPTIONS: Record<string, ContentOption[]> = {
  'general-consultation': [{ id: 'zoom-consultation', label: 'オンライン会議で相談したい（40分 / ¥4,000+税）' }],
  'youtube-consultation': [{ id: 'zoom-consultation', label: 'オンライン会議で相談したい（40分 / ¥4,000+税）' }],
  'website-lp': [
    { id: 'new-lp', label: 'LPを新しく作りたい' },
    { id: 'new-website', label: 'Webサイトを新しく作りたい' },
    { id: 'renewal-lp', label: 'LPをリニューアルしたい' },
    { id: 'renewal-website', label: 'Webサイトをリニューアルしたい' },
    { id: 'modify', label: '修正したい' },
    { id: 'broken', label: '表示が崩れている' },
    { id: 'slow', label: '表示が遅い' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'banner-image': [
    { id: 'new-banner', label: 'バナーを作りたい' },
    { id: 'thumbnail', label: 'サムネを作りたい' },
    { id: 'edit-image', label: '画像を修正したい' },
    { id: 'resize', label: 'サイズを変更したい' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  video: [
    { id: 'cut', label: 'カット編集' },
    { id: 'telop', label: 'テロップ追加' },
    { id: 'thumbnail', label: 'サムネ制作' },
    { id: 'full-edit', label: 'フル編集' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  wordpress: [
    { id: 'text-image-fix', label: 'テキスト・画像を修正したい' },
    { id: 'plugin-issue', label: 'プラグインの設定・トラブル対応' },
    { id: 'error-fix', label: 'エラーを修正したい' },
    { id: 'display-broken', label: '表示が崩れている' },
    { id: 'security', label: 'セキュリティ対応（ハッキング、更新など）' },
    { id: 'backup-restore', label: 'バックアップ・復元' },
    { id: 'add-function', label: '機能を追加したい' },
    { id: 'regular-maintenance', label: '定期的なメンテナンスをお願いしたい（顧問契約推奨）' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'server-domain': [
    { id: 'setup', label: '設定したい' },
    { id: 'transfer', label: '移管したい' },
    { id: 'trouble', label: 'トラブル対応' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'pc-it': [
    { id: 'trouble', label: 'トラブル対応' },
    { id: 'setup', label: '設定方法を知りたい' },
    { id: 'usage', label: '使い方がわからない' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'consultation-only': [{ id: 'zoom-consultation', label: 'オンライン会議で相談したい（40分 / ¥4,000+税）' }],
  advisory: [
    { id: 'monthly', label: '月額顧問契約' },
    { id: 'consultation-advice', label: '月額顧問契約（相談・アドバイスのみ）' },
  ],
}

// カテゴリ別の詳細選択肢（category-content の組み合わせで特化した質問）
export const DETAIL_OPTIONS: Record<string, DetailOption[]> = {
  // LP新規制作 - STEP 3（大項目のみ）
  'website-lp-new-lp': [
    { id: 'design-from-scratch', label: 'ゼロから一緒に考えて作りたい' },
    { id: 'design-with-reference', label: '参考サイトを元に一緒に考えて作りたい' },
    { id: 'design-reference-full', label: '参考サイトを元にお任せで作りたい' },
    { id: 'design-data-coding', label: 'デザインデータ（Figma/XD/PSDなど）はあるのでコーディングをお願いしたい' },
    { id: 'lp-renewal', label: '既存LPのリニューアル・改善' },
    { id: 'lp-quick', label: '簡易的なLPを短納期で作りたい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // Webサイト新規制作 - STEP 3（大項目のみ）
  'website-lp-new-website': [
    { id: 'design-from-scratch', label: 'ゼロから一緒に考えて作りたい' },
    { id: 'design-with-reference', label: '参考サイトを元に一緒に考えて作りたい' },
    { id: 'design-reference-full', label: '参考サイトを元にお任せで作りたい' },
    { id: 'design-data-coding', label: 'デザインデータ（Figma/XD/PSDなど）はあるのでコーディングをお願いしたい' },
    { id: 'website-renewal', label: '既存サイトのリニューアル・改善' },
    { id: 'website-quick', label: '簡易的なサイトを短納期で作りたい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // LP・Webサイト - 修正 - STEP 3（大項目のみ）
  'website-lp-modify': [
    { id: 'text-modification', label: 'テキスト（文章）の修正' },
    { id: 'image-replacement', label: '画像・写真の差し替え' },
    { id: 'design-layout-change', label: 'デザイン・レイアウトの変更' },
    { id: 'link-button-fix', label: 'リンク・ボタンの修正' },
    { id: 'content-add-remove', label: '情報の追加・削除' },
    { id: 'overall-renewal', label: '全体的な見直し・リニューアル' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // LP・Webサイト - 表示が崩れている - STEP 3（大項目のみ）
  'website-lp-broken': [
    { id: 'broken-one-page', label: '1ページだけ崩れている' },
    { id: 'broken-overall', label: '全体的に崩れている' },
    { id: 'broken-check-only', label: 'よくわからないからチェックだけして欲しい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // LP・Webサイト - 表示が遅い - STEP 3（大項目のみ）
  'website-lp-slow': [
    { id: 'slow-overall', label: '全体的に遅い' },
    { id: 'slow-images', label: '画像の読み込みが遅い' },
    { id: 'slow-first-load', label: '初回表示が遅い' },
    { id: 'slow-check-only', label: 'よくわからないからチェックだけして欲しい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // LPリニューアル - STEP 3（大項目のみ）
  'website-lp-renewal-lp': [
    { id: 'renewal-full', label: '全面的にリニューアルしたい' },
    { id: 'renewal-design', label: 'デザインだけ刷新したい' },
    { id: 'renewal-content', label: '内容・構成を見直したい' },
    { id: 'renewal-modernize', label: '古くなったので今風にしたい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // Webサイトリニューアル - STEP 3（大項目のみ）
  'website-lp-renewal-website': [
    { id: 'renewal-full', label: '全面的にリニューアルしたい' },
    { id: 'renewal-design', label: 'デザインだけ刷新したい' },
    { id: 'renewal-content', label: '内容・構成を見直したい' },
    { id: 'renewal-modernize', label: '古くなったので今風にしたい' },
    { id: 'renewal-add-features', label: '機能を追加したい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // Webサイト・LP - 相談・アドバイスのみ - STEP 3（実際は使われない）
  'website-lp-consultation-advice': [
    { id: 'zoom-consultation', label: 'オンライン会議で相談したい（40分 / ¥4,000+税）' },
  ],
  // LP・Webサイト - その他（旧フォールバック用）
  'website-lp': [
    { id: 'one-page', label: '1ページだけ' },
    { id: 'multiple-pages', label: '複数ページ' },
    { id: 'text-only', label: 'テキストのみ' },
    { id: 'design-only', label: 'デザインのみ' },
    { id: 'both', label: '両方' },
    { id: 'urgent', label: '⚡ 急ぎ（即日・短納期）' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  // バナー新規制作 - STEP 3（大項目のみ）
  'banner-image-new-banner': [
    { id: 'web-ad-banner', label: 'Web広告用バナー' },
    { id: 'sns-post-image', label: 'SNS投稿用画像' },
    { id: 'youtube-thumbnail', label: 'YouTubeサムネイル' },
    { id: 'eyecatch-image', label: 'ブログ・記事のアイキャッチ画像' },
    { id: 'other-banner', label: 'その他バナー・画像' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // サムネ制作 - STEP 3（大項目のみ）
  'banner-image-thumbnail': [
    { id: 'youtube-thumbnail', label: 'YouTubeサムネイル' },
    { id: 'sns-thumbnail', label: 'SNS投稿用サムネ' },
    { id: 'blog-eyecatch', label: 'ブログ・記事のアイキャッチ' },
    { id: 'other-thumbnail', label: 'その他サムネイル' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // 画像修正 - STEP 3（大項目のみ）
  'banner-image-edit-image': [
    { id: 'color-adjustment', label: '色調補正・明るさ調整' },
    { id: 'crop-resize', label: 'トリミング・サイズ調整' },
    { id: 'text-logo-edit', label: 'テキスト・ロゴの追加や修正' },
    { id: 'background-change', label: '背景の変更・透過処理' },
    { id: 'overall-edit', label: '全体的な修正・調整' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // サイズ変更 - STEP 3（大項目のみ）
  'banner-image-resize': [
    { id: 'multi-size-expand', label: '1サイズから複数サイズへ展開' },
    { id: 'platform-resize', label: '異なる媒体用にリサイズ' },
    { id: 'resize-with-crop', label: 'トリミング位置の調整も含む' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  video: [
    { id: 'short', label: '短い動画（5分以内）' },
    { id: 'medium', label: '中程度の動画（5〜15分）' },
    { id: 'long', label: '長い動画（15分以上）' },
    { id: 'simple-edit', label: 'シンプルな編集' },
    { id: 'complex-edit', label: '凝った編集' },
    { id: 'urgent', label: '⚡ 急ぎ（即日・短納期）' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  // WordPress - テキスト・画像修正 - STEP 3
  'wordpress-text-image-fix': [
    { id: 'fix-one-location', label: '1箇所の修正' },
    { id: 'fix-few-locations', label: '数箇所の修正（2〜5箇所）' },
    { id: 'fix-many-locations', label: '多数の修正（6箇所以上）' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - プラグイン問題 - STEP 3
  'wordpress-plugin-issue': [
    { id: 'plugin-famous', label: '有名なプラグイン（Contact Form 7、Yoastなど）' },
    { id: 'plugin-minor', label: 'マイナーなプラグイン' },
    { id: 'plugin-custom', label: 'カスタムプラグイン・独自開発' },
    { id: 'plugin-conflict', label: 'プラグイン同士の競合' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - エラー修正 - STEP 3
  'wordpress-error-fix': [
    { id: 'error-minor', label: '軽微なエラー（表示は正常）' },
    { id: 'error-moderate', label: '中程度のエラー（一部機能が動かない）' },
    { id: 'error-critical', label: '深刻なエラー（サイトが表示されない）' },
    { id: 'error-unknown', label: 'エラーの原因がわからない' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - 表示崩れ - STEP 3
  'wordpress-display-broken': [
    { id: 'broken-one-page', label: '1ページだけ崩れている' },
    { id: 'broken-few-pages', label: '複数ページで崩れている' },
    { id: 'broken-whole-site', label: 'サイト全体が崩れている' },
    { id: 'broken-mobile-only', label: 'スマホだけ崩れている' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - セキュリティ対応 - STEP 3
  'wordpress-security': [
    { id: 'security-hacked', label: 'ハッキング被害を受けた' },
    { id: 'security-update', label: 'WordPress本体・プラグインの更新' },
    { id: 'security-prevention', label: 'セキュリティ対策を強化したい' },
    { id: 'security-malware', label: 'マルウェア・ウイルスの除去' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - バックアップ・復元 - STEP 3
  'wordpress-backup-restore': [
    { id: 'backup-setup', label: '定期バックアップの設定' },
    { id: 'backup-restore', label: 'バックアップから復元したい' },
    { id: 'backup-migration', label: 'サーバー移行・引っ越し' },
    { id: 'backup-emergency', label: '緊急復旧が必要' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - 機能追加 - STEP 3
  'wordpress-add-function': [
    { id: 'function-simple', label: '簡易的な機能追加（お問い合わせフォームなど）' },
    { id: 'function-moderate', label: '中程度の機能追加（会員登録、予約システムなど）' },
    { id: 'function-complex', label: '複雑な機能追加（ECサイト化、カスタム機能など）※顧問契約推奨' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  // WordPress - 定期メンテナンス - STEP 3（顧問契約へ誘導）
  'wordpress-regular-maintenance': [
    { id: 'maintenance-advisory', label: '顧問契約について詳しく知りたい' },
    { id: 'consultation-advice', label: '制作ではなく相談・アドバイスが欲しい' },
  ],
  'server-domain': [
    { id: 'new-setup', label: '新規設定' },
    { id: 'change-existing', label: '既存の変更・移管' },
    { id: 'trouble', label: 'トラブル対応' },
    { id: 'ssl', label: 'SSL証明書関連' },
    { id: 'email', label: 'メール設定' },
    { id: 'urgent', label: '⚡ 急ぎ（即日・短納期）' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'pc-it': [
    { id: 'remote', label: 'リモート対応可能' },
    { id: 'onsite', label: '訪問が必要' },
    { id: 'emergency', label: '緊急対応' },
    { id: 'training', label: '使い方の指導' },
    { id: 'urgent', label: '⚡ 急ぎ（即日・短納期）' },
    { id: 'consultation-advice', label: '💡 制作ではなく相談・アドバイスが欲しい' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  unknown: [
    { id: 'chat', label: 'チャットで相談したい' },
    { id: 'zoom', label: 'オンライン会議で相談したい' },
  ],
  advisory: [
    { id: 'monthly-once', label: '月1回程度のサポート' },
    { id: 'weekly', label: '週1回程度のサポート' },
    { id: 'anytime', label: '随時対応が必要' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'advisory-monthly': [
    { id: 'monthly-once', label: '月1回程度のサポート' },
    { id: 'weekly', label: '週1回程度のサポート' },
    { id: 'anytime', label: '随時対応が必要' },
    { id: 'unknown', label: 'よくわからない' },
  ],
  'advisory-consultation-advice': [
    { id: 'monthly-once', label: '月1回程度のサポート' },
    { id: 'weekly', label: '週1回程度のサポート' },
    { id: 'anytime', label: '随時対応が必要' },
    { id: 'unknown', label: 'よくわからない' },
  ],
}

// STEP 4用の追加詳細選択肢（LP新規制作など、さらに詳しく聞く場合）
export const ADDITIONAL_DETAIL_OPTIONS: Record<string, DetailOption[]> = {
  // LP新規制作 - STEP 4（詳細質問）
  'website-lp-new-lp': [
    { id: 'content-ready', label: '原稿・写真素材は用意できる', priceRange: '¥0' },
    { id: 'content-help', label: '原稿作成も手伝ってほしい', priceRange: '¥20,000〜¥50,000' },
    { id: 'photo-help', label: '写真素材も用意してほしい', priceRange: '¥10,000〜¥30,000' },
    { id: 'form-simple', label: 'シンプルなお問い合わせフォーム', priceRange: '¥0' },
    { id: 'form-complex', label: '複数項目のフォーム（選択肢・ファイル添付等）', priceRange: '¥15,000〜¥30,000' },
    { id: 'animation-simple', label: 'シンプルなアニメーション（フェードイン等）', priceRange: '¥5,000〜¥10,000' },
    { id: 'animation-rich', label: '凝ったアニメーション（スクロール連動等）', priceRange: '¥15,000〜¥40,000' },
    { id: 'urgent', label: '⚡ 急ぎ（2週間以内）', priceRange: '¥20,000〜¥50,000' },
  ],
  // Webサイト新規制作 - STEP 4（詳細質問）
  'website-lp-new-website': [
    { id: 'pages-small', label: '小規模（2〜5ページ程度）', priceRange: '¥0' },
    { id: 'pages-medium', label: '中規模（6〜10ページ程度）', priceRange: '¥30,000〜¥80,000' },
    { id: 'pages-large', label: '大規模（11ページ以上）', priceRange: '¥100,000〜¥200,000' },
    { id: 'content-ready', label: '原稿・写真素材は用意できる', priceRange: '¥0' },
    { id: 'content-help', label: '原稿作成も手伝ってほしい', priceRange: '¥30,000〜¥80,000' },
    { id: 'photo-help', label: '写真素材も用意してほしい', priceRange: '¥20,000〜¥50,000' },
    { id: 'cms-wordpress', label: 'WordPress（自分で更新したい）', priceRange: '¥30,000〜¥50,000' },
    { id: 'cms-other', label: 'その他CMS（microCMS等）', priceRange: '¥40,000〜¥80,000' },
    { id: 'blog-needed', label: 'ブログ・お知らせ機能が必要', priceRange: '¥20,000〜¥40,000' },
    { id: 'form-needed', label: 'お問い合わせフォームが必要', priceRange: '¥10,000〜¥20,000' },
    { id: 'member-needed', label: '会員機能・ログインが必要', priceRange: '¥80,000〜¥150,000' },
    { id: 'urgent', label: '⚡ 急ぎ（1ヶ月以内）', priceRange: '¥30,000〜¥80,000' },
  ],
  // LP・Webサイト - 修正 - STEP 4（詳細質問）
  'website-lp-modify': [
    { id: 'scope-one-page', label: '1ページのみの修正', priceRange: '¥0' },
    { id: 'scope-few-pages', label: '数ページの修正（2〜5ページ）', priceRange: '¥5,000〜¥15,000' },
    { id: 'scope-many-pages', label: '多数ページの修正（6ページ以上）', priceRange: '¥20,000〜¥50,000' },
    { id: 'timing-normal', label: '通常納期（1〜2週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（即日〜3日以内）', priceRange: '¥10,000〜¥30,000' },
  ],
  // LP・Webサイト - 表示が崩れている - STEP 4（詳細質問）
  'website-lp-broken': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（即日〜3日以内）', priceRange: '¥10,000〜¥30,000' },
    { id: 'timing-emergency', label: '🚨 緊急対応（数時間以内）', priceRange: '¥20,000〜¥50,000' },
  ],
  // LP・Webサイト - 表示が遅い - STEP 4（詳細質問）
  'website-lp-slow': [
    { id: 'timing-normal', label: '通常対応（1〜2週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（即日〜3日以内）', priceRange: '¥10,000〜¥30,000' },
    { id: 'timing-emergency', label: '🚨 緊急対応（数時間以内）', priceRange: '¥20,000〜¥50,000' },
  ],
  // LPリニューアル - STEP 4（詳細質問）
  'website-lp-renewal-lp': [
    { id: 'content-ready', label: '原稿・写真素材は用意できる', priceRange: '¥0' },
    { id: 'content-help', label: '原稿作成も手伝ってほしい', priceRange: '¥20,000〜¥50,000' },
    { id: 'photo-help', label: '写真素材も用意してほしい', priceRange: '¥10,000〜¥30,000' },
    { id: 'form-simple', label: 'シンプルなお問い合わせフォーム', priceRange: '¥0' },
    { id: 'form-complex', label: '複数項目のフォーム（選択肢・ファイル添付等）', priceRange: '¥15,000〜¥30,000' },
    { id: 'animation-simple', label: 'シンプルなアニメーション（フェードイン等）', priceRange: '¥5,000〜¥10,000' },
    { id: 'animation-rich', label: '凝ったアニメーション（スクロール連動等）', priceRange: '¥15,000〜¥40,000' },
    { id: 'urgent', label: '⚡ 急ぎ（1ヶ月以内）', priceRange: '¥20,000〜¥50,000' },
  ],
  // Webサイトリニューアル - STEP 4（詳細質問）
  'website-lp-renewal-website': [
    { id: 'pages-small', label: '小規模（2〜5ページ程度）', priceRange: '¥0' },
    { id: 'pages-medium', label: '中規模（6〜10ページ程度）', priceRange: '¥30,000〜¥80,000' },
    { id: 'pages-large', label: '大規模（11ページ以上）', priceRange: '¥100,000〜¥200,000' },
    { id: 'content-ready', label: '原稿・写真素材は用意できる', priceRange: '¥0' },
    { id: 'content-help', label: '原稿作成も手伝ってほしい', priceRange: '¥30,000〜¥80,000' },
    { id: 'photo-help', label: '写真素材も用意してほしい', priceRange: '¥20,000〜¥50,000' },
    { id: 'cms-wordpress', label: 'WordPress（自分で更新したい）', priceRange: '¥30,000〜¥50,000' },
    { id: 'cms-other', label: 'その他CMS（microCMS等）', priceRange: '¥40,000〜¥80,000' },
    { id: 'blog-needed', label: 'ブログ・お知らせ機能が必要', priceRange: '¥20,000〜¥40,000' },
    { id: 'form-needed', label: 'お問い合わせフォームが必要', priceRange: '¥10,000〜¥20,000' },
    { id: 'member-needed', label: '会員機能・ログインが必要', priceRange: '¥80,000〜¥150,000' },
    { id: 'urgent', label: '⚡ 急ぎ（1ヶ月以内）', priceRange: '¥30,000〜¥80,000' },
  ],
  // バナー新規制作 - STEP 4（枚数・納期）
  'banner-image-new-banner': [
    { id: 'quantity-one', label: '1枚のみ', priceRange: '¥0' },
    { id: 'quantity-few', label: '2〜5枚', priceRange: '¥3,000〜¥10,000' },
    { id: 'quantity-many', label: '6枚以上', priceRange: '¥15,000〜¥30,000' },
    { id: 'timing-normal', label: '通常納期（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥3,000〜¥8,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥5,000〜¥15,000' },
  ],
  // サムネ制作 - STEP 4（枚数・納期）
  'banner-image-thumbnail': [
    { id: 'quantity-one', label: '1枚のみ', priceRange: '¥0' },
    { id: 'quantity-few', label: '2〜5枚', priceRange: '¥2,000〜¥8,000' },
    { id: 'quantity-many', label: '6枚以上', priceRange: '¥10,000〜¥25,000' },
    { id: 'timing-normal', label: '通常納期（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥2,000〜¥5,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥3,000〜¥10,000' },
  ],
  // 画像修正 - STEP 4（枚数・納期）
  'banner-image-edit-image': [
    { id: 'quantity-one', label: '1枚のみ', priceRange: '¥0' },
    { id: 'quantity-few', label: '2〜5枚', priceRange: '¥2,000〜¥5,000' },
    { id: 'quantity-many', label: '6枚以上', priceRange: '¥8,000〜¥20,000' },
    { id: 'timing-normal', label: '通常納期（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥2,000〜¥5,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥3,000〜¥8,000' },
  ],
  // サイズ変更 - STEP 4（枚数・納期）
  'banner-image-resize': [
    { id: 'quantity-one', label: '1枚のみ', priceRange: '¥0' },
    { id: 'quantity-few', label: '2〜5枚', priceRange: '¥1,000〜¥3,000' },
    { id: 'quantity-many', label: '6枚以上', priceRange: '¥5,000〜¥15,000' },
    { id: 'timing-normal', label: '通常納期（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥1,000〜¥3,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥2,000〜¥5,000' },
  ],
  // WordPress - テキスト・画像修正 - STEP 4（緊急度）
  'wordpress-text-image-fix': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥3,000〜¥8,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥5,000〜¥15,000' },
  ],
  // WordPress - プラグイン問題 - STEP 4（緊急度）
  'wordpress-plugin-issue': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥5,000〜¥15,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥10,000〜¥30,000' },
  ],
  // WordPress - エラー修正 - STEP 4（緊急度）
  'wordpress-error-fix': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥5,000〜¥15,000' },
    { id: 'timing-immediate', label: '🚨 即日対応', priceRange: '¥10,000〜¥30,000' },
  ],
  // WordPress - 表示崩れ - STEP 4（緊急度）
  'wordpress-display-broken': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥5,000〜¥15,000' },
    { id: 'timing-immediate', label: '🚨 緊急対応（数時間以内）', priceRange: '¥15,000〜¥40,000' },
  ],
  // WordPress - セキュリティ対応 - STEP 4（緊急度）
  'wordpress-security': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥10,000〜¥30,000' },
    { id: 'timing-immediate', label: '🚨 緊急対応（数時間以内・ハッキング被害時）', priceRange: '¥30,000〜¥80,000' },
  ],
  // WordPress - バックアップ・復元 - STEP 4（緊急度）
  'wordpress-backup-restore': [
    { id: 'timing-normal', label: '通常対応（1週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（2〜3日以内）', priceRange: '¥5,000〜¥15,000' },
    { id: 'timing-immediate', label: '🚨 緊急復旧（数時間以内）', priceRange: '¥15,000〜¥50,000' },
  ],
  // WordPress - 機能追加 - STEP 4（緊急度）
  'wordpress-add-function': [
    { id: 'timing-normal', label: '通常対応（2週間程度）', priceRange: '¥0' },
    { id: 'timing-urgent', label: '⚡ 急ぎ（1週間以内）', priceRange: '¥10,000〜¥30,000' },
  ],
}

// 目安金額の計算（簡易版）
export function calculateEstimate(
  category: string,
  selectedContent: string[],
  selectedDetails: string[]
): { min: number; max: number } {
  // 相談・アドバイスだけの場合は固定金額
  if (
    category === 'consultation-only' ||
    category === 'general-consultation' ||
    category === 'youtube-consultation' ||
    selectedContent.includes('consultation-advice') ||
    selectedContent.includes('consultation') ||
    selectedDetails.includes('consultation')
  ) {
    // consultation-only, general-consultation, youtube-consultation または consultation-advice の場合は 40分 / ¥4,000+税
    if (category === 'consultation-only' || category === 'general-consultation' || category === 'youtube-consultation' || selectedContent.includes('consultation-advice')) {
      return { min: 4400, max: 4400 } // 税込
    }
    return { min: 3000, max: 5000 }
  }

  // カテゴリベースの基本金額
  const baseEstimates: Record<string, { min: number; max: number }> = {
    'website-lp': { min: 10000, max: 150000 },
    'banner-image': { min: 3000, max: 10000 },
    video: { min: 8000, max: 30000 },
    wordpress: { min: 5000, max: 50000 },
    'server-domain': { min: 5000, max: 30000 },
    'pc-it': { min: 3000, max: 20000 },
    'consultation-only': { min: 4400, max: 4400 },
    'general-consultation': { min: 4400, max: 4400 },
    'youtube-consultation': { min: 4400, max: 4400 },
    advisory: { min: 30000, max: 100000 },
  }

  let estimate = baseEstimates[category] || { min: 3000, max: 10000 }

  // LP新規制作の場合
  if (selectedContent.includes('new-lp')) {
    estimate = { min: 50000, max: 120000 }

    // LP新規制作の詳細による調整
    if (selectedDetails.includes('design-from-scratch')) {
      // ゼロから一緒に考える場合は高め
      estimate = { min: estimate.min * 1.2, max: estimate.max * 1.3 }
    }
    if (selectedDetails.includes('design-data-coding')) {
      // デザインデータがある場合は少し安く
      estimate = { min: estimate.min * 0.7, max: estimate.max * 0.8 }
    }
    if (selectedDetails.includes('lp-renewal')) {
      // リニューアルの場合
      estimate = { min: estimate.min * 0.9, max: estimate.max * 1.0 }
    }
    if (selectedDetails.includes('lp-quick')) {
      // 簡易LP
      estimate = { min: estimate.min * 0.6, max: estimate.max * 0.7 }
    }
  }

  // Webサイト新規制作の場合
  if (selectedContent.includes('new-website')) {
    estimate = { min: 80000, max: 200000 }

    // Webサイト新規制作の詳細による調整
    if (selectedDetails.includes('design-from-scratch')) {
      // ゼロから一緒に考える場合は高め
      estimate = { min: estimate.min * 1.2, max: estimate.max * 1.3 }
    }
    if (selectedDetails.includes('design-data-coding')) {
      // デザインデータがある場合は少し安く
      estimate = { min: estimate.min * 0.7, max: estimate.max * 0.8 }
    }
    if (selectedDetails.includes('website-renewal')) {
      // リニューアルの場合
      estimate = { min: estimate.min * 0.9, max: estimate.max * 1.0 }
    }
    if (selectedDetails.includes('website-quick')) {
      // 簡易サイト
      estimate = { min: estimate.min * 0.6, max: estimate.max * 0.7 }
    }
  }

  // 修正の場合
  if (selectedContent.includes('modify')) {
    estimate = { min: 5000, max: 50000 }

    // 修正内容による調整
    if (selectedDetails.includes('text-modification')) {
      estimate = { min: 3000, max: 10000 }
    }
    if (selectedDetails.includes('image-replacement')) {
      estimate = { min: 5000, max: 15000 }
    }
    if (selectedDetails.includes('design-layout-change')) {
      estimate = { min: 10000, max: 30000 }
    }
    if (selectedDetails.includes('link-button-fix')) {
      estimate = { min: 3000, max: 8000 }
    }
    if (selectedDetails.includes('content-add-remove')) {
      estimate = { min: 5000, max: 20000 }
    }
    if (selectedDetails.includes('overall-renewal')) {
      estimate = { min: 30000, max: 100000 }
    }

    // 規模による調整
    if (selectedDetails.includes('scope-few-pages')) {
      estimate = { min: estimate.min * 1.3, max: estimate.max * 1.5 }
    }
    if (selectedDetails.includes('scope-many-pages')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }

    // 急ぎの場合
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.8 }
    }
  }

  // 表示が崩れているの場合
  if (selectedContent.includes('broken')) {
    estimate = { min: 5000, max: 30000 }

    // 崩れの範囲による調整
    if (selectedDetails.includes('broken-one-page')) {
      estimate = { min: 5000, max: 15000 }
    }
    if (selectedDetails.includes('broken-overall')) {
      estimate = { min: 15000, max: 40000 }
    }
    if (selectedDetails.includes('broken-check-only')) {
      // チェックのみの場合は診断費用
      estimate = { min: 3000, max: 10000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.8 }
    }
    if (selectedDetails.includes('timing-emergency')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // 表示が遅いの場合
  if (selectedContent.includes('slow')) {
    estimate = { min: 10000, max: 50000 }

    // 遅い内容による調整
    if (selectedDetails.includes('slow-images')) {
      estimate = { min: 8000, max: 25000 }
    }
    if (selectedDetails.includes('slow-first-load')) {
      estimate = { min: 10000, max: 35000 }
    }
    if (selectedDetails.includes('slow-overall')) {
      estimate = { min: 15000, max: 50000 }
    }
    if (selectedDetails.includes('slow-check-only')) {
      // チェックのみの場合は診断費用
      estimate = { min: 5000, max: 15000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.8 }
    }
    if (selectedDetails.includes('timing-emergency')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // LPリニューアルの場合
  if (selectedContent.includes('renewal-lp')) {
    estimate = { min: 40000, max: 100000 }

    // リニューアル内容による調整
    if (selectedDetails.includes('renewal-design')) {
      estimate = { min: 30000, max: 80000 }
    }
    if (selectedDetails.includes('renewal-content')) {
      estimate = { min: 30000, max: 70000 }
    }
    if (selectedDetails.includes('renewal-full')) {
      estimate = { min: 50000, max: 120000 }
    }
    if (selectedDetails.includes('renewal-modernize')) {
      estimate = { min: 40000, max: 90000 }
    }
  }

  // Webサイトリニューアルの場合
  if (selectedContent.includes('renewal-website')) {
    estimate = { min: 60000, max: 180000 }

    // リニューアル内容による調整
    if (selectedDetails.includes('renewal-design')) {
      estimate = { min: 50000, max: 120000 }
    }
    if (selectedDetails.includes('renewal-content')) {
      estimate = { min: 50000, max: 100000 }
    }
    if (selectedDetails.includes('renewal-full')) {
      estimate = { min: 80000, max: 200000 }
    }
    if (selectedDetails.includes('renewal-modernize')) {
      estimate = { min: 60000, max: 150000 }
    }
    if (selectedDetails.includes('renewal-add-features')) {
      estimate = { min: estimate.min * 1.2, max: estimate.max * 1.5 }
    }
  }

  // 詳細選択による金額調整
  // Webサイトの規模
  if (selectedDetails.includes('pages-small')) {
    estimate = { min: estimate.min, max: estimate.max * 1.0 }
  }
  if (selectedDetails.includes('pages-medium')) {
    estimate = { min: estimate.min * 1.3, max: estimate.max * 1.5 }
  }
  if (selectedDetails.includes('pages-large')) {
    estimate = { min: estimate.min * 1.8, max: estimate.max * 2.5 }
  }

  // デザイン
  if (selectedDetails.includes('design-ready')) {
    // デザインがある場合は少し安く
    estimate = { min: estimate.min * 0.7, max: estimate.max * 0.8 }
  }
  if (selectedDetails.includes('design-reference')) {
    // 通常
  }
  if (selectedDetails.includes('design-full')) {
    // デザインから必要な場合は高め
    estimate = { min: estimate.min * 1.3, max: estimate.max * 1.5 }
  }

  // コンテンツ
  if (selectedDetails.includes('content-help')) {
    estimate = { min: estimate.min * 1.2, max: estimate.max * 1.3 }
  }
  if (selectedDetails.includes('photo-help')) {
    estimate = { min: estimate.min * 1.15, max: estimate.max * 1.25 }
  }

  // 機能追加
  if (selectedDetails.includes('cms-wordpress') || selectedDetails.includes('cms-other')) {
    estimate = { min: estimate.min * 1.2, max: estimate.max * 1.4 }
  }
  if (selectedDetails.includes('blog-needed')) {
    estimate = { min: estimate.min * 1.15, max: estimate.max * 1.3 }
  }
  if (selectedDetails.includes('member-needed')) {
    estimate = { min: estimate.min * 1.5, max: estimate.max * 2.0 }
  }
  if (selectedDetails.includes('form-complex')) {
    estimate = { min: estimate.min * 1.1, max: estimate.max * 1.2 }
  }
  if (selectedDetails.includes('animation-rich')) {
    estimate = { min: estimate.min * 1.2, max: estimate.max * 1.3 }
  }

  // Webサイト・LP（旧ロジック）
  if (selectedDetails.includes('multiple-pages')) {
    estimate = { min: estimate.min, max: estimate.max * 1.5 }
  }

  // バナー新規制作の場合
  if (selectedContent.includes('new-banner')) {
    estimate = { min: 3000, max: 10000 }

    // バナータイプによる調整
    if (selectedDetails.includes('web-ad-banner')) {
      estimate = { min: 4000, max: 12000 }
    }
    if (selectedDetails.includes('sns-post-image')) {
      estimate = { min: 3000, max: 10000 }
    }
    if (selectedDetails.includes('youtube-thumbnail')) {
      estimate = { min: 3000, max: 8000 }
    }
    if (selectedDetails.includes('eyecatch-image')) {
      estimate = { min: 2000, max: 6000 }
    }
    if (selectedDetails.includes('other-banner')) {
      estimate = { min: 3000, max: 10000 }
    }

    // 枚数による調整
    if (selectedDetails.includes('quantity-few')) {
      estimate = { min: estimate.min * 2, max: estimate.max * 2.5 }
    }
    if (selectedDetails.includes('quantity-many')) {
      estimate = { min: estimate.min * 4, max: estimate.max * 5 }
    }

    // 納期による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // サムネ制作の場合
  if (selectedContent.includes('thumbnail')) {
    estimate = { min: 2500, max: 8000 }

    // サムネタイプによる調整
    if (selectedDetails.includes('youtube-thumbnail')) {
      estimate = { min: 3000, max: 8000 }
    }
    if (selectedDetails.includes('sns-thumbnail')) {
      estimate = { min: 2500, max: 7000 }
    }
    if (selectedDetails.includes('blog-eyecatch')) {
      estimate = { min: 2000, max: 6000 }
    }
    if (selectedDetails.includes('other-thumbnail')) {
      estimate = { min: 2500, max: 7000 }
    }

    // 枚数による調整
    if (selectedDetails.includes('quantity-few')) {
      estimate = { min: estimate.min * 2, max: estimate.max * 2.5 }
    }
    if (selectedDetails.includes('quantity-many')) {
      estimate = { min: estimate.min * 4, max: estimate.max * 5 }
    }

    // 納期による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // 画像修正の場合
  if (selectedContent.includes('edit-image')) {
    estimate = { min: 2000, max: 6000 }

    // 修正タイプによる調整
    if (selectedDetails.includes('color-adjustment')) {
      estimate = { min: 2000, max: 5000 }
    }
    if (selectedDetails.includes('crop-resize')) {
      estimate = { min: 1500, max: 4000 }
    }
    if (selectedDetails.includes('text-logo-edit')) {
      estimate = { min: 2500, max: 7000 }
    }
    if (selectedDetails.includes('background-change')) {
      estimate = { min: 3000, max: 8000 }
    }
    if (selectedDetails.includes('overall-edit')) {
      estimate = { min: 3000, max: 10000 }
    }

    // 枚数による調整
    if (selectedDetails.includes('quantity-few')) {
      estimate = { min: estimate.min * 2, max: estimate.max * 2 }
    }
    if (selectedDetails.includes('quantity-many')) {
      estimate = { min: estimate.min * 3.5, max: estimate.max * 4 }
    }

    // 納期による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // サイズ変更の場合
  if (selectedContent.includes('resize')) {
    estimate = { min: 1000, max: 3000 }

    // サイズ変更タイプによる調整
    if (selectedDetails.includes('multi-size-expand')) {
      estimate = { min: 1500, max: 4000 }
    }
    if (selectedDetails.includes('platform-resize')) {
      estimate = { min: 1000, max: 3000 }
    }
    if (selectedDetails.includes('resize-with-crop')) {
      estimate = { min: 2000, max: 5000 }
    }

    // 枚数による調整
    if (selectedDetails.includes('quantity-few')) {
      estimate = { min: estimate.min * 2, max: estimate.max * 2 }
    }
    if (selectedDetails.includes('quantity-many')) {
      estimate = { min: estimate.min * 4, max: estimate.max * 5 }
    }

    // 納期による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // 動画編集
  if (selectedDetails.includes('medium')) {
    estimate = { min: estimate.min * 1.3, max: estimate.max * 1.5 }
  }
  if (selectedDetails.includes('long')) {
    estimate = { min: estimate.min * 1.8, max: estimate.max * 2.2 }
  }
  if (selectedDetails.includes('complex-edit')) {
    estimate = { min: estimate.min * 1.5, max: estimate.max * 2 }
  }

  // WordPress - テキスト・画像修正
  if (selectedContent.includes('text-image-fix')) {
    estimate = { min: 3000, max: 10000 }

    // 修正箇所数による調整
    if (selectedDetails.includes('fix-one-location')) {
      estimate = { min: 3000, max: 8000 }
    }
    if (selectedDetails.includes('fix-few-locations')) {
      estimate = { min: 5000, max: 15000 }
    }
    if (selectedDetails.includes('fix-many-locations')) {
      estimate = { min: 10000, max: 30000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // WordPress - プラグイン問題
  if (selectedContent.includes('plugin-issue')) {
    estimate = { min: 5000, max: 20000 }

    // プラグインタイプによる調整
    if (selectedDetails.includes('plugin-famous')) {
      estimate = { min: 5000, max: 15000 }
    }
    if (selectedDetails.includes('plugin-minor')) {
      estimate = { min: 8000, max: 25000 }
    }
    if (selectedDetails.includes('plugin-custom')) {
      estimate = { min: 15000, max: 50000 }
    }
    if (selectedDetails.includes('plugin-conflict')) {
      estimate = { min: 10000, max: 30000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // WordPress - エラー修正
  if (selectedContent.includes('error-fix')) {
    estimate = { min: 8000, max: 30000 }

    // エラーの深刻度による調整
    if (selectedDetails.includes('error-minor')) {
      estimate = { min: 5000, max: 15000 }
    }
    if (selectedDetails.includes('error-moderate')) {
      estimate = { min: 10000, max: 30000 }
    }
    if (selectedDetails.includes('error-critical')) {
      estimate = { min: 20000, max: 60000 }
    }
    if (selectedDetails.includes('error-unknown')) {
      estimate = { min: 10000, max: 50000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // WordPress - 表示崩れ
  if (selectedContent.includes('display-broken')) {
    estimate = { min: 5000, max: 20000 }

    // 崩れの範囲による調整
    if (selectedDetails.includes('broken-one-page')) {
      estimate = { min: 5000, max: 15000 }
    }
    if (selectedDetails.includes('broken-few-pages')) {
      estimate = { min: 10000, max: 30000 }
    }
    if (selectedDetails.includes('broken-whole-site')) {
      estimate = { min: 20000, max: 60000 }
    }
    if (selectedDetails.includes('broken-mobile-only')) {
      estimate = { min: 8000, max: 25000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // WordPress - セキュリティ対応
  if (selectedContent.includes('security')) {
    estimate = { min: 15000, max: 50000 }

    // セキュリティ対応内容による調整
    if (selectedDetails.includes('security-hacked')) {
      estimate = { min: 30000, max: 100000 }
    }
    if (selectedDetails.includes('security-update')) {
      estimate = { min: 5000, max: 20000 }
    }
    if (selectedDetails.includes('security-prevention')) {
      estimate = { min: 10000, max: 30000 }
    }
    if (selectedDetails.includes('security-malware')) {
      estimate = { min: 25000, max: 80000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // WordPress - バックアップ・復元
  if (selectedContent.includes('backup-restore')) {
    estimate = { min: 10000, max: 30000 }

    // 作業内容による調整
    if (selectedDetails.includes('backup-setup')) {
      estimate = { min: 8000, max: 20000 }
    }
    if (selectedDetails.includes('backup-restore')) {
      estimate = { min: 15000, max: 40000 }
    }
    if (selectedDetails.includes('backup-migration')) {
      estimate = { min: 30000, max: 80000 }
    }
    if (selectedDetails.includes('backup-emergency')) {
      estimate = { min: 25000, max: 70000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
    if (selectedDetails.includes('timing-immediate')) {
      estimate = { min: estimate.min * 2.0, max: estimate.max * 2.5 }
    }
  }

  // WordPress - 機能追加
  if (selectedContent.includes('add-function')) {
    estimate = { min: 15000, max: 50000 }

    // 機能の複雑度による調整
    if (selectedDetails.includes('function-simple')) {
      estimate = { min: 10000, max: 30000 }
    }
    if (selectedDetails.includes('function-moderate')) {
      estimate = { min: 30000, max: 80000 }
    }
    if (selectedDetails.includes('function-complex')) {
      // 顧問契約推奨の場合は高めに設定（要相談）
      estimate = { min: 80000, max: 200000 }
    }

    // 緊急度による調整
    if (selectedDetails.includes('timing-urgent')) {
      estimate = { min: estimate.min * 1.5, max: estimate.max * 1.7 }
    }
  }

  // WordPress - 定期メンテナンス
  if (selectedContent.includes('regular-maintenance')) {
    // 顧問契約へ誘導（advisory categoryの料金を参考）
    estimate = { min: 30000, max: 100000 }
  }

  // 顧問契約
  if (selectedDetails.includes('weekly')) {
    estimate = { min: estimate.min * 1.5, max: estimate.max * 1.8 }
  }
  if (selectedDetails.includes('anytime')) {
    estimate = { min: estimate.min * 2, max: estimate.max * 2.5 }
  }

  // 急ぎの場合は高めに
  if (selectedDetails.includes('urgent')) {
    estimate = { min: estimate.min * 1.2, max: estimate.max * 1.3 }
  }

  return {
    min: Math.round(estimate.min),
    max: Math.round(estimate.max),
  }
}

// よくある料金帯の計算
export function calculateCommonPriceRange(
  category: string,
  selectedContent: string[],
  selectedDetails: string[]
): { min: number; max: number } | null {
  const estimate = calculateEstimate(category, selectedContent, selectedDetails)

  // 相談・アドバイスだけの場合はよくある料金帯を表示しない
  if (
    category === 'consultation-only' ||
    selectedContent.includes('consultation-advice') ||
    selectedContent.includes('consultation') ||
    selectedDetails.includes('consultation')
  ) {
    return null
  }

  // 目安金額の幅が狭い場合（2倍未満）は表示しない
  if (estimate.max / estimate.min < 2) {
    return null
  }

  // よくある料金帯は、最小値から全体の30%程度の範囲
  const range = estimate.max - estimate.min
  const commonMax = estimate.min + range * 0.35

  return {
    min: Math.round(estimate.min),
    max: Math.round(commonMax),
  }
}
