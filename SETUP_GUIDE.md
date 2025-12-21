# セットアップガイド

このガイドでは、Web部門代行アプリケーションを初めてセットアップする手順を詳しく説明します。

## 前提条件

- Node.js 18.18.0以上（推奨: 20.x以上）
- npm または yarn
- PostgreSQLデータベース（Supabase推奨）
- Resendアカウント
- Googleカレンダー（Zoom予約用）

## ステップ1: プロジェクトのクローン

```bash
git clone <repository-url>
cd web-bumon-daiko
```

## ステップ2: 依存関係のインストール

```bash
npm install
```

Node.jsのバージョンが古い場合、警告が表示されることがありますが、18.18.0以上であれば動作します。

## ステップ3: Supabaseのセットアップ

### 3.1 Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/)にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン
4. 「New Project」をクリック
5. プロジェクト名、データベースパスワード、リージョン（Tokyo推奨）を設定
6. 「Create new project」をクリック

### 3.2 データベースURLの取得

1. Supabaseのダッシュボードで「Settings」→「Database」を開く
2. 「Connection string」の「URI」をコピー
3. `[YOUR-PASSWORD]`を実際のパスワードに置き換え

例:
```
postgresql://postgres.xxx:password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

## ステップ4: Resendのセットアップ

### 4.1 Resendアカウントの作成

1. [Resend](https://resend.com/)にアクセス
2. 「Get Started」をクリックしてサインアップ
3. メールアドレスを認証

### 4.2 ドメインの追加（オプション）

独自ドメインからメールを送信する場合:

1. Resendダッシュボードで「Domains」を開く
2. 「Add Domain」をクリック
3. ドメインを入力
4. DNS設定を追加（SPF, DKIM, DKIMレコード）
5. 認証完了を待つ

### 4.3 APIキーの取得

1. Resendダッシュボードで「API Keys」を開く
2. 「Create API Key」をクリック
3. 名前を入力（例: web-bumon-daiko-production）
4. 「Create」をクリック
5. APIキーをコピー（`re_`で始まる文字列）

## ステップ5: 環境変数の設定

### 5.1 .envファイルの作成

```bash
cp .env.example .env
```

### 5.2 .envファイルの編集

```env
# Database (ステップ3で取得したURL)
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# Resend API Key (ステップ4で取得したキー)
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Email addresses
ADMIN_EMAIL="your-email@example.com"
FROM_EMAIL="noreply@yourdomain.com"  # Resendで認証済みのアドレス

# Admin Basic Auth (セキュリティのため変更推奨)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"

# Google Calendar Booking URL (ステップ6で設定)
GOOGLE_CALENDAR_BOOKING_URL="https://calendar.google.com/calendar/..."
```

## ステップ6: Googleカレンダー予約スケジュールの設定

### 6.1 予約スケジュールの作成

1. [Googleカレンダー](https://calendar.google.com/)を開く
2. 左側のメニューで歯車アイコン（設定）をクリック
3. 「予約スケジュール」を選択
4. 「作成」をクリック
5. 以下を設定:
   - タイトル: 「Web部門代行 Zoom相談」
   - 予約の長さ: 30分 / 60分
   - 予約可能時間: 平日 9:00-18:00（任意）
   - 最小予約時間: 24時間前まで（任意）
6. 「保存」をクリック
7. 予約ページのURLをコピー
8. `.env`の`GOOGLE_CALENDAR_BOOKING_URL`に貼り付け

## ステップ7: データベースのセットアップ

```bash
# Prismaクライアントの生成
npm run prisma:generate

# データベーススキーマのプッシュ
npm run prisma:push
```

成功すると、以下のようなメッセージが表示されます:

```
Your database is now in sync with your Prisma schema.
```

### 7.1 データベースの確認（オプション）

```bash
# Prisma Studioを起動
npm run prisma:studio
```

ブラウザで [http://localhost:5555](http://localhost:5555) が開き、データベースの内容を確認できます。

## ステップ8: 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## ステップ9: 動作確認

### 9.1 LPページの確認

- [http://localhost:3000](http://localhost:3000) でLPが表示されることを確認

### 9.2 フローのテスト

1. 「今すぐ相談する」をクリック
2. カテゴリを選択
3. 内容を選択
4. 詳細を選択
5. 目安金額が表示されることを確認
6. 方法選択で「チャット」を選択
7. コピーボタンが動作することを確認

### 9.3 管理画面の確認

1. [http://localhost:3000/admin](http://localhost:3000/admin) にアクセス
2. Basic認証（ユーザー名: admin, パスワード: .envで設定した値）
3. 案件一覧が表示されることを確認

## ステップ10: Vercelへのデプロイ

### 10.1 GitHubリポジトリの作成

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 10.2 Vercelプロジェクトの作成

1. [Vercel](https://vercel.com/)にアクセス
2. 「Import Project」をクリック
3. GitHubリポジトリを選択
4. プロジェクト名を入力
5. 環境変数を追加:
   - `DATABASE_URL`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `FROM_EMAIL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `GOOGLE_CALENDAR_BOOKING_URL`
6. 「Deploy」をクリック

### 10.3 デプロイ後の確認

1. デプロイが完了したら、Vercelが提供するURLにアクセス
2. LPが表示されることを確認
3. フローをテスト
4. 管理画面にアクセス

## トラブルシューティング

### エラー: Prisma Client is not generated

```bash
npm run prisma:generate
```

### エラー: P1001: Can't reach database server

- `DATABASE_URL`が正しいか確認
- Supabaseプロジェクトが起動しているか確認
- ネットワーク接続を確認

### メールが送信されない

- `RESEND_API_KEY`が正しいか確認
- Resendでドメイン認証が完了しているか確認
- `FROM_EMAIL`が認証済みのアドレスか確認

### 管理画面にアクセスできない

- Basic認証の情報が正しいか確認
- ブラウザのキャッシュをクリア

## 次のステップ

- デザインのカスタマイズ: `tailwind.config.ts`と`app/globals.css`を編集
- メールテンプレートの調整: `lib/email-templates.ts`を編集
- カテゴリ・選択肢の追加: `lib/constants.ts`を編集

## サポート

問題が発生した場合は、GitHubのIssueを作成してください。
