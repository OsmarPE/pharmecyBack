
import { Request, Response } from "express";
import { Location } from "../models/Location";

export const getAllLocations = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(404).json({ message: "Localidades no encontradas" });
    }
}

export const getLocationById = async (req: Request, res: Response) => {
    try {
        const location = await Location.findOneBy({ id: +req.params.id });
        res.json(location);
    } catch (error) {
        res.status(404).json({ message: "Localidad no encontrada" });
    }
}

export const createLocation = async (req: Request, res: Response) => {
    try {
        const location = new Location();
        location.latitude = req.body.latitude;
        location.longitude = req.body.longitude;
        location.andBetweenStreet = req.body.andBetweenStreet;
        location.betweenStreet = req.body.betweenStreet;
        location.city = req.body.city;
        location.colony = req.body.colony;
        location.number = req.body.number;
        location.state = req.body.state;
        location.street = req.body.street;
        location.zipCode = req.body.zipCode;
        await location.save();
        res.json({
            message: "Localidad creada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Localidad no creada" });
    }
}

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const location = await Location.findOneBy({ id: +req.params.id });

        if (!location) {
            throw new Error("Localidad no encontrada");
        }

       
        location.latitude = req.body.latitude;
        location.longitude = req.body.longitude;
        location.andBetweenStreet = req.body.andBetweenStreet;
        location.betweenStreet = req.body.betweenStreet;
        location.city = req.body.city;
        location.colony = req.body.colony;
        location.number = req.body.number;
        location.state = req.body.state;
        location.street = req.body.street;
        location.zipCode = req.body.zipCode;

        await location.save();

        res.json({
            message: "Localidad actualizada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Localidad no actualizada" });
    }
}

export const deleteLocation = async (req: Request, res: Response) => {
    try {
        const locationOne = await Location.findOneBy({ id: +req.params.id });

        if (!locationOne) {
            throw new Error("Localidad no encontrada");
        }

        await locationOne.remove();
        res.json({
            message: "Localidad eliminada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Localidad no eliminada" });
    }
}