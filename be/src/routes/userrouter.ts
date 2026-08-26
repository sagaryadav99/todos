import Router from "express";
import { createUser, loginUser } from "../controllers/usercontroller";
export const userRouter = Router();
userRouter.post("/signup", createUser);
userRouter.post("/signin", loginUser);
