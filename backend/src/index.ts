import express from "express";

import {getDatabaseConnection} from './db'
import {User} from "./db/entity/User";

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

app.get('/', async function (req, res) {
  const userRepository = db.getRepository(User);
  const users = await userRepository.find();
  console.log(users)
  res.send('Hello World!');
});

app.listen(8000, function () {
  console.log('App is listening on port 8000!');
}); 