import { Router } from 'express';
import eventsRouter from './events.router';
import usersRouter from './users.router';
import authRouter from './auth.router';

const RootRouter = Router();

RootRouter.use('/', authRouter);
RootRouter.use('/events', eventsRouter);
RootRouter.use('/users', usersRouter);

export default RootRouter;
