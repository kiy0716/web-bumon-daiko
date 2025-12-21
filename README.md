# Web部門代行 - Webアプリケーション

Web担当者がいない会社のための、Webの総合窓口サービス

## 📚 はじめに

このプロジェクトは、**dev/ディレクトリのドキュメント**に基づいて開発されています。

### 必読ドキュメント

開発を始める前に、以下のドキュメントを読んでください:

1. `../MASTER_INDEX.md` - プロジェクト全体の索引
2. `../dev/GIT_WORKFLOW.md` - Git運用ルール（必須）
3. `../dev/ENV_AND_SECRETS.md` - 環境変数とシークレット管理
4. `../dev/LOCAL_DEV_POLICY.md` - ローカル開発のポリシー

## 🏗️ 技術スタック

- **フロントエンド**: Next.js 14+ (App Router), React, TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **メール送信**: Resend
- **ホスティング**: Vercel

## 🌲 ブランチ戦略

```
main              # 本番環境（Production） - 直接コミット禁止
├── staging       # ステージング環境（検証用）
└── feature/*     # 機能開発ブランチ
```

### 開発フロー（GIT_WORKFLOW.mdに準拠）

```bash
# 1. stagingから新しいfeatureブランチを作成
git checkout staging
git checkout -b feature/your-feature-name

# 2. 開発・コミット
git add .
git commit -m "feat: add new feature"

# 3. stagingにPRを作成
git push origin feature/your-feature-name
# GitHub上でPR作成 (staging向け)

# 4. PR確認後、stagingにマージ
# → Vercel Previewで自動デプロイ

# 5. staging環境で最終確認後、本番反映
# staging → main のPRを作成してマージ
# → Vercel Productionに自動デプロイ
```

## 🔧 ローカル開発セットアップ

### 前提条件

- Node.js 18.18.0以上
- npm または yarn
- Supabase アカウント（staging用）

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

**LOCAL_DEV_POLICY.mdに従い、ローカルではstaging Supabaseを参照します**

```bash
# .env.exampleをコピー
cp .env.example .env

# .envファイルを編集
# - DATABASE_URL: staging SupabaseのURL
# - NEXT_PUBLIC_SUPABASE_URL: staging SupabaseのURL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY: staging Supabaseの匿名キー
# - MAIL_ENABLED: false (ローカルではメール送信OFF推奨)
```

### 3. データベースのセットアップ

```bash
# Prismaクライアントの生成
npm run prisma:generate

# データベーススキーマのプッシュ（初回のみ）
npm run prisma:push
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 🚀 デプロイ

### 環境構成

| 環境 | ブランチ | Supabase | Vercel | 用途 |
|------|---------|----------|--------|------|
| **ローカル** | feature/* | staging | - | 開発 |
| **ステージング** | staging | staging | Preview | 検証 |
| **本番** | main | production | Production | 実運用 |

### Vercel環境変数設定

#### Preview環境（Staging用）

以下の環境変数を「Preview」環境に設定:

```
DATABASE_URL=<staging-supabase-url>
NEXT_PUBLIC_SUPABASE_URL=<staging-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<staging-anon-key>
RESEND_API_KEY=<staging-api-key>
ADMIN_EMAIL=staging-admin@example.com
FROM_EMAIL=noreply-staging@yourdomain.com
MAIL_TO_FORCE=your-dev-email@example.com
MAIL_ENABLED=true
ADMIN_USERNAME=admin
ADMIN_PASSWORD=staging-password
GOOGLE_CALENDAR_BOOKING_URL=<staging-calendar-url>
NEXT_PUBLIC_BASE_URL=https://your-staging-url.vercel.app
NEXT_PUBLIC_VERCEL_ENV=preview
```

#### Production環境（本番用）

以下の環境変数を「Production」環境に設定:

```
DATABASE_URL=<production-supabase-url>
NEXT_PUBLIC_SUPABASE_URL=<production-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<production-anon-key>
RESEND_API_KEY=<production-api-key>
ADMIN_EMAIL=admin@yourdomain.com
FROM_EMAIL=noreply@yourdomain.com
MAIL_ENABLED=true
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>
GOOGLE_CALENDAR_BOOKING_URL=<production-calendar-url>
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_VERCEL_ENV=production
```

詳細は `.env.staging.example` と `.env.production.example` を参照してください。

## 📁 プロジェクト構造

```
web-bumon-daiko/
├── app/                    # Next.js App Router
│   ├── page.tsx           # LP（トップページ）
│   ├── start/             # 相談開始
│   ├── flow/              # 選択式フロー
│   ├── estimate/          # 目安金額表示
│   ├── contact/           # 方法選択
│   ├── chat/              # チャット開始
│   ├── book/              # Zoom予約
│   ├── done/              # 受付完了
│   ├── admin/             # 管理画面
│   └── api/               # API Routes
├── components/            # Reactコンポーネント
├── lib/                   # ユーティリティ
├── prisma/               # データベーススキーマ
├── .env.example          # ローカル開発用環境変数テンプレート
├── .env.staging.example  # ステージング環境変数テンプレート
├── .env.production.example # 本番環境変数テンプレート
└── README.md
```

## 🛠️ 開発用コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# Prisma Studio起動（データベースGUI）
npm run prisma:studio

# データベーススキーマをプッシュ
npm run prisma:push

# Prismaクライアント再生成
npm run prisma:generate
```

## 🔐 管理画面

管理画面URL: `/admin`

Basic認証でアクセス制限されています:
- ユーザー名: `ADMIN_USERNAME`（環境変数）
- パスワード: `ADMIN_PASSWORD`（環境変数）

**重要**: 本番環境では必ず強力なパスワードに変更してください。

## 🚨 安全設計（ENV_AND_SECRETS.mdに準拠）

### ステージング環境の注意点

1. **メール送信**: `MAIL_TO_FORCE`で強制的に運営宛てに送信
2. **Zoom予約**: テスト用URLを使用（本番の予約枠に影響を与えない）
3. **データベース**: staging Supabaseを使用（本番DBと完全分離）

### やってはいけないこと

- ❌ `main`ブランチに直接コミット
- ❌ `.env`ファイルをコミット
- ❌ 本番環境で動作確認
- ❌ stagingを飛ばして本番反映
- ❌ 環境変数をコードに直書き

## 📖 主な機能

### ユーザー側

1. **LP（ランディングページ）**: サービスの説明と相談開始
2. **選択式フロー**: カテゴリ → 内容 → 詳細 → 目安金額 → 方法選択
3. **チャット相談**: コピペ1回で即時相談開始
4. **Zoom相談**: Googleカレンダーで予約

### 管理側

1. **案件一覧**: すべての相談案件を一覧表示
2. **ステータス管理**: 案件のステータスを更新
3. **担当者・メモ**: 担当者とメモを記録

## 🐛 トラブルシューティング

### データベース接続エラー

```bash
# 環境変数を確認
cat .env | grep DATABASE_URL

# Prismaクライアント再生成
npm run prisma:generate
```

### メール送信エラー

- `RESEND_API_KEY`が正しいか確認
- Resendでドメイン認証が完了しているか確認
- ローカル開発では`MAIL_ENABLED=false`を推奨

### 管理画面にアクセスできない

- Basic認証の情報が正しいか確認
- `.env`の`ADMIN_USERNAME`と`ADMIN_PASSWORD`を確認

## 📝 コミットメッセージ規約

```
feat: 機能追加
fix: バグ修正
docs: ドキュメント更新
chore: 依存関係・設定変更
```

例:
```bash
git commit -m "feat: add chat copy template"
git commit -m "fix: correct estimate range display"
git commit -m "docs: update README"
```

## 📚 関連ドキュメント

- `../MASTER_INDEX.md` - プロジェクト全体の索引
- `../MASTER_SPEC.md` - サービス仕様
- `../UI_FLOW_SPEC.md` - UI・画面フロー設計
- `../TECH_STACK_SIMPLE.md` - 技術設計
- `../dev/GIT_WORKFLOW.md` - Git運用ルール
- `../dev/ENV_AND_SECRETS.md` - 環境変数管理
- `../dev/LOCAL_DEV_POLICY.md` - ローカル開発ポリシー

## ライセンス

ISC

## サポート

問題が発生した場合は、GitHubのIssueを作成してください。
