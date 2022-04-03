import { Errback, Response, NextFunction, Request } from 'express';
import ErrorInterface from '../../utils/types/interfaces/error';

const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const errors: ErrorInterface[] = [
    { message: 'An unknown error has occurred. Please try again.' },
  ];
  return res.status(500).json(errors);
};

export default errorHandler;
