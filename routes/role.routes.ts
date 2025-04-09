
import { Router } from "express";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/role.controller";

export const routerRole = Router();

routerRole.get('/', getAllRoles);
routerRole.get('/:id', getRoleById);
routerRole.post('/', createRole);
routerRole.put('/:id', updateRole);
routerRole.delete('/:id', deleteRole);