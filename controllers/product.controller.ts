
import { Request, Response } from "express";
import { Product } from "../models/Product";
import { db } from "../config/db";
import { Branch } from "../models/Branch";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({
            relations: ["category", "tags", "branchProducts.branch"]
        });
        res.json({
            message: products
        });
    } catch (error) {
        res.status(404).json({ message: "Productos no encontrados" });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ 
            where: { id: +req.params.id },
            relations: ["category", "tags"]
        });
        res.json({
            message: product
        });
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        

        const findProduct = await Product.findOne({ 
            where: { sku: req.body.sku },
            relations: ["category", "tags"]
         });

        if (findProduct) {
            res.status(400).json({ message: "Producto con el sku ya existe" });
            return
        }

        const product = new Product();
        product.name = req.body.name;
        product.priceBase = req.body.priceBase;
        product.sku = req.body.sku;
        product.priceDiscount = req.body.priceDiscount;
        product.category = req.body.category;
        product.image = req.body.image;
        product.tags = req.body.tags;
        await product.save();
        res.json({
            message: "Producto creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Producto no creado" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({
            where: { id: +req.params.id },
            relations: ["category", "tags"]
        });

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        let priceBase = product.priceBase;
        let priceDiscount = product.priceDiscount;

        if (req?.body?.priceBase == 0 || req?.body?.priceBase) {
            priceBase = req.body.priceBase ;
        }
        if (req?.body?.priceDiscount == 0 || req?.body?.priceDiscount) {
            priceDiscount = req.body.priceDiscount ;
        }
        
        product.name = req.body.name || product.name;
        product.priceBase = priceBase
        product.priceDiscount = priceDiscount
        product.sku = req.body.sku || product.sku;
        product.category = req.body.category || product.category;
        product.image = req.body.image || product.image;
        product.tags = req.body.tags || product.tags;
        await product.save();
        res.json({
            message: "Producto actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Producto no actualizado" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productOne = await Product.findOneBy({ id: +req.params.id });

        if (!productOne) {
            throw new Error("Producto no encontrado");
        }

        await productOne.remove();
        res.json({
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Producto no eliminado" });
    }
}

export const getProductsByBranch = async (req: Request, res: Response) => {
    try {
        const branch = await Branch.findOne({ 
            where: { id: +req.params.id },
            relations: ["branchProducts.product"]
         });

        if (!branch) {
            throw new Error("Rama no encontrada");
        }

        res.json({
            message: branch.branchProducts
        });
    } catch (error) {
        res.status(404).json({ message: "Rama no encontrada" });
    }
}

