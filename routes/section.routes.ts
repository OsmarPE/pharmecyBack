
import { Router } from "express";
import { getAllSections, getSectionById, createSection, updateSection, deleteSection } from "../controllers/section.controller";

export const routerSection = Router();

routerSection.get('/', getAllSections);
routerSection.get('/:id', getSectionById);
routerSection.post('/', createSection);
routerSection.put('/:id', updateSection);
routerSection.delete('/:id', deleteSection);