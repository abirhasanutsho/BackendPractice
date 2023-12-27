import { Request, Response, NextFunction } from "express";
import jsonWebToken, { VerifyErrors } from "jsonwebtoken";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let token;
    let authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      jsonWebToken.verify(
        token,
        "SECRET",
        async (error: VerifyErrors | null, user: any) => {
          if (error) {
            response.status(500).json({
              message: "Unauthorized",
            });
          }

          request.body.user = user;
          next();
        }
      );
    }
  } catch (error) {
    response.status(200).json({
      message: "Something Went Wrong",
    });
  }
};
