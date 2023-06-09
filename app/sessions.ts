// app/sessions.ts
import { createCookieSessionStorage } from '@remix-run/node';

export const API_TOKEN_NAME = 'token';

interface SessionData {
  token: string;
}

interface SessionFlashData {
  error: string;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'api-session',
      maxAge: 3600,
    },
  });

export { commitSession, destroySession, getSession };
