import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error-handler';
import cookieParser from 'cookie-parser';
import RequestUser from '../utils/types/dtos/request-user';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user: RequestUser;
    }
  }
}

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['*'],
  }),
);
app.use(errorHandler);

export default app;
