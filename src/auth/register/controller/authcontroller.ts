import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import country from "country-list";
import { equal } from "assert";

const prisma = new PrismaClient();

export const createAccount = async (request: Request, response: Response) => {
  try {
    const { username, email, password, phone, address, gender, country_id } =
      request.body;

    if (!isValidEmail(email)) {
      response.status(400).json({
        message: "Invalid Email Address",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: { equals: email },
      },
    });

    if (existingUser) {
      response.status(400).json({
        message: "Email address already in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        address,
        gender,
        country_id,
      },
    });

    const countryIndex = Number(country_id) - 1;
    const countryData = country.getData();

    const selectedCountry = countryData[countryIndex];

    const token = jwt.sign({ userId: newUser.id }, "SECRET", {
      expiresIn: "10d",
    });

    response.json({
      message: "Create Account Successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        gender: newUser.gender,
        country: selectedCountry.name,
      },
      token,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
