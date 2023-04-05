import { Request, Response } from 'express';
import EventService from '../services/events.service';
import { requestError, requestSuccess } from '../utils/responses';

export async function create(req: Request, res: Response) {
  EventService.create(req.authId, req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
}

export async function list(req: Request, res: Response) {
  EventService.list(req).then(requestSuccess(res)).catch(requestError(res));
}

export async function attendUser(req: Request, res: Response) {
  EventService.attendUser(req.authId, req.params.eventId)
    .then(requestSuccess(res))
    .catch(requestError(res));
}

export async function removeUser(req: Request, res: Response) {
  EventService.removeUser(req.authId, req.params.eventId)
    .then(requestSuccess(res))
    .catch(requestError(res));
}

export async function scheduleNew(req: Request, res: Response) {
  EventService.scheduleNew(req.authId, req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
}
