import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = req.cookies.session;
  const { pathname } = req.nextUrl;

  if (token) return NextResponse.next();

  if (!token && pathname !== "/ingresar")
    return NextResponse.redirect(`/ingresar?returnUrl=${pathname}`);
};
