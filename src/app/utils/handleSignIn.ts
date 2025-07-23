"use server";

import client from "../lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const OAuthUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  googleId: z.string(),
  image: z.string().optional(),
});

const EmailUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export async function handleGoogleSignIn(user: unknown) {
  const parsedUser = OAuthUserSchema.safeParse(user);
  if (!parsedUser.success) {
    console.error("Invalid OAuth user data:", parsedUser.error);
    return { error: "Invalid OAuth user data" };
  }

  try {
    let existingUser = await client.user.findUnique({
      where: {
        email: parsedUser.data.email,
      },
    });

    if (!existingUser) {
      existingUser = await client.user.create({
        data: {
          email: parsedUser.data.email,
          name: parsedUser.data.name,
          googleId: parsedUser.data.googleId,
          image: parsedUser.data.image,
        },
      });
    }
    const token = await jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_SECRET!);

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return existingUser;
  } catch (error) {
    console.error("OAuth upsert error:", error);
    return { error: "OAuth login failed" };
  }
}

export async function handleEmailSignIn(formData: FormData) {
  const parsedUser = EmailUserSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (!parsedUser.success) {
    console.error("Invalid email user data:", parsedUser.error);
    return { error: "Invalid email user data" };
  }

  let existingUser = await client.user.findUnique({
    where: {
      email: parsedUser.data.email,
    },
  });

  if (!existingUser) {
    try {
      const hashedPassword = await bcrypt.hash(parsedUser.data.password, 10);
      existingUser = await client.user.create({
        data: {
          email: parsedUser.data.email,
          name: parsedUser.data.name,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.error("Email create error:", error);
      return { error: "Email create failed" };
    }
  } else {
    if (!existingUser.password) {
      return { error: "User Logged in with Google." };
    }
    const isPasswordValid = await bcrypt.compare(
      parsedUser.data.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }
  }

  const token = await jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_SECRET!);

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/");
}


export async function handleLogout() {
  (await cookies()).delete("token");
  redirect("/");
}