import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "users.json");

export async function POST(req: Request) {
  try {
    const { username, email, password, phone } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(fileData);

    const userExists = users.some((u: any) => u.email === email);
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    users.push({ username, email, password, phone });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Signup Error:", error.message);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({ message: "Only POST requests are supported here." });
}