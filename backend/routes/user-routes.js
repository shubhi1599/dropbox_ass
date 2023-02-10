import express from 'express';

import {register, login, tokenIsValid, auths} from '../controller/user-controller.js'

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/tokenIsValid", tokenIsValid);

userRouter.get("/", auths);

export default userRouter;