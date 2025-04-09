import { Request, Response } from "express"
import { Role } from "../models/Role"

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find()
        res.json({message: roles})

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message });
    }

}

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const role = await Role.findOneBy({ id: +req.params.id })
        res.json({message: role})

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message });
    }
}

export const createRole = async (req: Request, res: Response) => {
    try {
        const role = new Role();
        role.type = req.body.type;
        await role.save();
        res.json({
            message: "Rol creada correctamente",
        });

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message });
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        const role = await Role.findOneBy({ id: +req.params.id })

        if (!role) {
            throw new Error("Role no encontrada");
        }
        role.type = req.body.type;
        await role.save();
        res.json({
            message: "Rol actualizada correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message });
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const role = await Role.findOneBy({ id: +req.params.id })
        if (!role) {
            throw new Error("Role no encontrada");
        }
        await role.remove();
        res.json({ message: "Rol eliminada correctamente" });

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message });
    }
}