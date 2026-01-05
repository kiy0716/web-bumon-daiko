import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 個別リクエスト取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const requestData = await prisma.request.findUnique({
      where: { id },
    })

    if (!requestData) {
      return NextResponse.json(
        { error: 'リクエストが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json({ request: requestData })
  } catch (error) {
    console.error('リクエスト取得エラー:', error)
    return NextResponse.json(
      { error: '内部サーバーエラー' },
      { status: 500 }
    )
  }
}

// PATCH: リクエスト更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, assignedTo, internalNotes } = body

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(assignedTo !== undefined && { assignedTo }),
        ...(internalNotes !== undefined && { internalNotes }),
      },
    })

    return NextResponse.json({ request: updatedRequest })
  } catch (error) {
    console.error('リクエスト更新エラー:', error)
    return NextResponse.json(
      { error: '内部サーバーエラー' },
      { status: 500 }
    )
  }
}
