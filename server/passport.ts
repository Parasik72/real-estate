import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import container from './container';
import { UserService } from './services/user.service';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req: any, email, password, done) => {
      const userService = container.resolve<UserService>('userService');
      const user = await userService.getUserByEmail(email);
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
  const userService = container.resolve<UserService>('userService');
  const user = await userService.getUserById(userId);
  if (!user) return done(null, false);
  return done(null, user);
});

export const passportInitialize: any = passport.initialize();

export const passportSession = passport.session();
export const passportAuthenticate = passport.authenticate('local');

export const deserializeUser = async (req: any, res: any, next: any) => {
  if (!req?.session?.passport?.user) return next();
  const userService = container.resolve<UserService>('userService');
  const user = await userService.getUserById(req?.session?.passport?.user);
  if (!user) return next();
  req.user = user;
  return next();
}