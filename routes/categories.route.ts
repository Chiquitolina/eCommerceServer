import { Router } from "express"
import { getCategories } from "../../controllers/categories.controllerller"

const categoriesRouter = Router()

categoriesRouter.get("/get-categories", getCategories)

export default categoriesRouter;

