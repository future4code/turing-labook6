import express from "express";
import UserController from "../controller/UserController";

export const userRouter = express.Router();

const userControler = new UserController();

userRouter.post("/signup", userControler.signUp);
userRouter.post("/login", userControler.login);
userRouter.post("/friendship", userControler.friendship);
userRouter.post("/unfriendship", userControler.unFriendship);