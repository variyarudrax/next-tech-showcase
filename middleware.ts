import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET || ""

export async function middleware(req: any) {
  const token = await getToken({ req, secret })
  console.log("token", token)

  if (token) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url))
    } else {
      NextResponse.next()
    }
  } else if (req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/", "/blogs", "/blogs/user", "/users", "/users/:path*", "/account", "/login"]
}
