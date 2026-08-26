import "dotenv/config";
import type { Request, Response } from "express";
import { users } from "../db";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET;
export async function createUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const newuser = {
    id: crypto.randomUUID(),
    email: username,
    password,
    posts: [],
  };
  const userexists = await prisma.user.findMany({
    where: { OR: [{ email: newuser.email }, { id: newuser.id }] },
  });
  if (userexists.length > 0) {
    return res.status(409).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(newuser.password, 1);
  const usercreated = await prisma.user.create({
    data: {
      email: username,
      password: hashedPassword,
    },
  });
  res.json({ message: "user created", username: usercreated.email });
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: username },
  });
  if (!user) {
    return res.status(409).json({ message: "user doesn't exists" });
  }
  try {
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign(user.id, jwtsecret as string);
      return res.json({ token });
    }
    throw new Error("password doesn't match");
  } catch (e) {
    return res.status(401).json({ message: "password doesn't match" });
  }
}
