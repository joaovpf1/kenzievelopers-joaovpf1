import { Router } from "express";
import {
  createDevelopersController,
  deleteDevelopersController,
  readDevelopersByIdController,
  updateDevelopersController,
} from "../controllers/developers.controller";
import { verifyEmail, verifyId } from "../middlewares/middlewares";

export const developersRoutes: Router = Router();

developersRoutes.post("/", verifyEmail, createDevelopersController);
developersRoutes.use("/:id", verifyId);
developersRoutes.get("/:id", readDevelopersByIdController);
developersRoutes.patch("/:id", verifyEmail, updateDevelopersController);
developersRoutes.delete("/:id", deleteDevelopersController);
