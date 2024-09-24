import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not defined")
  }
  const session = await getToken({ req, secret })
  const url =
    process.env.NODE_ENV === "production"
      ? "https://next-tech-showcase-iota.vercel.app/"
      : "http://localhost:3000/login"
  if (!session && url !== req.url) {
    const url = new URL("/login", req.url)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/blogs/:path*", "/users/:path*"]
}
