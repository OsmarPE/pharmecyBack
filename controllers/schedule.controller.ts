import { Request, Response } from "express";
import { Schedule } from "../models/Schedule";

export const getAllSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await Schedule.find({
            relations: ["branch"],
        });
        res.json(schedules);
    } catch (error) {
        res.status(404).json({ message: "Horarios no encontrados" });
    }
}

export const getScheduleById = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.findOne({ relations: ["branch"], where: { id: +req.params.id } });
        res.json(schedule);
    } catch (error) {
        res.status(404).json({ message: "Horario no encontrado" });
    }
}

export const createSchedule = async (req: Request, res: Response) => {
    try {
        const schedule = new Schedule();
        schedule.timeIn = req.body.timeIn;
        schedule.timeOut = req.body.timeOut;
        schedule.dayFrom = req.body.dayFrom;
        schedule.dayTo = req.body.dayTo;
        await schedule.save();
        res.json({
            message: "Horario creado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Horario no creado" });
    }
}

export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.findOneBy({ id: +req.params.id });

        if (!schedule) {
            throw new Error("Horario no encontrado");
        }

        schedule.timeIn = req.body.timeIn;
        schedule.timeOut = req.body.timeOut;
        schedule.dayFrom = req.body.dayFrom;
        schedule.dayTo = req.body.dayTo;
        await schedule.save();
        res.json({
            message: "Horario actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Horario no actualizado" });
    }
}

export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const scheduleOne = await Schedule.findOneBy({ id: +req.params.id });

        if (!scheduleOne) {
            throw new Error("Horario no encontrado");
        }

        await scheduleOne.remove();
        res.json({
            message: "Horario eliminado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Horario no eliminado" });
    }
}       

