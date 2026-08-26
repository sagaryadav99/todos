import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET;
export async function authmiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      throw new Error("no token provided,signin first");
    }
    const userid = jwt.verify(token as string, jwtsecret as string);
    if (!userid) {
      throw new Error("malformed jwt");
    }
    req.userid = userid;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "signin first" });
  }
}
