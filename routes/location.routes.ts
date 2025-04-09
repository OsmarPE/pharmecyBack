
import { Router } from "express";
import { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } from "../controllers/location.controller";

export const routerLocation = Router();

routerLocation.get('/', getAllLocations);
routerLocation.get('/:id', getLocationById);
routerLocation.post('/', createLocation);
routerLocation.put('/:id', updateLocation);
routerLocation.delete('/:id', deleteLocation);