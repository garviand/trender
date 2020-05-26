import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {User} from '../../db/entity/User'

export async function getAllUsers(req: Request, res: Response) {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  res.json(users);
}