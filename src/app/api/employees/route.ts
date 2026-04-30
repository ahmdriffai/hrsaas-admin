import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const key = searchParams.get("key") || "";
  const page = Number(searchParams.get("page") || "1");
  const size = Number(searchParams.get("size") || "10");

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.API_URL}/employees?key=${key}&page=${page}&size=${size}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store", // penting biar tidak ke-cache
    },
  );

  const data = await res.json();

  return Response.json(data);
}
