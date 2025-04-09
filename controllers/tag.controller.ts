
import { Request, Response } from "express";
import { Tag } from "../models/Tag";
import { db } from "../config/db";

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find();
        res.json({message: tags});
    } catch (error) {
        res.status(404).json({ message: "Tags no encontradas" });
    }
}

export const getTagById = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findOneBy({ id: +req.params.id });
        res.json({message: tag});
    } catch (error) {
        res.status(404).json({ message: "Tag no encontrada" });
    }
}

export const createTag = async (req: Request, res: Response) => {
    try {
        const tag = new Tag();
        tag.name = req.body.name;
        await tag.save();
        res.json({
            message: "Tag creada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Tag no creada" });
    }
}

export const updateTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findOneBy({ id: +req.params.id });

        if (!tag) {
            throw new Error("Tag no encontrada");
        }

        tag.name = req.body.name;
        await tag.save();
        res.json({
            message: "Tag actualizada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Tag no actualizada" });
    }
}

export const deleteTag = async (req: Request, res: Response) => {
    console.log(req.params.id);
    
    try {
        const tagOne = await Tag.findOneBy({ id: +req.params.id });

        await tagOne?.remove();
        res.json({
            message: "Tag eliminada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Tag no eliminada" });
    }
}