import { Request, Response } from "express";
import { Contact } from "../models/Contact";

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(404).json({ message: "Contactos no encontrados" });
    }
}

export const getContactById = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.findOneBy({ id: +req.params.id });
        res.json(contact);
    } catch (error) {
        res.status(404).json({ message: "Contacto no encontrado" });
    }
}

export const createContact = async (req: Request, res: Response) => {
    try {
        const contact = new Contact();
        contact.type = req.body.type;
        contact.number = req.body.number;
        await contact.save();
        res.json({
            message: "Contacto creado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Contacto no creado" });
    }
}

export const updateContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.findOneBy({ id: +req.params.id });

        if (!contact) {
            throw new Error("Contacto no encontrado");
        }

        contact.type = req.body.type;
        contact.number = req.body.number;
        await contact.save();
        res.json({
            message: "Contacto actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Contacto no actualizado" });
    }
}

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const contactOne = await Contact.findOneBy({ id: +req.params.id });

        if (!contactOne) {
            throw new Error("Contacto no encontrado");
        }

        await contactOne.remove();
        res.json({
            message: "Contacto eliminado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Contacto no eliminado" });
    }
}