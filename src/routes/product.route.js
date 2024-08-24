import { Router } from "express"
import { addProduct, deleteProduct, editProduct, getProductById, getProducts } from "../controllers/products.controller.js"

const productRouter = Router()

productRouter.put('/edit-product', editProduct);

productRouter.get("/get-products", getProducts);

/*productRouter.get("/get-products-by-category/:category")*/

productRouter.get("/get-product-by-id/:id", getProductById);

productRouter.post("/add-product", addProduct);

productRouter.delete("/delete-product", deleteProduct);

export default productRouter;