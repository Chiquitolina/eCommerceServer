import { Router } from "express"
import { addAnalytic, deleteAnalytic } from "../controllers/analytics.controller.js"

const analyticRouter = Router()

analyticRouter.post("/add-analytic", addAnalytic)

analyticRouter.delete("/delete-analytic", deleteAnalytic)

export default analyticRouter;