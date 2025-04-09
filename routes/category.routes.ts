import { Router } from "express";
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller";


export const routerCategory = Router();

routerCategory.get('/', getCategories)
routerCategory.get('/:id', getCategory)
routerCategory.post('/', createCategory)
routerCategory.put('/:id', updateCategory)
routerCategory.delete('/:id', deleteCategory)