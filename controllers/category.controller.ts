import e, { Request, Response } from 'express';
import { Category } from '../models/Category';

export const getCategories = async (req: Request, res: Response) => {
    try {
 
        const categories = await Category.find();
        res.status(200).json({message: categories});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ where: { id: +id } });
        if (!category) {
            res.status(404).json({ message: 'Categoría no encontrada' });
        } else {
            res.status(200).json({
                message: category,
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}


export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = new Category();
        category.name = req.body.name;
        await category.save();
        res.status(201).json({
            message:'Categoría creada correctamente',
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await Category.findOneBy({ id: +id });
        if (!category) {
            throw new Error('No se encontró la categoría');
        }

        category.name = req.body.name;

        await category.save();
        res.status(200).json({
            message: 'Categoría actualizada',
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await Category.findOneBy({ id: +id });
        if (!category) {
            throw new Error('No se encontró la categoría');
        }
        await category.remove();
        res.status(200).json({ message: 'Categoría eliminada' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}