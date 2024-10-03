import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET || ""

export async function middleware(req: any) {
  const token = await getToken({ req, secret })
  console.log("token", token)

  if (token) {
    return req.nextUrl.pathname === "/login"
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next()
  }

  if (req.nextUrl.pathname !== "/login" && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/", "/blogs", "/users", "/users/:path*", "/account", "/login"]
}
