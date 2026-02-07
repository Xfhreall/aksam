import type { SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn: boolean;
  username: string;
  fullName: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  username: "",
  fullName: "",
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "aksam-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};
