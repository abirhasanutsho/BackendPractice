import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({
      where: {
        email: { equals: email },
      },
    });

    if (!user) {
      response.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      response.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign({ userId: user.id }, "SECRET", {
      expiresIn: "10d",
    });

    console.log(request.body.country_id);

    response.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        country: "",
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
