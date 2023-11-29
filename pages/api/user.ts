import { User } from '@/db/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import { createClient } from 'redis';
import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat';
import RedisStore from 'connect-redis';
import { createRouter } from 'next-connect';

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

const redisSession = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  await getSession(req, res);
  await next();
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false, { message: 'Incorrect data' });
      if (!bcryptjs.compareSync(password, user.password)) return done(null, false, { message: 'Incorrect data' });
      return done(null, user);
    }
));

passport.serializeUser((user, done) => {
  done(null, user.userId)
});
passport.deserializeUser(async (userId: string, done) => {
  const user = await User.findByPk(userId);
  if (!user) return done(null, false);
  return done(null, user);
});

const passportInitialize: any = passport.initialize();
const passportSession = passport.session();
const passportAuthenticate = passport.authenticate('local');

interface INextApiRequestExtended extends NextApiRequest {
  user: User;
}

const router = createRouter<INextApiRequestExtended, NextApiResponse>();
router
  .use(redisSession)
  .use(passportInitialize)
  .use(passportSession)
  .use(passportAuthenticate);

router.post("/api/user", (req, res) => {
  console.log("User", req.user);
  res.status(200).json({ message: 'Hello world!' })
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end('Something went wrong!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
