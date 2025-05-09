
import { Router } from "express";
import { getAllBanners, getBannerById, createBanner, updateBanner, deleteBanner } from "../controllers/banner.controller";
import multer from "multer";
import path from "path";
import { upload } from "../util/helper";

export const routerBanner = Router();


routerBanner.get('/', getAllBanners);
routerBanner.get('/:id', getBannerById);
routerBanner.post('/', upload.single('image'), createBanner);
routerBanner.put('/', updateBanner);
routerBanner.delete('/:id', deleteBanner);