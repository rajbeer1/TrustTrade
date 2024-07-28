import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let status = err.status || 500;


  switch (status) {
    case 400: {
      const message = 'Bad Request';
      return res.status(status).json({ message });
    }
    case 401: {
      const message = 'Unauthorized';
      return res.status(status).json({ message });
    }
    case 403: {
      const message = 'Forbidden';
      return res.status(status).json({ message });
    }
    case 404: {
      const message = 'Not Found';
      return res.status(status).json({ message });
    }

  }


  console.error(err);


  const message = 'Something went wrong. Please try again later.';
  return res.status(status).json({ message });
};
