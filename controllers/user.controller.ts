import { User } from "../models/User";
import { Request, Response } from "express";
import { hashedPassword, comparePassword} from "../util/helper";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "secret";

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
        user.role = req.body.role;

        const newPassword = await hashedPassword(req.body.password)
    
        user.password = newPassword

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

        const newPassword = await hashedPassword(req.body.password)
    
        user.password = newPassword

        
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


export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }


        const passwordMatch = await comparePassword(req.body.password, user.password);

        if (!passwordMatch) {
             throw new Error("Usuario o contraseña son incorrectos, verifique su información y vuelva a intentarlo");
        }

        const token = jwt.sign({ id: user.id, name: user.name, rol: user.role }, secret, {
            expiresIn: '7d',
        });

        res.json({
            message: "Usuario autenticado correctamente",
            token,
        });
    } catch (error) {
        res.status(400).json({ message: "Usuario no autenticado" });
    }
}


export const verifyToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers?.authorization?.split(" ")?.[1] ?? "";
        const decoded = jwt.verify(token, secret);


        res.json({
            message: decoded,
            status:"success",
        });
    } catch (error) {
        res.status(401).json({ message: "Token Invalido", status:"error" });
    }
}

export const logout = async (req: Request, res: Response) => {

    try { 
        res.json({
            message: "Sesión cerrada correctamente",
            status:"success",
        });
    } catch (error) {
        res.status(401).json({ message: "Sesión cerrada incorrectamente", status:"error" });
    }
}   