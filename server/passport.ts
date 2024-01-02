import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import { dbInstance } from '@/server/db/db-instance';
import type { IUser } from './types/user.types';
import { QueryTypes } from 'sequelize';

const findUserByEmail = async (email: string) => {
  const query = 'SELECT * FROM Users WHERE email = :email';
  const res = await dbInstance.query(query, {
    replacements: { email },
    type: QueryTypes.SELECT
  });
  if (res.length === 0) return null;
  return res[0] as IUser;
}

const findUserById = async (userId: string) => {
  const query = 'SELECT * FROM Users WHERE userId = :userId';
  const res = await dbInstance.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT
  });
  if (res.length === 0) return null;
  return res[0] as IUser;
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req: any, email, password, done) => {
      const user = await findUserByEmail(email);
      if (!user || !bcryptjs.compareSync(password, user.password)) {
        const error = { message: 'Incorrect data', statusCode: 401 };
        req.errors = [...(req?.errors || []), error];
        return done(error, false, error);
      }
      return done(null, user);
    }
));

passport.serializeUser((user, done) => {
  return done(null, user.userId)
});
passport.deserializeUser(async (userId: string, done) => {
  const user = await findUserById(userId);
  if (!user) return done(null, false);
  return done(null, user);
});

export const passportInitialize: any = passport.initialize();

export const passportSession = passport.session();
export const passportAuthenticate = passport.authenticate('local');

export const deserializeUser = async (req: any, res: any, next: any) => {
  if (!req?.session?.passport?.user) return next();
  const user = await findUserById(req?.session?.passport?.user);
  if (!user) return next();
  req.user = user;
  return next();
}