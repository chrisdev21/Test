import { Request, Response } from 'express';
import UserService from '../services/users.service';
import { requestError, requestSuccess } from '../utils/responses';

export async function signUp(req: Request, res: Response) {
  UserService.signUp(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
}

export async function signIn(req: Request, res: Response) {
  UserService.signIn(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
}

export async function getAll(req: Request, res: Response) {
  UserService.getAll().then(requestSuccess(res)).catch(requestError(res));
}

export async function events(req: Request, res: Response) {
  UserService.events(req.params.userId)
    .then(requestSuccess(res))
    .catch(requestError(res));
}
