import 'dotenv/config'
import { Request, Response, NextFunction } from 'express';
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  })
  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation Error',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Invalid input data'
    });
    return;
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(400).json({
      message: 'Duplicate entry error'
    });
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token'
    });
    return;
  }

  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
  return;
}
