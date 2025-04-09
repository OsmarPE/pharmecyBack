
import { Request, Response } from "express";
import { Branch } from "../models/Branch";
import { Schedule } from "../models/Schedule";
import { Location } from "../models/Location";
import { Contact } from "../models/Contact";

export const getAllBranches = async (req: Request, res: Response) => {
    try {
        const branches = await Branch.find({
            relations: ["schedule", "location", "contact"]
        });
        res.json({message: branches});
    } catch (error) {
        res.status(404).json({ message: "Farmacias no encontradas" });
    }
}

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const branch = await Branch.findOne({ 
            where: { id: +req.params.id },
            relations: ["schedule", "location", "contact"]
         });
        res.json({message: branch});
    } catch (error) {
        res.status(404).json({ message: "Farmacia no encontrada" });
    }
}

export const createBranch = async (req: Request, res: Response) => {
    try {
        const branch = new Branch();
        branch.name = req.body.name;
        
        let scheduleArray: Schedule[] = [];

        req.body?.schedule?.forEach((schedule:any) => {
            const newSchedule = new Schedule();
            newSchedule.timeIn = schedule.timeIn;
            newSchedule.timeOut = schedule.timeOut;
            newSchedule.dayFrom = schedule.dayFrom;
            newSchedule.dayTo = schedule.dayTo;
            scheduleArray.push(newSchedule);
        });
        
        branch.schedule = scheduleArray;
        
        const location = new Location();
        location.latitude = req.body.location.latitude;
        location.longitude = req.body.location.longitude;
        location.street = req.body.location.street;
        location.number = req.body.location.number;
        location.betweenStreet = req.body.location.betweenStreet;
        location.andBetweenStreet = req.body.location.andBetweenStreet;
        location.zipCode = req.body.location.zipCode;
        location.city = req.body.location.city;
        location.state = req.body.location.state;
        location.colony = req.body.location.colony;

        branch.location = location;

        const contactArray: Contact[] = [];
        req.body?.contact?.forEach((contact:any) => {
            const newContact = new Contact();
            newContact.type = contact.type;
            newContact.number = contact.number;
            contactArray.push(newContact);
        });
        
        branch.contact = contactArray;
        
        await branch.save();
        
        res.json({
            message: "Farmacia creada correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Farmacia no creada" });
    }
}

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const branch = await Branch.findOne({ 
            where: { id: +req.params.id },
            relations: ["schedule", "location", "contact"]
         });

        if (!branch) {
            throw new Error("Farmacia no encontrada");
        }

        let location: Location  = {...branch.location} as Location;
        let contact: Contact[] = [...branch.contact] as Contact[];
        let schedule: Schedule[] = [...branch.schedule] as Schedule[];

        
        if (req?.body?.location) {
            location = {...location,...req.body.location};
        }
        if (req?.body?.contact) {
            contact = [];
            contact = req.body.contact.map((item: any) => {            
                const newContact = new Contact();
                newContact.type = item.type;
                newContact.number = item.number;
                newContact.branch = branch;
                return newContact;
            });
        }

        if (req?.body?.schedule) {
            schedule = [];
            schedule = req.body.schedule.map((item: any) => {            
                const newSchedule = new Schedule();
                newSchedule.timeIn = item.timeIn;
                newSchedule.timeOut = item.timeOut;
                newSchedule.dayFrom = item.dayFrom;
                newSchedule.dayTo = item.dayTo;
                newSchedule.branch = branch;
                return newSchedule;
            });
        }

        await Contact.remove(branch.contact); 
        await Schedule.remove(branch.schedule);
        
        branch.name = branch.name || req.body.name;
        branch.location = location;
        branch.contact = contact;
        branch.schedule = schedule;

        await branch.save();

        res.json({
            message: "Farmacia actualizada correctamente",
        });
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: "Surgio un error al actualizar la rama" });
    }
}

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const branchOne = await Branch.findOneBy({ id: +req.params.id });

        if (!branchOne) {
            res.status(404).json({ message: "Rama no encontrada" });
            return
        }

        await branchOne.remove();
        res.json({
            message: "Farmacia eliminada correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Surgio un error al eliminar la rama" });
    }
}


