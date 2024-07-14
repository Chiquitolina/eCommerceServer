import {  Router } from "express";
import { sendEmail } from "../utils/emailsender.js";

const emailRouter = Router()

emailRouter.post("/send-email", sendEmail)

export default emailRouter;