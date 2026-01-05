import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import {
  generateUserReceiptEmail,
  generateAdminNotificationEmail,
} from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('受信したリクエストボディ:', JSON.stringify(body, null, 2))

    const {
      requestId,
      category,
      selectedContent,
      selectedDetails,
      estimateMin,
      estimateMax,
      contactMethod,
      contactTool,
    } = body

    // バリデーション
    if (
      !requestId ||
      !category ||
      !selectedContent ||
      !selectedDetails ||
      estimateMin === undefined ||
      estimateMax === undefined ||
      !contactMethod
    ) {
      console.error('バリデーションエラー:', {
        requestId: !!requestId,
        category: !!category,
        selectedContent: !!selectedContent,
        selectedDetails: !!selectedDetails,
        estimateMin: estimateMin !== undefined,
        estimateMax: estimateMax !== undefined,
        contactMethod: !!contactMethod,
      })
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    console.log('データベース保存開始...')
    // データベースに保存
    const createdRequest = await prisma.request.create({
      data: {
        requestId,
        category,
        selectedContent,
        selectedDetails,
        estimateMin,
        estimateMax,
        contactMethod,
        contactTool,
        status: 'new',
      },
    })
    console.log('データベース保存成功:', createdRequest.id)

    // メール送信データ
    const emailData = {
      requestId,
      category,
      selectedContent,
      selectedDetails,
      estimateMin,
      estimateMax,
      contactMethod,
      contactTool,
    }

    // ユーザーへの受付控えメール送信（オプション）
    // 実際には、ユーザーのメールアドレスを取得する必要があります
    // ここでは省略し、管理者への通知のみ実装

    // 管理者への通知メール送信
    if (resend && process.env.ADMIN_EMAIL && process.env.FROM_EMAIL && process.env.MAIL_ENABLED === 'true') {
      try {
        const adminEmail = generateAdminNotificationEmail(emailData)
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: adminEmail.subject,
          html: adminEmail.html,
          text: adminEmail.text,
        })
      } catch (emailError) {
        console.error('メール送信エラー:', emailError)
        // メール送信失敗してもリクエスト自体は成功とする
      }
    } else {
      console.log('メール送信スキップ: Resend未設定またはMAIL_ENABLED=false')
    }

    return NextResponse.json(
      { success: true, requestId: createdRequest.requestId },
      { status: 201 }
    )
  } catch (error) {
    console.error('リクエスト作成エラー:', error)
    console.error('エラー詳細:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      {
        error: '内部サーバーエラー',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// GET: リクエスト一覧取得（管理画面用）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const requests = await prisma.request.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({ requests })
  } catch (error) {
    console.error('リクエスト取得エラー:', error)
    return NextResponse.json(
      { error: '内部サーバーエラー' },
      { status: 500 }
    )
  }
}
