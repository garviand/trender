import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import passportLocal from 'passport-local';
import {getRepository} from 'typeorm';

import {User} from '../db/entity/User';

import {checkPassword} from '../controllers/users/utils'

const LocalStrategy = passportLocal.Strategy;

export function initPassport() {

  passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: id
      }
    });
    done(undefined, user);
  });

  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email: email.toLowerCase()
      }
    });
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    const hasCorrectPassword = await checkPassword(password, user.password);
    if (!hasCorrectPassword) {
      return done(undefined, false, { message: `Could not find a user with that email/password combination.` });
    }
    return done(undefined, user);
  }));
}

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect("/login");
};