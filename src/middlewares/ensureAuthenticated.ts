import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  // Receive token
  const authToken = request.headers.authorization;
  // console.log(authToken);

  // Validate if token isn't null
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");
  
  try {
    // Validate valid token
    const { sub } = verify(token, "a8a2d0c0f2311a246a45d1a5045c95e6") as IPayload;

    request.user_id = sub;

    return next();
  } catch(err) {
    return response.status(401).end();
  }

  return next();
}