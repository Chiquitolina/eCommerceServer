import { Router } from "express"
import { addProduct, deleteProduct, editProduct, getProductById, getProducts } from "../../controllers/products.controllerller"

const productRouter = Router()

productRouter.put('/edit-product', editProduct);

productRouter.get("/get-products/:category?/:subcategory?", getProducts);

/*productRouter.get("/get-products-by-category/:category")*/

productRouter.get("/get-product-by-id/:id", getProductById);

productRouter.post("/add-product", addProduct);

productRouter.delete("/delete-product", deleteProduct);

export default productRouter;