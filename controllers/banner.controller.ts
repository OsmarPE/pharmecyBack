import e, { Request, Response } from "express";
import { Banner } from "../models/Banner";
import fs from "fs";
export const getAllBanners = async (req: Request, res: Response) => {
    try {
        const banners = await Banner.find({
            order:{
                priority: "ASC"
            }
        });
        res.json({
            message: banners
        });
    } catch (error) {
        res.status(404).json({ message: "Banners no encontradas" });
    }
}
export const getBannerById = async (req: Request, res: Response) => {
    try {
        const banner = await Banner.findOneBy({ id: +req.params.id });
        res.json({
            message: banner
        });
    } catch (error) {
        res.status(404).json({ message: "Banner no encontrada" });
    }
}

export const createBanner = async (req: Request, res: Response) => {
    try {
        const banner = new Banner();
        const [_, count] = await Banner.findAndCount();
        console.log(count);
        
        banner.image = req.file?.filename ?? 'imagen.png';
        banner.priority = count + 1;
        await banner.save();
            
        res.json({
            message: "Banner creada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Banner no creada" });
    }
}


export const updateBanner = async (req: Request, res: Response) => {
    try {
        const bannersBody = req.body as any[]

        if (!Array.isArray(bannersBody)) { 
            throw new Error("Proporcione un arreglo");
        }

        if(bannersBody.length === 0){
            throw new Error("Proporcione al menos un banner");
        }
        
        await Banner.save(bannersBody)

        res.json({
            message: "Banner actualizada correctamente",
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            
        }
    }
}

export const deleteBanner = async (req: Request, res: Response) => {
    try {
        const bannerOne = await Banner.findOneBy({ id: +req.params.id });

        if (!bannerOne) {
            throw new Error("Banner no encontrada");
        }
        
        const { image } = bannerOne;

        if(fs.existsSync(`./uploads/${image}`)){
            fs.unlinkSync(`./uploads/${image}`);
        }

        await bannerOne.remove();

        res.json({
            message: "Banner eliminada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Banner no eliminada" });
    }
}       
