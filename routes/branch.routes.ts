
import { Router } from "express";
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from "../controllers/branch.controller";

export const routerBranch = Router();

routerBranch.get('/', getAllBranches);
routerBranch.get('/:id', getBranchById);
routerBranch.post('/', createBranch);
routerBranch.put('/:id', updateBranch);
routerBranch.delete('/:id', deleteBranch);