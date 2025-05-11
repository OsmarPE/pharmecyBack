
import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByBranch, addProductByBranch, updateProductByBranch, removeProductByBranch, getProductsBranchById } from "../controllers/product.controller";
import { upload } from "../util/helper";

export const routerProduct = Router();



routerProduct.get('/', getAllProducts);
routerProduct.get('/:id', getProductById);
routerProduct.post('/', upload.single('image'), createProduct);
routerProduct.put('/:id', upload.single('image'),updateProduct);
routerProduct.delete('/:id', deleteProduct);    
routerProduct.get('/branch/:id', getProductsByBranch);
routerProduct.get('/branch/item/:id', getProductsBranchById);
routerProduct.post('/branch/', addProductByBranch ); 
routerProduct.put('/branch/:id', updateProductByBranch);
routerProduct.delete('/branch/:id', removeProductByBranch);