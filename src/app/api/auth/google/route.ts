"use server";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { handleGoogleSignIn } from "@/app/utils/handleSignIn";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

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

    const userData = {
      googleId: user.data.id,
      name: user.data.name,
      email: user.data.email,
      image: user.data.picture,
    }

    const existingUser = await handleGoogleSignIn(userData);

    if (!existingUser) {
      console.error("Failed to sign in user");
      return NextResponse.redirect(new URL("/error", req.url));
    }

    console.log("User signed in:", existingUser);

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error: any) {
    console.error("Google OAuth Error:", error.response?.data || error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
