import { Router } from 'express';
import {
  list,
  create,
  attendUser,
  removeUser,
  scheduleNew,
} from '../controllers/events.controller';
import { authenticate } from '../middlewares/authenticate';

const eventsRouter = Router();

eventsRouter.get('/', list);
eventsRouter.post('/', authenticate, create);
eventsRouter.post('/attend/:eventId', authenticate, attendUser);
eventsRouter.delete('/attend/:eventId', authenticate, removeUser);
eventsRouter.post('/schedule', authenticate, scheduleNew);

export default eventsRouter;
