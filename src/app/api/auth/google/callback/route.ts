import { NextRequest, NextResponse } from "next/server";
import "@/app/lib/passport";

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl.origin);
  url.pathname = "/auth/google/callback";

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${url.href}&response_type=code&scope=profile email`
  );
}
