import { NextResponse } from "next/server";

const rotasPrivadas = ["/dashboard", "/links", "/categories"];
const rotasDeAuth = ["/login", "/signup"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  let estaLogado = false;

  try {
    const sessionResponse = await fetch(
      "http://localhost:3001/api/auth/get-session",
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      }
    );
    const session = await sessionResponse.json();
    estaLogado = !!session?.user;
  } catch {
    // backend fora do ar — trata como deslogado
    estaLogado = false;
  }

  if (!estaLogado && rotasPrivadas.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (estaLogado && rotasDeAuth.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/categories/:path*", "/relatorio/:path*", "/login", "/signup"],
};