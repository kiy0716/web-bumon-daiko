import { Resend } from 'resend'

// Resendの初期化（環境変数がない場合はnull）
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null
