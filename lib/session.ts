import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  user_id?: string;
  name?: string | null;
  email?: string;
  unit_id?: string;
  role_id?: string;
  isLoggedIn: boolean;
  superAdmin?: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  superAdmin: false,
};

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: process.env.SESSION_KEY!,
  cookieName: "USER_SESSION",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: false,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  // If user visits for the first time session returns an empty object.
  // Let's add the isLoggedIn property to this object and its value will be the default value which is false
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.superAdmin = defaultSession.superAdmin;
  }

  return session;
}