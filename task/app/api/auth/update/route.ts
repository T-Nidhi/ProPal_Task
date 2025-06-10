import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "users.json");

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const data = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(data);

  const userIndex = users.findIndex((u: any) => u.username === username);
  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  users[userIndex].email = email;
  if (password) users[userIndex].password = password;

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return NextResponse.json({ message: "User updated successfully" });
}
