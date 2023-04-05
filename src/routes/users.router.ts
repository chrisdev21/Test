import { Router } from 'express';
import { getAll, events } from '../controllers/users.controller';
import { authenticate } from '../middlewares/authenticate';

const usersRouter = Router();

usersRouter.get('/', authenticate, getAll);
usersRouter.get('/:userId/events', authenticate, events);

export default usersRouter;
