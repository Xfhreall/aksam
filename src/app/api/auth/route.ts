import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { validateCredentials } from "@/shared/libs/auth";
import {
  type SessionData,
  defaultSession,
  sessionOptions,
} from "@/shared/libs/session";

export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn) {
    return NextResponse.json(defaultSession);
  }

  return NextResponse.json(session);
}

export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  const { username, password } = await request.json();

  const user = validateCredentials(username, password);
  if (!user) {
    return NextResponse.json(
      { error: "Username atau password salah" },
      { status: 401 },
    );
  }

  session.isLoggedIn = true;
  session.username = user.username;
  session.fullName = user.fullName;
  await session.save();

  return NextResponse.json({
    isLoggedIn: session.isLoggedIn,
    username: session.username,
    fullName: session.fullName,
  });
}

export async function DELETE() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  session.destroy();

  return NextResponse.json(defaultSession);
}
