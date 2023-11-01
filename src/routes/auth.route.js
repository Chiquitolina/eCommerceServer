import { Router } from "express";
import { authenticateUser } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/login', authenticateUser)

export default authRouter;
