import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req

  const isPublicRoute =
    nextUrl.pathname === "/" ||
    nextUrl.pathname === "/auth" ||
    nextUrl.pathname.startsWith("/api/auth/")

  if (isPublicRoute) {
    // Redirect authenticated users away from /auth to dashboard
    if (nextUrl.pathname === "/auth" && req.auth) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }

  if (!req.auth) {
    const signInUrl = new URL("/auth", nextUrl)
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
