import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';

import './config/mongoose';

import RootRouter from './routes';

const app = express();

app.use(helmet());

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(httpContext.middleware);

app.use(express.static('public/images'));

app.use(json());
app.use(morgan('tiny'));
app.use('/api/v1', RootRouter);

app.listen(8080, () => {
  console.log('server is listening on port 8080');
});
