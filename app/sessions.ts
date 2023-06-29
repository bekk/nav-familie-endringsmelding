// app/sessions.ts
import { createCookieSessionStorage } from '@remix-run/node';

export const API_TOKEN_NAME = 'token';
type SessionData = {
  token: any;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'api-session',
      maxAge: 3600,
    },
  });

export { getSession, commitSession, destroySession };
