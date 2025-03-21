import { Request, Response, NextFunction } from "express";
import { requestContext } from "./requestContext";
import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"] as string || uuidv4();
  const endpoint = `${req.method} ${req.originalUrl}`;

  //pass both requestId + endpoint + callback
  requestContext.run(requestId, endpoint, () => {
    res.setHeader("x-request-id", requestId);
    next();
  });
};
