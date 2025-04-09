
import { Request, Response } from "express";
import { Sections } from "../models/Sections";
import { db } from "../config/db";

export const getAllSections = async (req: Request, res: Response) => {
    try {
        const sections = await Sections.find();
        res.json(sections);
    } catch (error) {
        res.status(404).json({ message: "Secciones no encontradas" });
    }
}

export const getSectionById = async (req: Request, res: Response) => {
    try {
        const section = await Sections.findOneBy({ id: +req.params.id });
        res.json(section);
    } catch (error) {
        res.status(404).json({ message: "Seccion no encontrada" });
    }
}

export const createSection = async (req: Request, res: Response) => {
    try {
        const section = new Sections();
        section.name = req.body.name;
        section.content = req.body.content;
        await section.save();
        res.json({
            message: "Seccion creada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Seccion no creada" });
    }
}

export const updateSection = async (req: Request, res: Response) => {
    try {
        const section = await Sections.findOneBy({ id: +req.params.id });

        if (!section) {
            throw new Error("Seccion no encontrada");
        }

        section.name = req.body.name;
        section.content = req.body.content;
        await section.save();
        res.json({
            message: "Seccion actualizada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Seccion no actualizada" });
    }
}

export const deleteSection = async (req: Request, res: Response) => {
    try {
        const sectionOne = await Sections.findOneBy({ id: +req.params.id });

        if (!sectionOne) {
            throw new Error("Seccion no encontrada");
        }

        await sectionOne.remove();
        res.json({
            message: "Seccion eliminada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Seccion no eliminada" });
    }
}