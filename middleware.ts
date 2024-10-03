import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET || ""

export async function middleware(req: any) {
  const token = await getToken({ req, secret })

  if (token) {
    return NextResponse.next()
  } else if (req.nextUrl.pathname !== "/login" && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/", "/blogs", "/users", "/users/:path*", "/account"]
}
