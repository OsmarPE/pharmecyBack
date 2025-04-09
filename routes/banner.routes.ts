
import { Router } from "express";
import { getAllBanners, getBannerById, createBanner, updateBanner, deleteBanner } from "../controllers/banner.controller";

export const routerBanner = Router();

routerBanner.get('/', getAllBanners);
routerBanner.get('/:id', getBannerById);
routerBanner.post('/', createBanner);
routerBanner.put('/:id', updateBanner);
routerBanner.delete('/:id', deleteBanner);