import { Router } from "express"
import { addProduct, deleteProduct, editProduct, fetchProductById, getProducts } from "../controllers/products.controller.js"

const productRouter = Router()

productRouter.put('/edit-product', editProduct);

productRouter.get("/get-products", getProducts);

productRouter.post("/add-product", addProduct);

productRouter.get("/fetch-product-by-id", fetchProductById);

productRouter.delete("/delete-product", deleteProduct);

export default productRouter;