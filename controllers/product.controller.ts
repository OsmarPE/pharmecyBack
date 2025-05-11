
import { Request, Response } from "express";
import { Product } from "../models/Product";
import { db } from "../config/db";
import { Branch } from "../models/Branch";
import { BranchProduct } from "../models/ProductBranch";
import { Category } from "../models/Category";
import fs from "fs";
export const getAllProducts = async (req: Request, res: Response) => {
    try {

        const branchid = req.query?.branch ?? "all"; 
        let products: any[] = [];
        if(branchid === "all"){
            products = await Product.find({
                relations: ["category", "tags", "branchProducts.branch"]
            });
        }else{

            let branchInventory = await BranchProduct.find({
                where: { branch: { id: +branchid } },
                relations: ["product", "product.category", "product.tags"]
              });
    
            branchInventory = branchInventory.map((item: any) => ({
                ...item.product,
                amount: item.amount,
                branchProduct: item.id

            }));

            products = branchInventory
             
        }
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
        
        console.log(req.file);
        

        const category = new Category();
        category.id = req.body.category;
        const product = new Product();
        product.name = req.body?.name;
        product.priceBase = req.body?.priceBase;
        product.sku = req.body?.sku;
        product.priceDiscount = req.body?.priceDiscount ? req.body?.priceDiscount : null;
        product.category = category 
        product.image = req.file?.filename ?? 'imagen.png';
        product.tags = req.body?.tags ? JSON.parse(req.body?.tags) : [];

        
    
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
        console.log(req.body);
        
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

         if(fs.existsSync(`./uploads/${product.image}`)){
            fs.unlinkSync(`./uploads/${product.image}`);
        }
        console.log(req.body);
        
        product.name = req.body?.name ?? product.name;
        product.priceBase = priceBase 
        product.priceDiscount = priceDiscount
        product.sku = req.body?.sku ?? product.sku;
        product.category = req.body?.category ?? product.category;
        product.image = req.file?.filename ?? product.image;
        product.tags = req.body?.tags ? JSON.parse(req.body?.tags) : product.tags;
        await product.save();
        res.json({
            message: "Producto actualizado correctamente",
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            
        }
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productOne = await Product.findOne({ 
            where: { id: +req.params.id },
            relations: ["branchProducts"]
         });

        if (!productOne) {
            throw new Error("Producto no encontrado");
        }

        if (productOne.branchProducts.length > 0) {
            throw new Error("Producto en uso");
        }

        const { image } = productOne;

        if(fs.existsSync(`./uploads/${image}`)){
            fs.unlinkSync(`./uploads/${image}`);
        }

        await productOne.remove();
        
        res.json({
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            
        }
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

export const getProductsBranchById = async (req: Request, res: Response) => {
    try {
        const branch = await BranchProduct.findOne({ 
            where: { id: +req.params.id },
            relations: ["product","branch"]
         });

        if (!branch) {
            throw new Error("No se encontro el producto o sucursal")
        }
    

        res.json({
            message: {
                id: branch.id,
                product: branch.product.id,
                branch: branch.branch.id,
                amount: branch.amount
            }
        });
    } catch (error) {
        res.status(404).json({ message: "Rama no encontrada" });
    }
}   


export const addProductByBranch = async (req: Request, res: Response) => {

    try {
        
        const branch = req.body.branch;
        const productid = req.body.product;
        const amount = req.body.amount;
        
        const findProduct = await Product.findOne({ 
            where: { id: +productid  },
            relations: ["branchProducts"]
        });

        if (!findProduct) {
            throw new Error("Producto no encontrado");
        }
        
        const productBranchFind = await BranchProduct.findOne({ where: { product: {id:productid} }});

        if (productBranchFind) {
            throw new Error('Producto ya se encuentra agregado')
        }

       
        const bra = new Branch()
        bra.id = +branch;

        const d = new BranchProduct();
        d.amount = amount;
        d.product = productid;
        d.branch = bra;

        await d.save()
    

        res.json({
            message: "Producto agregado correctamente",
        });


    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            
        }
    }
}

export const removeProductByBranch = async (req: Request, res: Response) => {
    try {
        
        const id = req.params.id;

        const branchProduct = await BranchProduct.findOne({ where: { id:+id } });

        if (!branchProduct) {
            throw new Error('No se encontro el producto o sucursal')
        }

        await branchProduct.remove();

        res.json({
            message: "Producto eliminado correctamente",
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            
        }
    }
}   


export const updateProductByBranch = async (req: Request, res: Response) => {
    try {
        
        const id = req.params.id;
        const amount = req.body.amount;

        
        const branchProduct = await BranchProduct.findOne({ where: { id:+id } });
        
        if (!branchProduct) {
            throw new Error('No se encontro el producto o sucursal')
        }

        branchProduct.amount = amount;


        await branchProduct.save();


        res.json({
            message: "Producto actualizado correctamente",
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            
        }
    }
}   