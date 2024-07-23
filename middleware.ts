import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/dashboard", "/profile", "/posts", "/about"]

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl

  const isProtectedRoute = protectedRoutes.some((prefix) => url.pathname.startsWith(prefix))

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}
