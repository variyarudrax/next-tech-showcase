import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not defined")
  }
  const token = await getToken({ req, secret })

  if (!token) {
    const url = new URL("/login", req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/blogs/:path*", "/users/:path*"]
}
