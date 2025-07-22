import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) return NextResponse.redirect("");

    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        redirect_uri: "http://localhost:3000/api/auth/google",
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const user = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    console.log("User info:", user.data);

    return NextResponse.redirect(new URL("/dashboard", req.url)
  );
  } catch (error: any) {
    console.error("Google OAuth Error:", error.response?.data || error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
