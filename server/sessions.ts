import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis';
import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat';
import RedisStore from 'connect-redis';

const redisCLient = createClient({
  legacyMode: false
});
redisCLient
  .connect()
  .catch((e) => console.error("Session error:", e));

const getSession = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: redisCLient,
      ttl: 7*24*60*60
    })
  ),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'strict'
  },
  touchAfter: 7 * 24 * 60 * 60,
});

export const sessions = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  await getSession(req, res);
  return next();
}