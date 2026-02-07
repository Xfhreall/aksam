import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { type SessionData, sessionOptions } from "@/shared/libs/session";

export async function PUT(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fullName } = await request.json();

  if (
    !fullName ||
    typeof fullName !== "string" ||
    fullName.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Nama lengkap tidak boleh kosong" },
      { status: 400 },
    );
  }

  session.fullName = fullName.trim();
  await session.save();

  return NextResponse.json({
    isLoggedIn: session.isLoggedIn,
    username: session.username,
    fullName: session.fullName,
  });
}
