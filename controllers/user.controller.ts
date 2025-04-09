import { User } from "../models/User";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({
            relations: ["role"],
        });
        res.json({message: users});
    } catch (error) {
        res.status(404).json({ message: "Usuarios no encontrados" });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            where: { id: +req.params.id },
            relations: ["role"],
        });
        res.json({message: user});
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;
        await user.save();
        res.json({
            message: "Usuario creado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Usuario no creado" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneBy({ id: +req.params.id });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
    
        await user.save();
        res.json({
            message: "Usuario actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Usuario no actualizado" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userOne = await User.findOneBy({ id: +req.params.id });

        if (!userOne) {
            throw new Error("Usuario no encontrado");
        }

        await userOne.remove();
        res.json({
            message: "Usuario eliminado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Usuario no eliminado" });
    }
}
