import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "users.json");


export async function GET() {
  const data = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(data);

  const user = users[0]; 

  return NextResponse.json({ user });
}
