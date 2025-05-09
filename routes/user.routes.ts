import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, verifyToken } from "../controllers/user.controller";

export const routerUser = Router();

routerUser.get('/', getAllUsers);
routerUser.get('/verifyToken', verifyToken);
routerUser.get('/:id', getUserById);
routerUser.post('/', createUser);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', deleteUser);
routerUser.post('/login', login);