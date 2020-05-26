import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';

import {getDatabaseConnection} from './db'
import {User} from "./db/entity/User";

import * as passportConfig from './config/passport'
import {setUrls} from './urls'

const app: express.Application = express();

let db: any;
app.use(async function(req, res, next) {
  try {
    db = await getDatabaseConnection();
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  secret: 'trenderIs@H0rribleN@me',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

passportConfig.initPassport();

setUrls(app);

app.listen(8000, function () {
  console.log('App is listening on port 8000!');
}); 