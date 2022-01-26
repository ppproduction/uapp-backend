import { ErrorRequestHandler } from 'express';

const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
  if (err.message) return res.status(err.statusCode ? err.statusCode : 500).send({ error: true, message: err.message });
  return res.status(500).send({ error: true, message: 'Unknown Error' });
};

export default errorHandler;
