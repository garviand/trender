import {Request, Response, NextFunction} from 'express';
import passport from "passport";
import {getRepository} from 'typeorm';

import {User} from '../../db/entity/User'

import {hashPassword} from './utils'

export async function register(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.json({
      status: 'fail',
      message: 'Please enter an email and password!'
    });
    return;
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  if (!firstName || !lastName) {
    res.json({
      status: 'fail',
      message: 'Please enter a first and last name!'
    });
    return;
  }
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({
    where: {
      email: email
    }
  });
  if (user) {
    res.json({
      status: 'fail',
      message: 'That email is already associated with an account!'
    });
    return;
  }
  user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = await hashPassword(password);
  userRepository.save(user);
  res.json({
    status: 'success',
    user: user
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
        res.json({
          status: 'fail',
          message: 'The email/password combination cannot be found.'
        });
        return;
    }
    req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.json({
          status: 'success',
          user: user
        });
    });
  })(req, res, next);
}