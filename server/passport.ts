import passport from 'passport';
import { User } from '@/db/models/user';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import container from './container';
import { UserService } from './services/user.service';

const userService = container.resolve<UserService>('userService');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await userService.getUserByEmail(email);
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

export const passportInitialize: any = passport.initialize();
export const passportSession = passport.session();
export const passportAuthenticate = passport.authenticate('local');