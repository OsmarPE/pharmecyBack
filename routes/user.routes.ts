import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller";

export const routerUser = Router();

routerUser.get('/', getAllUsers);
routerUser.get('/:id', getUserById);
routerUser.post('/', createUser);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', deleteUser);