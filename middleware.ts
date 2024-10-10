import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET || ""

export async function middleware(req: any) {
  const url = new URL(req.url)
  const pathname = url.pathname
  const requestHeaders = new Headers(req.headers)

  requestHeaders.set("x-pathname", pathname)

  const token = await getToken({ req, secret, cookieName: "next-auth.session-token" })
  console.log("Token Retrieved:", token)

  if (token) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  } else if (req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ["/", "/blogs", "/blogs/user", "/users", "/users/:path*", "/account", "/login"]
}
