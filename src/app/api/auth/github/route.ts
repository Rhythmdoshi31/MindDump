import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json", // ← MUST have this!
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.json({ error: "Failed to get access token", tokenData }, { status: 401 });
  }

  // Fetch user profile with the token
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/json",
    },
  });

  const user = await userRes.json();

  if (user.message === "Bad credentials") {
    return NextResponse.json({ error: "GitHub auth failed", user }, { status: 401 });
  }

  console.log("GitHub User:", user);

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
