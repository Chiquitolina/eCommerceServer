import { Router } from "express"
import { addAnalytic, addProduct, deleteProduct, editProduct, getProducts } from "../controllers/products.controller.js"

const productRouter = Router()

productRouter.put('/edit-product', editProduct)

productRouter.get("/get-products", getProducts);

productRouter.post("/add-product", addProduct)

productRouter.delete("/delete-product", deleteProduct)

productRouter.post("/add-analytic", addAnalytic)

export default productRouter;