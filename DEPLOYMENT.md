# デプロイガイド

このドキュメントは、Web部門代行アプリケーションをSupabaseとVercelにデプロイする手順を説明します。

**GIT_WORKFLOW.md**と**ENV_AND_SECRETS.md**に準拠しています。

## 📋 前提条件

- GitHubアカウント
- Supabaseアカウント
- Vercelアカウント
- Resendアカウント

## 🗄️ ステップ1: Supabaseのセットアップ

### 1.1 Staging用プロジェクトの作成

1. [Supabase](https://supabase.com/)にログイン
2. 「New Project」をクリック
3. 以下を設定:
   - **Project name**: `web-bumon-daiko-staging`
   - **Database Password**: 強力なパスワードを設定（保存しておく）
   - **Region**: `Tokyo (ap-northeast-1)` を選択
4. 「Create new project」をクリック
5. プロジェクトが作成されるまで待つ（2-3分）

### 1.2 Staging用の接続情報を取得

プロジェクトが作成されたら:

1. 左メニューから「Settings」→「Database」を開く
2. 「Connection string」の「URI」をコピー
3. `[YOUR-PASSWORD]`を実際のパスワードに置き換え
4. これが`DATABASE_URL`になります

例:
```
postgresql://postgres.staging-xxx:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

5. 左メニューから「Settings」→「API」を開く
6. 以下をコピー:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`として使用
   - **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`として使用

### 1.3 Staging用のデータベーススキーマを作成

ローカルから実行:

```bash
# .envファイルにstaging SupabaseのDATABASE_URLを設定
cp .env.example .env
# .envを編集してDATABASE_URLを設定

# Prismaでスキーマをプッシュ
npm run prisma:push
```

または、Supabase SQL Editorで直接実行も可能です。

### 1.4 Production用プロジェクトの作成

**Staging用と同じ手順**で、以下の違いだけ変更:
- **Project name**: `web-bumon-daiko-production`
- その他は同じ

Production用の接続情報も同様に取得してください。

---

## 📧 ステップ2: Resendのセットアップ

### 2.1 アカウント作成とAPIキー取得

1. [Resend](https://resend.com/)にログイン
2. 「API Keys」を開く
3. 「Create API Key」をクリック
4. Staging用とProduction用に2つ作成:
   - `web-bumon-daiko-staging`
   - `web-bumon-daiko-production`

### 2.2 ドメイン認証（本番用）

1. 「Domains」を開く
2. 「Add Domain」をクリック
3. ドメインを入力（例: `yourdomain.com`）
4. DNS設定を追加:
   - SPF レコード
   - DKIM レコード
5. 認証完了を待つ

Staging用はテストメールアドレスでOKです。

---

## 🚀 ステップ3: GitHubリポジトリの作成

### 3.1 GitHubで新規リポジトリを作成

1. [GitHub](https://github.com/)で「New repository」をクリック
2. リポジトリ名: `web-bumon-daiko`
3. Private または Public を選択
4. 「Create repository」をクリック

### 3.2 ローカルリポジトリをプッシュ

プロジェクトディレクトリで:

```bash
# すでにgit initは実行済み

# 全ファイルをステージング
git add .

# 初回コミット
git commit -m "feat: initial commit - Web部門代行アプリケーション"

# mainブランチにリネーム（デフォルトがmasterの場合）
git branch -M main

# リモートリポジトリを追加
git remote add origin https://github.com/YOUR_USERNAME/web-bumon-daiko.git

# プッシュ
git push -u origin main
```

### 3.3 stagingブランチの作成

```bash
# stagingブランチを作成
git checkout -b staging

# stagingブランチもプッシュ
git push -u origin staging
```

---

## ☁️ ステップ4: Vercelへのデプロイ

### 4.1 プロジェクトのインポート

1. [Vercel](https://vercel.com/)にログイン
2. 「Add New」→「Project」をクリック
3. GitHubリポジトリ`web-bumon-daiko`を選択
4. 「Import」をクリック

### 4.2 プロジェクト設定

1. **Project Name**: `web-bumon-daiko`
2. **Framework Preset**: Next.js（自動検出）
3. **Root Directory**: `./`（デフォルト）
4. Build Command と Output Directory はデフォルトのまま

### 4.3 環境変数の設定（Preview - Staging用）

「Environment Variables」セクションで、以下を追加:

**重要**: 環境は「Preview」を選択してください

| Key | Value | Environment |
|-----|-------|-------------|
| `DATABASE_URL` | (staging SupabaseのURL) | Preview |
| `NEXT_PUBLIC_SUPABASE_URL` | (staging SupabaseのURL) | Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (staging Supabaseのanon key) | Preview |
| `RESEND_API_KEY` | (staging用APIキー) | Preview |
| `ADMIN_EMAIL` | staging-admin@example.com | Preview |
| `FROM_EMAIL` | noreply-staging@yourdomain.com | Preview |
| `MAIL_TO_FORCE` | your-dev-email@example.com | Preview |
| `MAIL_ENABLED` | true | Preview |
| `ADMIN_USERNAME` | admin | Preview |
| `ADMIN_PASSWORD` | staging-password-123 | Preview |
| `GOOGLE_CALENDAR_BOOKING_URL` | (staging用URL) | Preview |
| `NEXT_PUBLIC_BASE_URL` | (後で設定) | Preview |
| `NEXT_PUBLIC_VERCEL_ENV` | preview | Preview |

### 4.4 環境変数の設定（Production - 本番用）

同じく「Environment Variables」で、以下を追加:

**重要**: 環境は「Production」を選択してください

| Key | Value | Environment |
|-----|-------|-------------|
| `DATABASE_URL` | (production SupabaseのURL) | Production |
| `NEXT_PUBLIC_SUPABASE_URL` | (production SupabaseのURL) | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (production Supabaseのanon key) | Production |
| `RESEND_API_KEY` | (production用APIキー) | Production |
| `ADMIN_EMAIL` | admin@yourdomain.com | Production |
| `FROM_EMAIL` | noreply@yourdomain.com | Production |
| `MAIL_ENABLED` | true | Production |
| `ADMIN_USERNAME` | admin | Production |
| `ADMIN_PASSWORD` | **強力なパスワード** | Production |
| `GOOGLE_CALENDAR_BOOKING_URL` | (production用URL) | Production |
| `NEXT_PUBLIC_BASE_URL` | https://yourdomain.com | Production |
| `NEXT_PUBLIC_VERCEL_ENV` | production | Production |

### 4.5 デプロイ

1. 「Deploy」をクリック
2. デプロイが完了するまで待つ（3-5分）
3. デプロイが成功したら、URLが表示されます

---

## 🔧 ステップ5: Production用のデータベーススキーマを作成

Production Supabaseにもスキーマを作成:

```bash
# .envファイルにproduction SupabaseのDATABASE_URLを設定
# または、環境変数を直接指定

DATABASE_URL="postgresql://..." npm run prisma:push
```

---

## ✅ ステップ6: 動作確認

### Staging環境の確認

1. Vercelダッシュボードで「Deployments」を開く
2. `staging`ブランチのPreview URLを確認
3. URLにアクセス:
   - LPが表示されることを確認
   - フローをテスト（実際に送信してみる）
   - 管理画面にアクセス（`/admin`）
   - Supabaseで案件が記録されているか確認

### Production環境の確認

1. `main`ブランチにマージ後、Production URLにアクセス
2. 同様に動作確認

---

## 🔄 デプロイフロー（通常運用）

### Feature開発 → Staging

```bash
# feature開発
git checkout staging
git checkout -b feature/new-feature

# 開発・コミット
git add .
git commit -m "feat: add new feature"

# stagingにPR作成・マージ
git push origin feature/new-feature
# GitHub上でPR作成 → staging向け
# マージ後、自動的にVercel Previewにデプロイ
```

### Staging → Production

```bash
# stagingで検証OK後
git checkout main
git merge staging
git push origin main
# 自動的にVercel Productionにデプロイ
```

---

## 🚨 トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルドテスト
npm run build
```

### データベース接続エラー

- Vercelの環境変数を確認
- SupabaseのDatabase URLが正しいか確認
- パスワードが正しいか確認

### メール送信エラー

- ResendのAPIキーが正しいか確認
- ドメイン認証が完了しているか確認（本番のみ）

---

## 📚 次のステップ

1. カスタムドメインの設定（Vercelで）
2. Googleカレンダーの予約スケジュール設定
3. 実際の運用開始前に`PRE_LAUNCH_CHECKLIST.md`を確認

---

これでデプロイ完了です！
