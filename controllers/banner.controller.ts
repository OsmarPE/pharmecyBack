import e, { Request, Response } from "express";
import { Banner } from "../models/Banner";

export const getAllBanners = async (req: Request, res: Response) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(404).json({ message: "Banners no encontradas" });
    }
}
export const getBannerById = async (req: Request, res: Response) => {
    try {
        const banner = await Banner.findOneBy({ id: +req.params.id });
        res.json(banner);
    } catch (error) {
        res.status(404).json({ message: "Banner no encontrada" });
    }
}

export const createBanner = async (req: Request, res: Response) => {
    try {
        const banner = new Banner();
        banner.priority = req.body.priority;
        banner.image = req.body.image;
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
        const banner = await Banner.findOneBy({ id: +req.params.id });

        if (!banner) {
            throw new Error("Banner no encontrada");
        }

        banner.priority = req.body.priority;
        banner.image = req.body.image;
        await banner.save();
        res.json({
            message: "Banner actualizada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Banner no actualizada" });
    }
}

export const deleteBanner = async (req: Request, res: Response) => {
    try {
        const bannerOne = await Banner.findOneBy({ id: +req.params.id });

        if (!bannerOne) {
            throw new Error("Banner no encontrada");
        }

        await bannerOne.remove();
        res.json({
            message: "Banner eliminada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Banner no eliminada" });
    }
}       
