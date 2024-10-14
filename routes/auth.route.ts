import { Router } from "express";
import { authenticateUser } from "../../controllers/auth.controllerller";

const authRouter = Router()

authRouter.post('/login', authenticateUser)

export default authRouter;
