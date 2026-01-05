# クイックスタートガイド

ローカルで動作確認してからVercelにデプロイする手順です。

## ステップ1: Supabase Stagingプロジェクトを作成

### 1.1 Supabaseにログイン

1. [Supabase](https://supabase.com/)にアクセス
2. GitHubアカウントでサインイン

### 1.2 新規プロジェクト作成

1. 「New Project」をクリック
2. 以下を入力:
   - **Name**: `web-bumon-daiko-staging`
   - **Database Password**: 強力なパスワードを設定（メモしておく）
   - **Region**: `Tokyo (ap-northeast-1)` を選択
3. 「Create new project」をクリック
4. 2-3分待つ（プロジェクト作成中）

### 1.3 接続情報を取得

プロジェクトが作成されたら:

#### データベースURL

1. 左メニュー「Settings」→「Database」を開く
2. 「Connection string」セクションの「URI」をコピー
3. `[YOUR-PASSWORD]`を先ほど設定したパスワードに置き換え

例:
```
postgresql://postgres.abcdefg:MyPassword123@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

#### Supabase URL & APIキー

1. 左メニュー「Settings」→「API」を開く
2. 以下をコピー:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`として使う
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`として使う

---

## ステップ2: ローカル環境のセットアップ

### 2.1 .envファイルを作成

```bash
cd /Users/pandalion/Desktop/IT便利屋/web-bumon-daiko
cp .env.example .env
```

### 2.2 .envファイルを編集

```bash
# エディタで.envを開く
open .env
# または
code .env
# または
nano .env
```

以下の項目を、ステップ1で取得した情報に置き換え:

```env
# Database (ステップ1.3で取得したURL)
DATABASE_URL="postgresql://postgres.xxx:YOUR-PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# Supabase (ステップ1.3で取得)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJxxx..."

# Resend (とりあえずダミーでOK)
RESEND_API_KEY="re_dummy_key"

# Email (テスト用)
ADMIN_EMAIL="dev@example.com"
FROM_EMAIL="dev@localhost"

# メール送信をOFFにする（ローカルでは送信しない）
MAIL_ENABLED="false"

# Admin認証
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="dev123"

# Google Calendar (テスト用ダミーURL)
GOOGLE_CALENDAR_BOOKING_URL="https://calendar.google.com/calendar/test"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 2.3 Prismaでデータベースをセットアップ

```bash
# Prismaクライアントを生成
npm run prisma:generate

# データベーススキーマをプッシュ
npm run prisma:push
```

成功すると以下のようなメッセージが表示されます:
```
Your database is now in sync with your Prisma schema. Done in XXXms

✔ Generated Prisma Client
```

---

## ステップ3: ローカルで動作確認

### 3.1 開発サーバーを起動

```bash
npm run dev
```

### 3.2 ブラウザで確認

http://localhost:3000 を開く

#### 確認項目:

- ✅ LPが表示される
- ✅ 「今すぐ相談する」ボタンが動く
- ✅ カテゴリ選択 → 内容選択 → 詳細選択 → 目安金額表示が動く
- ✅ チャット選択 → コピーボタンが動く
- ✅ 管理画面 http://localhost:3000/admin にアクセスできる
  - ユーザー名: `admin`
  - パスワード: `dev123`

### 3.3 実際にフローを試す

1. トップページから「今すぐ相談する」
2. カテゴリを選択（例: Webサイト・LP）
3. 内容を選択（例: 新しく作りたい）
4. 詳細を選択（例: 1ページだけ）
5. 目安金額が表示される
6. 「チャットで相談する」を選択
7. コピーボタンをクリック
8. ツールを選択（例: LINE）
9. 「完了」ボタンをクリック

### 3.4 データベースを確認

```bash
# Prisma Studioを起動
npm run prisma:studio
```

ブラウザで http://localhost:5555 が開きます

- `Request`テーブルにデータが登録されているか確認

---

## ステップ4: 問題がなければVercelにデプロイ

ローカルで動作確認OKなら、`DEPLOYMENT.md`を参照してVercelにデプロイしてください。

### デプロイ前の確認事項:

- ✅ ローカルで全フローが動作する
- ✅ データベースに案件が登録される
- ✅ 管理画面が表示される
- ✅ エラーがコンソールに出ていない

---

## トラブルシューティング

### データベース接続エラー

```bash
# DATABASE_URLが正しいか確認
cat .env | grep DATABASE_URL

# Prismaクライアントを再生成
npm run prisma:generate
```

### ポート3000が使用中

```bash
# 別のポートで起動
PORT=3001 npm run dev
```

### Prismaスキーマのプッシュが失敗

- Supabaseのプロジェクトが起動しているか確認
- DATABASE_URLのパスワードが正しいか確認
- ネットワーク接続を確認

---

## 次のステップ

ローカルで動作確認できたら:

1. `DEPLOYMENT.md`を参照してVercelにデプロイ
2. Resendアカウントを作成してメール送信をテスト
3. Googleカレンダーの予約スケジュールを設定

---

すべて順調ならここまで約30分で完了します！
