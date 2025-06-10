import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "users.json");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);

    if (!Array.isArray(users)) {
      throw new Error("Invalid users data format");
    }

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}