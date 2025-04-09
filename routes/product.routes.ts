
import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByBranch } from "../controllers/product.controller";

export const routerProduct = Router();

routerProduct.get('/', getAllProducts);
routerProduct.get('/:id', getProductById);
routerProduct.post('/', createProduct);
routerProduct.put('/:id', updateProduct);
routerProduct.delete('/:id', deleteProduct);    
routerProduct.get('/branch/:id', getProductsByBranch);