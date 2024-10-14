import { Router } from "express"
import { getCategories } from "../controllers/categories.controller"

const categoriesRouter = Router()

categoriesRouter.get("/get-categories", getCategories)

export default categoriesRouter;

