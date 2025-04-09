
import { Router } from "express";
import { getAllSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule } from "../controllers/schedule.controller";

export const routerSchedule = Router();

routerSchedule.get('/', getAllSchedules);
routerSchedule.get('/:id', getScheduleById);
routerSchedule.post('/', createSchedule);
routerSchedule.put('/:id', updateSchedule); 
routerSchedule.delete('/:id', deleteSchedule);