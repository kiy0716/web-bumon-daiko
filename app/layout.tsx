import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web部門代行 | Web担当者がいない会社のための、Webの総合窓口',
  description: 'Webサイト・LP・バナー・動画編集・WordPress・IT相談など、Webに関することを一括で相談・依頼できるサービスです。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
