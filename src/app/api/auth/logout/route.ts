import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    await fetch(`${process.env.API_URL}/_logout`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
    });
  } catch {
    // ignore backend logout errors, still clear local cookie
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete("token");

  return response;
}
