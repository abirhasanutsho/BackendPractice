import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const profileData = await prisma.user.findUnique({
      where: {
        id: request.body.userId,
      },
    });

    response.status(200).json({ profile: profileData });
  } catch (error) {}
};
