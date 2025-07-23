import client from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();
    console.log(name, email, password);

    const existingUser = await client.user.findUnique({
        where: {
            email,
        }
    })

    if (!existingUser) {
        const newUser = await client.user.create({
            data: {
                name,
                email,
                password,
            }
        })
    }
    return NextResponse.json({ message: "Email sign in successful" });
}