
import { Router } from "express";
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from "../controllers/tag.controller";

export const routerTag = Router();

routerTag.get('/', getAllTags);
routerTag.get('/:id', getTagById);
routerTag.post('/', createTag);
routerTag.put('/:id', updateTag);
routerTag.delete('/:id', deleteTag);