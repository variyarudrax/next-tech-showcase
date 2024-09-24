import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not defined")
  }
  const session = await getToken({ req, secret })

  if (!session && path !== "/login") {
    const url = new URL("/login", req.url)
    return NextResponse.redirect(url)
  } else if (session && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/blogs/:path*", "/users/:path*"]
}
