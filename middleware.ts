import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 管理画面へのアクセスにBasic認証を適用
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization')

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')

      const validUser = process.env.ADMIN_USERNAME || 'admin'
      const validPassword = process.env.ADMIN_PASSWORD || 'changeme'

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next()
      }
    }

    return new NextResponse('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
